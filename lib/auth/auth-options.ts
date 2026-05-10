import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { createHash } from 'crypto';
import { getSupabaseAdmin } from '@/lib/db/supabase';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Passwort', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email und Passwort erforderlich');
        }

        const { data: user } = await getSupabaseAdmin()
          .from('users')
          .select('*')
          .ilike('email', credentials.email.trim())
          .maybeSingle();

        if (!user || !user.password) {
          throw new Error('Ungültige Anmeldedaten');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Ungültige Anmeldedaten');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    CredentialsProvider({
      id: 'login-token',
      name: 'Login Token',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;
        const admin = getSupabaseAdmin();
        const tokenHash = createHash('sha256').update(credentials.token).digest('hex');

        const { data: row } = await admin
          .from('auth_login_tokens')
          .select('id, user_id, expires_at, used_at')
          .eq('token_hash', tokenHash)
          .maybeSingle();

        if (!row || row.used_at) return null;
        if (new Date(row.expires_at).getTime() < Date.now()) return null;

        const { data: user } = await admin
          .from('users')
          .select('id, email, name, role')
          .eq('id', row.user_id)
          .maybeSingle();

        if (!user) return null;

        await admin
          .from('auth_login_tokens')
          .update({ used_at: new Date().toISOString() })
          .eq('id', row.id);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
    };
  }

  interface User {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

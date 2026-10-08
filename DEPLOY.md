# Self-hosted Deployment

Diese App läuft vollständig selbst gehostet mit Docker und einer eigenen PostgreSQL-Datenbank – ohne Vercel, Netlify oder andere Cloud-Plattformen.

## Voraussetzungen

- Docker und Docker Compose auf dem Server installiert
- Eine `.env`-Datei mit allen Umgebungsvariablen (siehe bestehende `.env`)

## Deployment

1. Kopiere das gesamte Projekt auf den Server.
2. Passe in der `.env`-Datei die Datenbank-URL nicht an – Docker setzt diese automatisch über `docker-compose.yml`.
3. Setze ein sicheres Postgres-Passwort:

   ```bash
   export POSTGRES_PASSWORD=dein-sicheres-passwort
   ```

4. Starte die App:

   ```bash
   docker compose up -d --build
   ```

   Docker startet dabei:
   - Einen PostgreSQL-Container (Port 5432)
   - Den App-Container (Port 3000)
   - Führt automatisch Datenbank-Migrationen aus

5. Die App ist erreichbar unter `http://deine-server-ip:3000`.

## Reverse Proxy (empfohlen)

Für HTTPS und eine Domain lege einen Reverse Proxy (z.B. Caddy oder Nginx) vor den App-Container:

### Caddy Beispiel

```Caddyfile
businessstylist.de {
    reverse_proxy localhost:3000
}
```

Caddy besorgt automatisch SSL-Zertifikate über Let's Encrypt.

## Befehle

- App neu starten: `docker compose restart app`
- Logs ansehen: `docker compose logs -f app`
- Datenbank sichern: `docker compose exec db pg_dump -U postgres businessstylist > backup.sql`
- App aktualisieren: `docker compose up -d --build`

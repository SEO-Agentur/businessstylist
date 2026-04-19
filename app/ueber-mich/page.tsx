import Link from 'next/link';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Über mich - Anika Schmitz | Businessstylist',
  description: 'Ich bin Anika Schmitz – Stilberaterin, Autorin und Gründerin von Business Stylist. Ich helfe Frauen und Männern, ihren persönlichen Stil so zu entwickeln, dass er sichtbar macht, wer sie sind.',
  alternates: {
    canonical: '/ueber-mich',
  },
};

export default function UeberMichPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-business-cream via-white to-brand-light py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 leading-tight">
                  Über mich
                </h1>
                <p className="text-xl md:text-2xl text-brand-secondary mb-6 leading-relaxed">
                  Ich bin Anika Schmitz – Stilberaterin, Autorin und Gründerin von Business Stylist.
                </p>
                <p className="text-lg text-brand-secondary/90 leading-relaxed">
                  Ich helfe Frauen (und Männern), ihren persönlichen Stil so zu entwickeln, dass er sichtbar macht,
                  wer sie sind, ohne laut zu sein, ohne sich zu verkleiden und ohne ständig neue Trends jagen zu müssen.
                </p>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lifted">
                    <img
                      src="/anika-schmitz.jpg"
                      alt="Anika Schmitz - Stilberaterin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-business-gold rounded-full opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="mb-16 p-8 bg-gradient-to-r from-business-cream to-brand-light rounded-2xl">
            <p className="text-xl text-brand-primary leading-relaxed font-medium">
              Stil ist für mich kein oberflächliches Thema. Er ist ein Werkzeug für Klarheit, Präsenz und
              Selbstvertrauen – besonders im beruflichen Kontext.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              Mein Weg zum Stil – und warum ich heute so arbeite
            </h2>

            <p className="text-lg text-brand-secondary leading-relaxed mb-6">
              Meine Faszination für Kleidung begann nicht mit Modezeitschriften, sondern mit einer einfachen Beobachtung:
              Menschen verändern ihre Haltung, ihre Stimme und ihre Wirkung, sobald sie sich stimmig gekleidet fühlen.
            </p>

            <p className="text-lg text-brand-secondary leading-relaxed mb-6">
              Im Laufe der Jahre habe ich erkannt, dass viele Menschen zwar Kleidung besitzen, aber keinen Stil.
              Nicht, weil sie kein Gespür hätten – sondern weil ihnen Struktur, Orientierung und ein ehrlicher
              Blick von außen fehlen.
            </p>

            <p className="text-lg text-brand-secondary leading-relaxed mb-12">
              Ich habe gesehen, wie sehr falsche Farben müde machen, wie Schnitte Unsicherheit verstärken und wie
              Trends Menschen überdecken, statt sie zu unterstützen. Genau hier setze ich an.
            </p>

            <div className="bg-gradient-to-br from-business-navy to-business-darkNavy text-white rounded-2xl p-8 md:p-10 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meine Philosophie: Stil ist kein Kostüm
              </h2>

              <p className="text-lg leading-relaxed mb-8">
                Ich glaube nicht an schnelle Typ-Schubladen oder starre Regeln. Ich glaube an:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold text-business-gold mb-3">Persönlichkeit statt Perfektion</h3>
                  <p className="text-white/90">Authentischer Ausdruck statt perfekter Inszenierung</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold text-business-gold mb-3">Wirkung statt Verkleidung</h3>
                  <p className="text-white/90">Kleidung, die unterstützt, nicht übertüncht</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold text-business-gold mb-3">Qualität statt Masse</h3>
                  <p className="text-white/90">Weniger Teile, mehr Möglichkeiten</p>
                </div>
              </div>

              <p className="text-lg leading-relaxed mb-4">
                Guter Stil soll tragen, nicht anstrengen. Er soll morgens Entscheidungen erleichtern, nicht neue
                Probleme schaffen. Und er darf sich leise anfühlen – klar, ruhig und souverän.
              </p>

              <p className="text-lg leading-relaxed">
                Deshalb arbeite ich nicht trendgetrieben, sondern systemisch: Körper, Farben, Persönlichkeit,
                beruflicher Kontext und Lebensrealität greifen bei mir ineinander.
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-8">
              Was meine Arbeit auszeichnet
            </h2>

            <p className="text-lg text-brand-secondary leading-relaxed mb-8">
              In meiner Stilberatung verbinde ich mehrere Ebenen:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary">Farb- und Typverständnis</h3>
                </div>
                <p className="text-brand-secondary leading-relaxed">
                  Farben sind kein Dekor, sondern Kommunikation. Die richtigen Nuancen lassen Haut klarer wirken,
                  Augen wacher und Präsenz stärker – ganz ohne Schminke oder Effekte.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary">Körper- und Schnittlogik</h3>
                </div>
                <p className="text-brand-secondary leading-relaxed">
                  Jeder Körper hat Proportionen, die man nicht &bdquo;korrigieren&ldquo;, sondern lesen sollte. Kleidung
                  funktioniert dann, wenn sie den Körper respektiert.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary">Business- & Rollenverständnis</h3>
                </div>
                <p className="text-brand-secondary leading-relaxed">
                  Ein Outfit wirkt nie isoliert. Es spricht immer im Kontext von Position, Branche und Ziel.
                  Ich übersetze Persönlichkeit in einen professionellen, glaubwürdigen Look.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary">Capsule Wardrobe & Klarheit</h3>
                </div>
                <p className="text-brand-secondary leading-relaxed">
                  Weniger Teile, mehr Möglichkeiten. Struktur statt Überforderung. Stil beginnt im Schrank –
                  nicht im Shop.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              Für wen ich arbeite
            </h2>

            <p className="text-lg text-brand-secondary leading-relaxed mb-6">
              Ich arbeite besonders gern mit Menschen, die:
            </p>

            <ul className="space-y-4 mb-12">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-brand-secondary">beruflich sichtbar sind oder sichtbar werden wollen</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-brand-secondary">sich nicht mehr verkleiden möchten</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-brand-secondary">Qualität schätzen, aber keine Zeit für modische Experimente haben</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-brand-secondary">ihren Stil als Teil ihrer Persönlichkeit begreifen</span>
              </li>
            </ul>

            <div className="bg-business-cream rounded-2xl p-8 mb-12">
              <p className="text-lg text-brand-secondary leading-relaxed">
                Viele meiner Kundinnen und Kunden kommen aus <strong>Beratung, Management, Selbstständigkeit,
                Kreativ- und Wissensberufen.</strong>
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              Warum ich schreibe
            </h2>

            <p className="text-lg text-brand-secondary leading-relaxed mb-6">
              Mein Playbook und meine Texte sind aus der Praxis entstanden. Aus echten Fragen, echten Unsicherheiten
              und echten Aha-Momenten.
            </p>

            <p className="text-lg text-brand-secondary leading-relaxed mb-12">
              Ich schreibe nicht, um Trends zu erklären – sondern um Orientierung zu geben. Damit Stil nachvollziehbar
              wird. Und um zu zeigen, dass man kein neues Ich erfinden muss, um gut gekleidet zu sein.
            </p>

            <div className="bg-gradient-to-br from-brand-accent/10 to-business-gold/10 rounded-2xl p-8 md:p-10 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                Mein Anspruch
              </h2>

              <p className="text-xl text-brand-secondary leading-relaxed mb-6">
                Ich verspreche keine Verwandlung. Ich verspreche Klarheit.
              </p>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <p className="text-2xl text-brand-primary font-medium italic leading-relaxed text-center">
                  &bdquo;Das bin ich – und genau so möchte ich wirken.&ldquo;
                </p>
              </div>

              <p className="text-lg text-brand-secondary leading-relaxed mt-6">
                Wenn das erreicht ist, hat Stil seinen Zweck erfüllt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-navy to-business-darkNavy text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für deine persönliche Stilberatung?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Lass uns gemeinsam deinen authentischen Business-Look entwickeln – klar, professionell und typgerecht.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stilberatung">
              <Button variant="accent" size="lg">
                Stilberatung buchen
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button variant="secondary" size="lg">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

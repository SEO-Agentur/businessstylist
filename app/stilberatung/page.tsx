'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function StilberatungPage() {
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'yearly'>('single');

  return (
    <>
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white mb-12">
            <h1 className="text-display-2 font-serif mb-6">
              Stilberatung & Personal Styling
            </h1>
            <p className="text-xl leading-relaxed mb-4">
              Farb- und Stilberatung, Outfit & Shopping online
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Dein Überblick zu Stil, Figurtyp und persönlicher Ausstrahlung
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 inline-flex mx-auto">
              <button
                onClick={() => setSelectedPlan('single')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  selectedPlan === 'single'
                    ? 'bg-white text-brand-primary shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Einzelberatung € 390
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  selectedPlan === 'yearly'
                    ? 'bg-white text-brand-primary shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Jahresabo € 1.290
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className={`relative overflow-hidden transition-all duration-300 ${
              selectedPlan === 'single' ? 'ring-4 ring-business-gold scale-105' : 'opacity-60'
            }`}>
              <div className="absolute top-4 right-4">
                {selectedPlan === 'single' && (
                  <span className="bg-business-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Ausgewählt
                  </span>
                )}
              </div>

              <h3 className="text-h2 mb-2">1:1 Stilberatung</h3>
              <p className="text-brand-secondary mb-6">2 × 90 Minuten persönliche Beratung</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-brand-primary">€ 390,-</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Farb- & Stiltyp Analyse</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>komplette Outfit-Strategie</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Figur & Passform</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>individuelles Lookbook (inkl.)</span>
                </li>
              </ul>

              <Link href="/kontakt">
                <Button className="w-full" size="lg">Einzelberatung buchen</Button>
              </Link>
            </Card>

            <Card className={`relative overflow-hidden transition-all duration-300 ${
              selectedPlan === 'yearly' ? 'ring-4 ring-business-gold scale-105' : 'opacity-60'
            }`}>
              <div className="absolute top-4 right-4">
                {selectedPlan === 'yearly' && (
                  <span className="bg-business-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Ausgewählt
                  </span>
                )}
              </div>

              <h3 className="text-h2 mb-2">Jahresabo</h3>
              <p className="text-brand-secondary mb-6">Dein Stil-System</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-brand-primary">€ 1.290,-</span>
                <span className="text-brand-secondary block text-sm mt-1">pro Jahr</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>alle Initialanalysen</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Kleiderschrank-Check</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>monatliches Lookbook</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>persönlicher Shop mit kuratierten Teilen</span>
                </li>
              </ul>

              <Link href="/kontakt">
                <Button className="w-full" size="lg">Jahresabo starten</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xl text-brand-secondary leading-relaxed">
              Ein klarer Stil ist kein Zufall. Diese Stilberatung zeigt Dir, wie Kleidung, Farbe und Formen perfekt zusammenwirken – passend zu Deinem Figurtyp, Deiner Persönlichkeit und Deinen beruflichen Zielen. Du erfährst, wie Du Outfits zusammenstellst, die stimmig wirken, Fehlkäufe vermeiden und Deine Ausstrahlung gezielt unterstreichen.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom max-w-6xl">
          <h2 className="text-h2 text-center mb-12">Was Du bekommst</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-h3 mb-3">Stilberatung: Dein Fundament</h3>
              <p className="text-brand-secondary">
                Eine gute Stilberatung schafft Überblick: Welche Kleidung passt, welche Schnitte Deine Silhouette optimal zeigen und wie Du Looks kombinieren kannst. Wir beraten Dich strukturiert, damit Du Deinen Kleidungsstil sicher tragen kannst – ohne tägliche Unsicherheit beim Anziehen.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-h3 mb-3">Farb- und Stilberatung</h3>
              <p className="text-brand-secondary">
                Die Farb- und Stilberatung zeigt, welche Farben und Formen Deine Ausstrahlung stärken. Eine präzise Farbberatung hilft Dir, Farbe gezielt einzusetzen – im Business wie privat. Wir finden heraus, welche Muster, welcher Stoff und welche Formen Deine Wirkung unterstreichen.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-h3 mb-3">Persönliche Beratung</h3>
              <p className="text-brand-secondary">
                In der Beratung geht es um Deine Persönlichkeit. Wir beraten individuell und entwickeln einen Style, der sich wohlfühlen lässt und Komplimente erzeugt. Ein Vorgespräch klärt Ziele, danach probieren wir aus und kombinieren neu.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-h3 mb-3">Personal Shopping</h3>
              <p className="text-brand-secondary">
                Personal Shopping spart Zeit. Wir begleiten Dich beim Shopping, wählen passende Teile und vermeiden Fehlkäufe. So entsteht eine Garderobe, die sich leicht shoppen lässt. Im Abo erhältst Du einen persönlichen Shop mit monatlich kuratierten Kleidungsstücken.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                5
              </div>
              <h3 className="text-h3 mb-3">Styling & Stylingtipps</h3>
              <p className="text-brand-secondary">
                Gutes Styling ist planbar. Mit gezielten Stylingtipps lernst Du, wie Accessoires, Schmuck und Make-up Deine Wirkung unterstreichen. Wir berücksichtigen Frisur, Hose oder Kleid, damit jedes Kleidungsstück seinen Platz hat.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                6
              </div>
              <h3 className="text-h3 mb-3">Outfit & Passform</h3>
              <p className="text-brand-secondary">
                Ein Outfit wirkt, wenn es passend geschnitten ist. Wir analysieren Figurtyp, Figur und Schnitte, damit Kleidung optimal sitzt. Ob schmale Linien oder strukturierte Formen – Du lernst, was Deine Silhouette stärkt.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                7
              </div>
              <h3 className="text-h3 mb-3">Online-Stilberatung</h3>
              <p className="text-brand-secondary">
                Die Online-Stilberatung verbindet Nähe mit Effizienz. Per Online-Session erhältst Du klare Empfehlungen, Lookboards und Feedback – ideal für volle Kalender. So bleibt Dein Stil flexibel und individuell.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                8
              </div>
              <h3 className="text-h3 mb-3">Kleiderschrank & Garderobe</h3>
              <p className="text-brand-secondary">
                Ein strukturierter Kleiderschrank gibt Überblick. Wir prüfen Deinen Schrank, sortieren und bauen eine funktionale Garderobe auf. Du weißt danach genau, welche Kleidungsstücke Du tragen willst – jeden Tag.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                9
              </div>
              <h3 className="text-h3 mb-3">Business-Stil</h3>
              <p className="text-brand-secondary">
                Im Business zählt Wirkung. Die Imageberatung schärft Deinen Look, damit Du souverän auftreten kannst. Dein Auftritt wird stimmig, modern und glaubwürdig – ohne Verkleidung.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                10
              </div>
              <h3 className="text-h3 mb-3">Für Kundinnen</h3>
              <p className="text-brand-secondary">
                Unsere Kundinnen schätzen Klarheit. Die Stylistin entwickelt mit Dir einen Typ, der langfristig funktioniert und Inspiration gibt. Das Ziel: Deinen persönlichen Stil finden – und dauerhaft leben.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-navy to-business-darkNavy text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-h2 mb-6">Das Wichtigste auf einen Blick</h2>

          <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg className="w-8 h-8 text-business-gold mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Stilberatung schafft Überblick und Sicherheit</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg className="w-8 h-8 text-business-gold mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Farb- und Stilberatung stärkt Deine Ausstrahlung</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg className="w-8 h-8 text-business-gold mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Personal Shopping vermeidet Fehlkäufe</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg className="w-8 h-8 text-business-gold mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Styling-Know-how sorgt für stimmige Looks</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg className="w-8 h-8 text-business-gold mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Online oder vor Ort: flexibel & wirksam</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg className="w-8 h-8 text-business-gold mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Klare Preise: € 390 oder € 1.290 im Abo</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-h3 mb-6">Bereit für Deinen nächsten Schritt?</h3>
            <p className="text-xl mb-8">Starte jetzt mit Deiner Stilberatung auf businessstylist.de</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button variant="accent" size="lg">Einzelberatung buchen</Button>
              </Link>
              <Link href="/kontakt">
                <Button variant="secondary" size="lg">Jahresabo starten</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="bg-brand-light rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-h2 mb-4">Preise & Buchung</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-card">
                <h3 className="text-h3 mb-2">Einzel-Stilberatung</h3>
                <p className="text-4xl font-bold text-brand-primary mb-2">€ 390,-</p>
                <p className="text-brand-secondary mb-4">2 × 90 Minuten, inklusive Analyse & Lookbook</p>
                <Link href="/kontakt">
                  <Button className="w-full">Einzelberatung buchen</Button>
                </Link>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-card">
                <h3 className="text-h3 mb-2">Jahresabo</h3>
                <p className="text-4xl font-bold text-brand-primary mb-2">€ 1.290,-</p>
                <p className="text-brand-secondary mb-4">Initialanalyse + Check + monatliches Lookbook</p>
                <Link href="/kontakt">
                  <Button className="w-full">Jahresabo starten</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

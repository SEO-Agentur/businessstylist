'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';

const faqCategories = [
  {
    category: 'Allgemeine Fragen',
    questions: [
      {
        question: 'Was genau ist Business Stylist?',
        answer: 'Business Stylist ist eine Plattform für professionelle Stilberatung mit Fokus auf Business-Outfits, Capsule Wardrobe, Farbberatung und strategische Stilentwicklung. Ziel ist es, Menschen dabei zu helfen, ihren persönlichen Stil klar, authentisch und beruflich passend umzusetzen – ohne Trends, Überkonsum oder Verkleidung.'
      },
      {
        question: 'Für wen ist Business Stylist geeignet?',
        answer: 'Business Stylist richtet sich an Frauen und Männer, die beruflich sichtbar sind oder sichtbar werden möchten, sich souverän, kompetent und authentisch kleiden wollen, keine Zeit oder Lust auf modische Experimente haben und Ordnung und Klarheit in ihren Kleiderschrank bringen möchten. Besonders häufig begleiten wir Selbstständige, Führungskräfte, Berater:innen, Kreative und Menschen im beruflichen Wandel.'
      },
      {
        question: 'Muss ich mich für Mode interessieren, um von einer Stilberatung zu profitieren?',
        answer: 'Nein. Ganz im Gegenteil. Viele Kund:innen kommen gerade deshalb, weil sie Mode anstrengend, verwirrend oder oberflächlich finden. Stilberatung bei Business Stylist bedeutet Struktur, System und Entlastung – nicht Trendwissen oder Shoppingstress.'
      }
    ]
  },
  {
    category: 'Fragen zur Stilberatung & zum Ablauf',
    questions: [
      {
        question: 'Wie läuft eine Stilberatung bei Business Stylist ab?',
        answer: 'Der Ablauf ist klar strukturiert und individuell angepasst. Je nach Angebot kann er beinhalten: Analyse von Persönlichkeit, Alltag und beruflichem Kontext, Farb- und Stiltyp-Bestimmung, Proportions- und Schnittanalyse, Kleiderschrank-Check oder Aufbau einer Capsule Wardrobe sowie konkrete Outfit-Empfehlungen für Business & Alltag. Du bekommst keine allgemeinen Tipps, sondern konkrete, umsetzbare Ergebnisse.'
      },
      {
        question: 'Findet die Stilberatung online oder vor Ort statt?',
        answer: 'Beides ist möglich. Viele Angebote sind online umsetzbar, effizient und ortsunabhängig. Je nach Paket und Wunsch sind auch persönliche Beratungen oder Kombinationen aus Online- und Offline-Elementen möglich.'
      },
      {
        question: 'Was ist der Unterschied zwischen Stilberatung und Personal Shopping?',
        answer: 'Stilberatung schafft Verständnis und Klarheit: Warum etwas wirkt – und warum etwas nicht. Personal Shopping setzt darauf auf und hilft bei der gezielten Auswahl von Kleidung. Bei Business Stylist steht immer zuerst die Stilstrategie im Fokus – Shopping ist optional, nicht verpflichtend.'
      }
    ]
  },
  {
    category: 'Fragen zur Farbberatung',
    questions: [
      {
        question: 'Was bringt mir eine professionelle Farbberatung?',
        answer: 'Die richtigen Farben lassen dich frischer, wacher und präsenter wirken, reduzieren den Styling-Aufwand, sorgen für stimmige Outfits mit weniger Teilen und stärken deine Ausstrahlung – ohne Effekte. Eine professionelle Farbberatung ist eine langfristige Investition, die Fehlkäufe reduziert und Sicherheit gibt.'
      },
      {
        question: 'Sind Farbtypen nicht veraltet?',
        answer: 'Nein – vereinfachte Farbtypen schon. Business Stylist arbeitet nicht mit starren Schubladen, sondern mit differenzierten Farbräumen, Nuancen und Kontrasten, die zu Haut, Haaren, Augen und Persönlichkeit passen.'
      },
      {
        question: 'Woran erkenne ich, dass meine Farben nicht zu mir passen?',
        answer: 'Typische Anzeichen sind: du wirkst müde oder blass trotz ausreichendem Schlaf, dein Teint erscheint unruhig oder fahl, bestimmte Farben lassen dich älter oder härter wirken, du greifst immer zu Schwarz, obwohl es dich nicht optimal unterstützt. Die richtigen Farben arbeiten für dich, nicht gegen dich.'
      },
      {
        question: 'Verändern sich meine Farben mit dem Alter?',
        answer: 'Die grundlegende Farbfamilie bleibt meist stabil. Was sich ändern kann, sind Kontraststärke, Intensität einzelner Nuancen sowie persönliche Vorlieben und berufliche Anforderungen. Eine professionelle Farbberatung berücksichtigt diese Veränderungen und passt Empfehlungen entsprechend an.'
      },
      {
        question: 'Was ist, wenn ich meine Lieblingsfarben nicht tragen „darf"?',
        answer: 'Du darfst alles tragen. In der Farbberatung geht es nicht um Verbote, sondern um Wirkung. Gemeinsam schauen wir: wie Lieblingsfarben optimal kombiniert werden können, ob sie besser als Akzent oder flächig funktionieren und in welchen Situationen sie sinnvoll sind. Stil lebt von Freiheit – nicht von Regeln.'
      },
      {
        question: 'Ist Farbberatung nur für Frauen sinnvoll?',
        answer: 'Nein. Gerade Männer profitieren enorm von Farbberatung, da sie oft mit einer sehr kleinen Farbpalette arbeiten. Die richtigen Farben lassen professioneller wirken, reduzieren Styling-Aufwand und vereinfachen Einkäufe. Viele männliche Kunden erleben Farbberatung als überraschend pragmatisch.'
      },
      {
        question: 'Funktioniert Farbberatung auch online?',
        answer: 'Ja – sehr gut, wenn sie professionell durchgeführt wird. Mit klaren Vorgaben, Tageslicht-Fotos und strukturierter Analyse lassen sich präzise Ergebnisse erzielen. Online-Farbberatung ist effizient, flexibel und ortsunabhängig.'
      },
      {
        question: 'Wie unterscheidet sich eure Farbberatung von Schnelltests oder Apps?',
        answer: 'Apps und Online-Tests arbeiten mit vereinfachten Algorithmen. Business Stylist berücksichtigt zusätzlich: Hautunterton und Tiefe, Kontrastverhältnis, Haar- und Augenwirkung, beruflichen Kontext sowie persönliche Ausstrahlung. Das Ergebnis ist individuell, nicht schematisch.'
      }
    ]
  },
  {
    category: 'Fragen zur Capsule Wardrobe',
    questions: [
      {
        question: 'Was ist eine Capsule Wardrobe?',
        answer: 'Eine Capsule Wardrobe ist eine bewusst zusammengestellte Garderobe aus wenigen, gut kombinierbaren Teilen, die deinen Alltag abdecken, zu deinem Stil und Beruf passen und saisonübergreifend funktionieren. Das Ziel ist maximale Kombinierbarkeit bei minimalem Aufwand.'
      },
      {
        question: 'Muss ich dafür meinen ganzen Kleiderschrank aussortieren?',
        answer: 'Nein. In den meisten Fällen wird vorhandene Kleidung neu strukturiert und sinnvoll ergänzt. Aussortieren passiert nur dort, wo Teile wirklich nicht (mehr) zu dir passen.'
      },
      {
        question: 'Ist eine Capsule Wardrobe nicht langweilig?',
        answer: 'Im Gegenteil. Sie schafft Freiheit, Kreativität und Sicherheit – weil jedes Teil funktioniert und du dich nicht jeden Morgen neu „erfinden" musst.'
      }
    ]
  },
  {
    category: 'Fragen zu Business-Outfits & Wirkung',
    questions: [
      {
        question: 'Was ist ein gutes Business-Outfit?',
        answer: 'Ein gutes Business-Outfit passt zu deiner Rolle, Branche und Position, unterstützt deine Persönlichkeit, wirkt souverän, nicht verkleidet und fühlt sich bequem und selbstverständlich an. Business Stil ist keine Uniform, sondern kommunikative Kleidung.'
      },
      {
        question: 'Muss Business-Stil immer klassisch sein?',
        answer: 'Nein. Business-Stil kann modern, kreativ, feminin oder reduziert sein – solange er klar, glaubwürdig und stimmig ist. Entscheidend ist nicht der Trend, sondern die Wirkung.'
      }
    ]
  },
  {
    category: 'Organisatorische Fragen',
    questions: [
      {
        question: 'Wie lange dauert eine Stilberatung?',
        answer: 'Das hängt vom gewählten Angebot ab. Es gibt kompakte Beratungen ebenso wie umfassende Stilprozesse über mehrere Wochen. Alle Details findest du bei den jeweiligen Paketen.'
      },
      {
        question: 'Wie nachhaltig ist eine Stilberatung wirklich?',
        answer: 'Sehr. Viele Kund:innen berichten, dass sie jahrelang von einer einzigen Beratung profitieren, weniger kaufen, gezielter auswählen und sich dauerhaft sicherer fühlen.'
      },
      {
        question: 'Was kostet eine Stilberatung bei Business Stylist?',
        answer: 'Die Preise variieren je nach Umfang, Format und Zielsetzung. Business Stylist positioniert sich bewusst nicht im Billigsegment, sondern bietet fundierte, nachhaltige Beratung mit echtem Mehrwert.'
      }
    ]
  },
  {
    category: 'Nach der Beratung',
    questions: [
      {
        question: 'Was passiert nach der Stilberatung?',
        answer: 'Du gehst mit klaren Stil- und Farbempfehlungen, konkreten Outfit-Ideen, einem besseren Verständnis für dich selbst und mehr Sicherheit im Alltag. Viele Kund:innen berichten, dass sie sich nach der Beratung leichter, klarer und souveräner fühlen – auch jenseits von Kleidung.'
      },
      {
        question: 'Kann ich später erneut Unterstützung buchen?',
        answer: 'Ja, jederzeit. Stil entwickelt sich mit dem Leben. Viele Kund:innen kommen später für Feinschliff, neue berufliche Rollen, saisonale Anpassungen oder Erweiterung der Capsule Wardrobe.'
      }
    ]
  },
  {
    category: 'Vertiefende Fragen zur Stilberatung',
    questions: [
      {
        question: 'Muss ich meinen Stil komplett ändern?',
        answer: 'Nein. Stilberatung bedeutet nicht Neuanfang, sondern Schärfung. Oft geht es darum, Unklarheiten zu beseitigen und vorhandene Stärken sichtbar zu machen.'
      },
      {
        question: 'Was, wenn ich mich selbst gar nicht beschreiben kann?',
        answer: 'Das ist völlig normal. Viele Menschen wissen, was sie nicht wollen – aber nicht, was sie ausmacht. Genau hier setzt Stilberatung an: Sie übersetzt Gefühl in Struktur.'
      },
      {
        question: 'Ist Stilberatung nicht oberflächlich?',
        answer: 'Stil ist Kommunikation. Bevor du sprichst, wirkt dein Erscheinungsbild bereits. Stilberatung beschäftigt sich mit dieser nonverbalen Ebene – bewusst, reflektiert und strategisch.'
      },
      {
        question: 'Wie individuell ist eine Stilberatung wirklich?',
        answer: 'Sehr individuell. Es gibt keine vorgefertigten Looks oder Standardlösungen. Jede Beratung basiert auf Persönlichkeit, Körperbau, Alltag, beruflicher Rolle und Zielwirkung. Zwei Menschen mit ähnlicher Figur können völlig unterschiedliche Stilkonzepte haben.'
      },
      {
        question: 'Kann Stilberatung mir helfen, selbstbewusster aufzutreten?',
        answer: 'Ja – indirekt, aber nachhaltig. Wenn Kleidung nicht mehr verunsichert, entsteht Ruhe. Diese Ruhe überträgt sich auf Haltung, Stimme und Präsenz.'
      },
      {
        question: 'Ist Stilberatung nur für formelle Business-Outfits?',
        answer: 'Nein. Business Stylist arbeitet auch mit Smart Casual, Business Casual, kreativen Berufsfeldern und hybriden Arbeitswelten. Stil muss zum echten Leben passen.'
      },
      {
        question: 'Wie lange wirken die Ergebnisse einer Stilberatung?',
        answer: 'In der Regel viele Jahre. Da du lernst, warum etwas funktioniert, kannst du dieses Wissen langfristig anwenden – unabhängig von Trends oder Saisons.'
      }
    ]
  },
  {
    category: 'Fragen zu Körper, Proportionen & Realität',
    questions: [
      {
        question: 'Was ist, wenn ich mit meinem Körper unzufrieden bin?',
        answer: 'Stilberatung bewertet keinen Körper. Sie arbeitet mit dem, was da ist – respektvoll, sachlich und lösungsorientiert. Ziel ist Unterstützung, nicht Korrektur.'
      },
      {
        question: 'Funktioniert Stilberatung auch bei Konfektionsgrößen außerhalb der Norm?',
        answer: 'Ja, besonders dann. Individuelle Proportionen erfordern individuelle Lösungen – genau hier liegt die Stärke professioneller Stilberatung.'
      },
      {
        question: 'Muss ich mich für die Beratung zeigen oder fotografieren lassen?',
        answer: 'Für Online-Beratungen sind Fotos hilfreich, aber sie werden ausschließlich für die Analyse genutzt. Diskretion und respektvoller Umgang sind selbstverständlich.'
      }
    ]
  },
  {
    category: 'Fragen zur Umsetzung nach der Beratung',
    questions: [
      {
        question: 'Bekomme ich konkrete Outfit-Beispiele?',
        answer: 'Ja. Du erhältst nachvollziehbare Empfehlungen, Kombinationsideen und klare Leitlinien, die du im Alltag umsetzen kannst.'
      },
      {
        question: 'Was, wenn ich trotzdem unsicher bleibe?',
        answer: 'Unsicherheit gehört zum Prozess. Viele Kund:innen buchen nach einiger Zeit eine kurze Nachjustierung oder Feedback-Session – völlig unkompliziert.'
      },
      {
        question: 'Kann ich mit einem kleinen Budget stilvoll sein?',
        answer: 'Absolut. Stil ist keine Preisfrage, sondern eine Frage von Passform, Farbe, Schnitt und Klarheit. Eine gute Stilstrategie spart langfristig Geld.'
      }
    ]
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-business-cream/30 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-brand-primary pr-4">{question}</span>
        <svg
          className={`w-6 h-6 text-brand-accent flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-2">
          <p className="text-brand-secondary leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((category) =>
      category.questions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    )
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative bg-gradient-to-br from-business-cream via-white to-brand-light py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-business-gold rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-accent/20">
              <span className="text-brand-accent font-semibold text-sm tracking-wide uppercase">
                Häufig gestellte Fragen
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 leading-tight">
              FAQ – Alles, was du wissen musst
            </h1>

            <p className="text-xl md:text-2xl text-brand-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
              Von Stilberatung über Farbtyp-Analyse bis zur Capsule Wardrobe – hier findest du Antworten
              auf die wichtigsten Fragen
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-brand-accent to-business-gold rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-primary">
                      {category.category}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => (
                    <FAQItem
                      key={questionIndex}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems[`${categoryIndex}-${questionIndex}`] || false}
                      onToggle={() => toggleItem(categoryIndex, questionIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-business-cream to-brand-light">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lifted p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              Deine Frage war nicht dabei?
            </h2>
            <p className="text-lg text-brand-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
              Wenn du dir noch unsicher bist, welches Angebot zu dir passt, melde dich gern persönlich.
              Stil beginnt mit Klarheit – und die entsteht oft im Gespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button variant="accent" size="lg">
                  Jetzt Kontakt aufnehmen
                </Button>
              </Link>
              <Link href="/stilberatung">
                <Button variant="secondary" size="lg">
                  Stilberatung buchen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/farbtyp-beratung"
              className="group bg-gradient-to-br from-business-cream to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Farbberatung</h3>
              <p className="text-brand-secondary text-sm">
                Entdecke deine perfekte Farbpalette
              </p>
            </Link>

            <Link
              href="/kleiderschrank-check"
              className="group bg-gradient-to-br from-business-cream to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Kleiderschrank Check</h3>
              <p className="text-brand-secondary text-sm">
                Optimiere deine vorhandene Garderobe
              </p>
            </Link>

            <Link
              href="/capsule-wardrobe"
              className="group bg-gradient-to-br from-business-cream to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-business-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Capsule Wardrobe</h3>
              <p className="text-brand-secondary text-sm">
                Weniger Teile, mehr Möglichkeiten
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

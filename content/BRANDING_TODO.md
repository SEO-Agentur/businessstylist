# Branding TODO - businessstylist.de

Diese Datei listet alle Stellen auf, wo du Logo, Farben, Fonts und Bilder von businessstylist.de einfügen musst.

## Logo

### Wo das Logo platziert werden muss:
- [ ] `/components/layout/Header.tsx` - Zeile 22: "Businessstylist" Text durch Logo-Bild ersetzen
- [ ] `/app/layout.tsx` - OpenGraph & Twitter Card Images updaten
- [ ] `/public/logo.svg` - Erstellen und Logo-Datei hinzufügen
- [ ] `/public/logo-white.svg` - Erstellen (für dunkle Hintergründe im Footer)
- [ ] `/app/favicon.ico` - Aktualisieren mit Businessstylist Favicon

## Farben

### Aktuelle Placeholder-Farben in `/tailwind.config.ts` (Zeile 11-26):
```
brand: {
  primary: '#1a1a1a',      // TODO: Mit Hauptfarbe von businessstylist.de ersetzen
  secondary: '#4a4a4a',    // TODO: Mit Sekundärfarbe ersetzen
  accent: '#d4a574',       // TODO: Mit Akzentfarbe ersetzen
  light: '#f5f5f5',
  white: '#ffffff',
},
business: {
  navy: '#1e3a5f',         // TODO: Anpassen
  gold: '#c9a961',         // TODO: Anpassen
  cream: '#f9f7f4',        // TODO: Anpassen
  charcoal: '#2d2d2d',     // TODO: Anpassen
  slate: '#64748b',        // TODO: Anpassen
}
```

### To-Do:
- [ ] Besuche businessstylist.de und extrahiere das Farbschema
- [ ] Aktualisiere alle Hex-Werte in `tailwind.config.ts`
- [ ] Prüfe die Farben auf allen Seiten (besonders CTA-Buttons)

## Fonts

### Aktuelle Fonts in `/app/layout.tsx` (Zeile 3):
- Sans: Inter
- Serif: Playfair Display
- Heading: Montserrat

### To-Do:
- [ ] Überprüfe, welche Fonts businessstylist.de verwendet
- [ ] Falls andere Fonts: In `/app/layout.tsx` Imports aktualisieren
- [ ] CSS-Variablen in `tailwind.config.ts` überprüfen

## Bilder

### Bildslots auf den Hauptseiten:

#### Homepage (`/app/page.tsx`):
- [ ] Hero-Sektion: Hintergrundbild oder Hero-Image (ca. 1920x800px)
- [ ] Testimonial-Sektion: Portrait von Sarah M. oder allgemeines Testimonial-Bild

#### Weitere Seiten mit Bildslots:
- [ ] `/app/stilberatung/page.tsx` - Hero-Bild
- [ ] `/app/ueber-mich/page.tsx` - Portrait/About-Foto
- [ ] `/app/shop` Produktseiten - Produktbilder für Ebook, Lookbook, Services

### Bildverzeichnisse:
- `/public/images/hero/` - Hero-Bilder für verschiedene Seiten
- `/public/images/services/` - Service-Bilder (Stilberatung, Kleiderschrank-Check, etc.)
- `/public/images/products/` - Produkt-Cover (Ebook, Lookbook)
- `/public/images/about/` - Portrait und Team-Fotos
- `/public/images/testimonials/` - Kundenfotos (optional)

### Allgemeine Richtlinien:
- Alle Bilder als WebP für Performance
- Responsive sizes bereitstellen
- Alt-Texte für SEO hinzufügen

## Social Media Icons & Links

- [ ] Footer: Social-Media-Links hinzufügen (Instagram, LinkedIn, Pinterest)
- [ ] Icons: Verwende entweder SVG-Icons oder ein Icon-Package

## Weitere Anpassungen

- [ ] Meta-Description und OpenGraph-Texte mit echten Texten von businessstylist.de ersetzen
- [ ] Email-Adressen in Kontaktseiten aktualisieren
- [ ] Telefonnummern hinzufügen (falls vorhanden)

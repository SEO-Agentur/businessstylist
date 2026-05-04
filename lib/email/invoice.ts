interface InvoiceData {
  invoiceNumber: string;
  customerName?: string;
  email: string;
  productName: string;
  productDescription?: string;
  amountCents: number;
  currency: string;
  taxRate: number;
  createdAt: Date;
}

function formatMoney(cents: number, currency: string) {
  const value = (cents / 100).toFixed(2).replace('.', ',');
  const symbol = currency.toLowerCase() === 'eur' ? '€' : currency.toUpperCase();
  return `${value} ${symbol}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function renderInvoiceEmail(data: InvoiceData): { subject: string; html: string; text: string } {
  const gross = data.amountCents;
  const taxRateDecimal = data.taxRate / 100;
  const net = Math.round(gross / (1 + taxRateDecimal));
  const tax = gross - net;
  const invoiceDate = formatDate(data.createdAt);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';
  const greetingName = data.customerName && data.customerName.trim().length > 0
    ? data.customerName
    : 'liebe Kundin';

  const subject = `Bestellbestätigung & Rechnung ${data.invoiceNumber} – Businessstylist`;

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${subject}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; background: #f9f7f4; margin: 0; padding: 0; }
  .container { max-width: 640px; margin: 0 auto; padding: 24px; }
  .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .header { background: #0f1c2d; color: #ffffff; padding: 28px 32px; }
  .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
  .header p { margin: 6px 0 0; color: #cbd5e1; font-size: 14px; }
  .content { padding: 28px 32px; }
  .meta { display: table; width: 100%; margin-bottom: 24px; font-size: 14px; }
  .meta-row { display: table-row; }
  .meta-label { display: table-cell; color: #64748b; padding: 4px 12px 4px 0; width: 160px; }
  .meta-value { display: table-cell; color: #0f172a; font-weight: 500; }
  table.items { width: 100%; border-collapse: collapse; margin: 16px 0 8px; }
  table.items th, table.items td { text-align: left; padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; vertical-align: top; }
  table.items th { background: #f1f5f9; font-weight: 600; color: #334155; }
  table.items td.amount, table.items th.amount { text-align: right; white-space: nowrap; }
  table.totals { width: 100%; margin-top: 12px; font-size: 14px; }
  table.totals td { padding: 6px 10px; }
  table.totals td.label { color: #64748b; }
  table.totals td.value { text-align: right; white-space: nowrap; }
  table.totals tr.total td { font-weight: 700; font-size: 16px; color: #0f172a; border-top: 2px solid #0f1c2d; padding-top: 12px; }
  .note { margin-top: 24px; padding: 16px; background: #f8fafc; border-left: 3px solid #0f1c2d; color: #334155; font-size: 13px; border-radius: 4px; }
  .footer { padding: 24px 32px; color: #64748b; font-size: 12px; background: #f8fafc; line-height: 1.5; }
  .footer a { color: #0f172a; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Vielen Dank für Deine Bestellung</h1>
        <p>Rechnung ${data.invoiceNumber}</p>
      </div>
      <div class="content">
        <p>Hallo ${greetingName},</p>
        <p>vielen Dank für Deinen Einkauf bei Businessstylist. Deine Zahlung ist erfolgreich eingegangen. Anbei findest Du Deine Bestellbestätigung und die Rechnung.</p>

        <div class="meta">
          <div class="meta-row"><div class="meta-label">Rechnungsnummer</div><div class="meta-value">${data.invoiceNumber}</div></div>
          <div class="meta-row"><div class="meta-label">Rechnungsdatum</div><div class="meta-value">${invoiceDate}</div></div>
          <div class="meta-row"><div class="meta-label">Leistungsdatum</div><div class="meta-value">${invoiceDate}</div></div>
          <div class="meta-row"><div class="meta-label">Rechnungsempfänger</div><div class="meta-value">${data.customerName || ''}<br>${data.email}</div></div>
        </div>

        <table class="items">
          <thead>
            <tr>
              <th>Position</th>
              <th class="amount">Betrag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${data.productName}</strong>
                ${data.productDescription ? `<br><span style="color:#64748b; font-size:13px;">${data.productDescription}</span>` : ''}
              </td>
              <td class="amount">${formatMoney(gross, data.currency)}</td>
            </tr>
          </tbody>
        </table>

        <table class="totals">
          <tr>
            <td class="label">Nettobetrag</td>
            <td class="value">${formatMoney(net, data.currency)}</td>
          </tr>
          <tr>
            <td class="label">zzgl. ${data.taxRate.toString().replace('.', ',')} % USt.</td>
            <td class="value">${formatMoney(tax, data.currency)}</td>
          </tr>
          <tr class="total">
            <td class="label">Gesamtbetrag (brutto)</td>
            <td class="value">${formatMoney(gross, data.currency)}</td>
          </tr>
        </table>

        <div class="note">
          Der Betrag wurde bereits über Stripe eingezogen. Diese E-Mail gilt als Bestellbestätigung und Rechnung im Sinne des § 14 UStG.
        </div>

        <p style="margin-top:24px;">Bei Fragen zu Deiner Bestellung antworte einfach auf diese E-Mail oder schreibe an <a href="mailto:kontakt@businessstylist.de">kontakt@businessstylist.de</a>.</p>
        <p>Herzliche Grüße<br>Anika Schmitz – Businessstylist</p>
      </div>
      <div class="footer">
        <strong>Businessstylist – Anika Schmitz</strong><br>
        Website: <a href="${appUrl}">${appUrl.replace(/^https?:\/\//, '')}</a><br>
        E-Mail: kontakt@businessstylist.de<br><br>
        <a href="${appUrl}/impressum">Impressum</a> · <a href="${appUrl}/datenschutz">Datenschutz</a> · <a href="${appUrl}/agb">AGB</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `Vielen Dank für Deine Bestellung bei Businessstylist`,
    ``,
    `Rechnungsnummer: ${data.invoiceNumber}`,
    `Rechnungsdatum:  ${invoiceDate}`,
    `Empfänger:       ${data.customerName || ''} <${data.email}>`,
    ``,
    `Position: ${data.productName}`,
    data.productDescription ? `          ${data.productDescription}` : '',
    `Betrag:   ${formatMoney(gross, data.currency)}`,
    ``,
    `Nettobetrag:           ${formatMoney(net, data.currency)}`,
    `zzgl. ${data.taxRate}% USt.:  ${formatMoney(tax, data.currency)}`,
    `Gesamtbetrag (brutto): ${formatMoney(gross, data.currency)}`,
    ``,
    `Der Betrag wurde über Stripe eingezogen. Diese E-Mail gilt als Bestellbestätigung und Rechnung im Sinne des § 14 UStG.`,
    ``,
    `Bei Fragen: kontakt@businessstylist.de`,
  ].filter(Boolean).join('\n');

  return { subject, html, text };
}

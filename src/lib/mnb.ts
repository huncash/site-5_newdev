import type { EurQuote } from "@/lib/money";

const SOAP_BODY = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetCurrentExchangeRates xmlns="http://www.mnb.hu/webservices/" />
  </soap:Body>
</soap:Envelope>`;

/** The HTTPS POST endpoint currently answers 404; the published SOAP service answers here. */
const MNB_URL = "http://www.mnb.hu/arfolyamok.asmx";

function decodeXml(value: string): string {
  return value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&");
}

export async function fetchMnbEur(): Promise<EurQuote | null> {
  try {
    const response = await fetch(MNB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://www.mnb.hu/webservices/MNBArfolyamServiceSoap/GetCurrentExchangeRates",
      },
      body: SOAP_BODY,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const decoded = decodeXml(await response.text());
    const date = decoded.match(/<Day date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const eur = decoded.match(/<Rate unit="(\d+)" curr="EUR">([0-9,]+)<\/Rate>/);
    if (!date || !eur) return null;
    const unit = Number(eur[1]);
    const quoted = Number(eur[2].replace(",", "."));
    if (!Number.isFinite(unit) || unit <= 0 || !Number.isFinite(quoted) || quoted <= 0) return null;
    return { date, hufPerEur: quoted / unit };
  } catch {
    return null;
  }
}

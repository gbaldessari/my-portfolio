const rawNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, '');

/** Chile mobile: country code + number, digits only (e.g. 56912345678). Set VITE_WHATSAPP_NUMBER in .env */
export const WHATSAPP_NUMBER = rawNumber ?? '';

export function formatWhatsAppDisplay(number: string): string {
  if (number.length === 11 && number.startsWith('569')) {
    return `+56 ${number[2]} ${number.slice(3, 7)} ${number.slice(7)}`;
  }
  if (number.startsWith('56')) {
    return `+${number}`;
  }
  return number;
}

export const WHATSAPP_DISPLAY = formatWhatsAppDisplay(WHATSAPP_NUMBER);

export function getWhatsAppUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

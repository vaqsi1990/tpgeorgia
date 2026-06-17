import { business } from "@/lib/site";

export function buildWhatsAppUrl(message: string): string {
  const phone = business.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

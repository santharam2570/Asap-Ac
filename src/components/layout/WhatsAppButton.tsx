import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30" aria-hidden />
      <Icon name="whatsapp" className="relative size-7" />
    </a>
  );
}

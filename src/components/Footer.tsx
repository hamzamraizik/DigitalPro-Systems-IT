import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { COMPANY } from "@/constants/company";

import logo from "@/assets/dps-it_logo.webp";

export const Footer = () => {
  const { t } = useTranslation();
  return (
  <footer className="bg-[#111111] text-white">
    <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.7fr_1.3fr]">
        <div>
          <Link to="/" className="inline-flex items-center" aria-label="DigitalPro Systems IT - accueil">
            <img
              src={logo}
              alt="DigitalPro Systems IT"
              width="600"
              height="400"
              className="h-auto w-[180px] object-contain brightness-0 invert"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/[0.58]">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#00AEEF]">
            {t("footer.servicesTitle")}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/[0.58]">
            {[
              { label: t("servicesGrid.hardware.cards.securityPhysical.title"), href: "/services#securite-electronique" },
              { label: t("servicesGrid.hardware.cards.network.title"), href: "/services#infrastructures-reseaux" },
              { label: t("servicesGrid.software.cards.web.title"), href: "/services#developpement" },
              { label: t("servicesGrid.software.cards.erp.title"), href: "/services#developpement" },
              { label: t("servicesGrid.hardware.cards.hardware.title"), href: "/services#distribution" }
            ].map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#00AEEF]">
            {t("footer.companyTitle")}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/[0.58]">
{[
              { label: t("nav.home"), href: "/" },
              { label: t("nav.services"), href: "/services" },
              { label: t("nav.about"), href: "/a-propos" },
              { label: t("nav.projects"), href: "/projets" },
              { label: t("nav.contact"), href: "/contact" }
            ].map((link) => (              <li key={link.href}>
                <Link to={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#00AEEF]">
            {t("footer.contactTitle")}
          </h2>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-white/[0.58]">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#00AEEF]" aria-hidden="true" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#00AEEF]" aria-hidden="true" />
              <a href={`tel:${COMPANY.phone}`} className="transition-colors hover:text-white">
                {t("footer.phone")}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#00AEEF]" aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="break-all transition-colors hover:text-white">
                {t("footer.email")}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="mt-12 border-t border-white/10 pt-8 text-sm text-white/[0.42]">
        <p>© {new Date().getFullYear()} DigitalPro Systems IT. {t("footer.rights")}</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

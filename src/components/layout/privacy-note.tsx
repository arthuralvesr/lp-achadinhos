import { siteConfig } from "@/config/site";
import "./privacy-note.css";

// Aviso exigido pelos termos das Ferramentas de Negócios da Meta em páginas com Pixel.
export function PrivacyNote() {
  if (!siteConfig.metaPixelId) return null;

  return (
    <footer className="privacy-note">
      <p className="page-container">
        <strong>Privacidade:</strong> esta página usa cookies e o Pixel da Meta. A Meta e outros terceiros podem usar essas tecnologias para medir visitas e toques no convite do grupo e para mostrar anúncios. Não pedimos seus dados aqui. Para não receber anúncios personalizados, ajuste as{" "}
        <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">preferências de anúncios da Meta</a> ou acesse{" "}
        <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>.
      </p>
    </footer>
  );
}

import { WhatsAppMark } from "./icons";
import "./notification-preview.css";

export function NotificationPreview({ title, description, compact = false, className = "" }: {
  title: string;
  description?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`notification-preview${compact ? " notification-preview--compact" : ""} ${className}`} aria-hidden="true">
      <span className="notification-preview-icon"><WhatsAppMark /></span>
      <div className="notification-preview-copy">
        <div className="notification-preview-meta"><span>WhatsApp</span><small>agora</small></div>
        <strong className="notification-preview-sender">Acha+ | Achadinhos</strong>
        <p className="notification-preview-title">{title}</p>
        {description && <p className="notification-preview-description">{description}</p>}
      </div>
    </div>
  );
}

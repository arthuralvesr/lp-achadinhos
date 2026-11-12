import { GroupLink } from "@/components/ui/group-link";
import { WhatsAppMark } from "@/components/ui/icons";

export function GroupInviteChat({ groupNumber }: { groupNumber: number }) {
  return (
    <div className="group-invite-chat">
      <div className="group-chat-header">
        <span className="group-chat-avatar" aria-hidden="true"><WhatsAppMark /></span>
        <div className="group-chat-contact"><h3 className="group-chat-title" id={`group-title-${groupNumber}`}>Acha+ VIP #{groupNumber}</h3><span>Assistente · convite do grupo</span></div>
        <span className="group-chat-available"><span aria-hidden="true" />Vagas disponíveis</span>
      </div>
      <div className="group-chat-thread" role="group" aria-label="Conversa ilustrativa com o convite do grupo">
        <span className="group-chat-label">SEU CONVITE ESTÁ AQUI</span>
        <div className="group-chat-message group-chat-outgoing"><span className="sr-only">Você: </span><p>Quero fazer parte</p><span className="group-chat-receipt" aria-label="Mensagem enviada">✓✓</span></div>
        <div className="group-chat-message group-chat-invitation">
          <span className="group-chat-author">Acha+ · assistente</span>
          <p>Prontinho! Aqui está seu convite. É só tocar abaixo para entrar. 💚</p>
          <div className="group-chat-invite-preview" data-cart-destination><WhatsAppMark /><div><strong>Acha+ VIP #{groupNumber}</strong><span>Ofertas e cupons · WhatsApp</span></div></div>
          <GroupLink className="group-chat-invite-link">Entrar no grupo VIP</GroupLink>
          <small className="group-chat-invite-note">É grátis. É seguro.</small>
        </div>
      </div>
    </div>
  );
}

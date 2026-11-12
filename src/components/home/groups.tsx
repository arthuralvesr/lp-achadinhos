import { groupsContent } from "@/content/groups";
import { Check, WhatsAppMark } from "@/components/ui/icons";
import { GroupInviteChat } from "./group-invite-chat";
import "./groups.css";

function ClosedMark({ small = false }: { small?: boolean }) {
  return <svg width={small ? 15 : 136} height={small ? 15 : 136} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={small ? 5 : 7} strokeLinecap="round" aria-hidden="true"><path d="m10 10 44 44m0-44L10 54" /></svg>;
}

export function Groups() {
  return (
    <section className="groups-section" id="grupos" aria-labelledby="groups-title">
      <div className="groups-container">
        <div className="groups-heading"><span className="groups-eyebrow">{groupsContent.eyebrow}</span><h2 id="groups-title">{groupsContent.title[0]}<br /><span>{groupsContent.title[1]}</span></h2><p>{groupsContent.description}</p></div>
        <div className="groups-grid">
          {groupsContent.groups.map((group) => {
            if (group.status === "open") {
              return <article className="group-card group-card--open" key={group.number} aria-labelledby={`group-title-${group.number}`}><GroupInviteChat groupNumber={group.number} /></article>;
            }
            return (
              <article className={`group-card group-card--${group.status}`} key={group.number} aria-labelledby={`group-title-${group.number}`}>
                <span className="group-status"><span aria-hidden="true" />Lotado</span>
                <div className="group-emblem" aria-hidden="true"><WhatsAppMark /><span className="group-closed-mark"><ClosedMark /></span></div>
                <h3 id={`group-title-${group.number}`}>Acha+ VIP <span>#{group.number}</span></h3>
                <p>As entradas deste grupo estão encerradas.</p>
                <span className="group-unavailable">Não disponível para novas entradas</span>
                <button type="button" className="group-unavailable-button" disabled aria-label={`Grupo ${group.number} lotado; entradas encerradas`}><ClosedMark small />Grupo lotado</button>
              </article>
            );
          })}
        </div>
        <p className="groups-reassurance"><Check />Entrada gratuita<span aria-hidden="true">·</span>É seguro<span aria-hidden="true">·</span>Saia quando quiser</p>
      </div>
    </section>
  );
}

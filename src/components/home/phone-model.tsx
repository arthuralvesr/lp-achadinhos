import type { AnimationEvent, ReactNode } from "react";

/** Volume em CSS 3D: frente interativa, traseira, quinas e faces laterais. */
export function PhoneModel({ children, settled, onLand }: {
  children: ReactNode;
  settled: boolean;
  onLand: () => void;
}) {
  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && event.animationName === "phone-drop-spin") onLand();
  }

  return (
    <div className="phone-arrival"><div className="phone-model" onAnimationEnd={handleAnimationEnd}>
      <div className="phone-volume" aria-hidden="true">
        {Array.from({ length: 13 }, (_, index) => (
          <span className="phone-bevel" style={{ transform: `translateZ(${index * 1.5 - 19}px)` }} key={index} />
        ))}
        <span className="phone-edge phone-edge--left" />
        <span className="phone-edge phone-edge--right" />
        <span className="phone-edge phone-edge--top" />
        <span className="phone-edge phone-edge--bottom"><span className="phone-usb" /></span>
      </div>
      <div className="phone-back-panel" aria-hidden="true">
        <div className="phone-camera-bump">
          <span className="phone-camera-lens phone-camera-lens--one" />
          <span className="phone-camera-lens phone-camera-lens--two" />
          <span className="phone-camera-lens phone-camera-lens--three" />
          <span className="phone-camera-flash" />
          <span className="phone-camera-sensor" />
        </div>
        <span className="phone-back-logo">+</span>
        <span className="phone-back-wordmark">acha+</span>
      </div>
      <div className="phone-front-panel" inert={!settled}>{children}</div>
    </div></div>
  );
}

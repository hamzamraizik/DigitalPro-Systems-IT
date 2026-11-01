import {
  Activity,
  BarChart3,
  Camera,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  Fingerprint,
  Flame,
  Network,
  Server,
  ShieldCheck,
  Video,
  Wrench,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { useTranslation } from "react-i18next";

type ParallaxLayer = {
  el: HTMLElement;
  depth: number;
  dirX: number;
  dirY: number;
  rot: number;
  rotDir: number;
  baseRotate: number;
};

const SMOOTHING_RATE = 6;
const TILT_MAX_DEG = 10;
const RETURN_MS = 500;

const clampSym = (v: number) => Math.max(-1, Math.min(1, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Mouse-move parallax for the hero illustration.
 * - Tracks the cursor relative to the enclosing hero <section>.
 * - Tilts the whole illustration (max 6deg) + translates each
 *   [data-depth] layer with its own amplitude/direction.
 * - Interpolated through requestAnimationFrame (lerp ~0.08);
 *   eases back to rest over 500ms on mouseleave.
 * - Disabled on touch/coarse pointers and with reduced motion.
 * - Transform-only writes, no layout thrash.
 */
function useHeroParallax(
  containerRef: RefObject<HTMLDivElement | null>,
  tiltRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    const tilt = tiltRef.current;
    if (!container || !tilt || typeof window === "undefined") return;
    const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const isTouch =
      "ontouchstart" in window || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
    if (!canHover || isTouch || prefersReduced) return;

    const host: HTMLElement = container.closest("section") ?? container;
    const layers: ParallaxLayer[] = Array.from(
      container.querySelectorAll<HTMLElement>("[data-depth]"),
    ).map((el) => ({
      el,
      depth: Number(el.dataset.depth ?? 0),
      dirX: Number(el.dataset.dirX ?? 1),
      dirY: Number(el.dataset.dirY ?? 1),
      rot: Number(el.dataset.rot ?? 0),
      rotDir: Number(el.dataset.rotDir ?? 1),
      baseRotate: Number(el.dataset.baseRotate ?? 0),
    }));
    if (layers.length === 0) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const returnFrom = { x: 0, y: 0 };
    let returnStart = 0;
    let raf = 0;
    let mode: "idle" | "follow" | "return" = "idle";

    const apply = (nx: number, ny: number) => {
      tilt.style.transform =
        `rotateX(${(-ny * TILT_MAX_DEG).toFixed(3)}deg) ` +
        `rotateY(${(nx * TILT_MAX_DEG).toFixed(3)}deg)`;
      for (const l of layers) {
        const x = nx * l.depth * l.dirX;
        const y = ny * l.depth * l.dirY;
        const r = l.baseRotate + nx * l.rot * l.rotDir;
        l.el.style.transform =
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) ` +
          `rotate(${r.toFixed(3)}deg)`;
      }
    };
    const clear = () => {
      tilt.style.transform = "";
      for (const l of layers) l.el.style.transform = "";
    };

    let lastT = 0;
    const stepFollow = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastT) / 1000 || 0));
      lastT = now;
      const alpha = 1 - Math.exp(-dt * SMOOTHING_RATE);
      current.x += (target.x - current.x) * alpha;
      current.y += (target.y - current.y) * alpha;
      apply(current.x, current.y);
      if (
        Math.abs(target.x - current.x) < 0.0005 &&
        Math.abs(target.y - current.y) < 0.0005
      ) {
        current.x = target.x;
        current.y = target.y;
        apply(current.x, current.y);
        if (target.x === 0 && target.y === 0) {
          clear();
          mode = "idle";
          return;
        }
      }
      raf = requestAnimationFrame(stepFollow);
    };
    const startFollow = () => {
      if (mode === "follow") return;
      mode = "follow";
      cancelAnimationFrame(raf);
      lastT = performance.now();
      raf = requestAnimationFrame(stepFollow);
    };
    const stepReturn = (now: number) => {
      const t = Math.min(1, (now - returnStart) / RETURN_MS);
      const e = easeOutCubic(t);
      current.x = returnFrom.x * (1 - e);
      current.y = returnFrom.y * (1 - e);
      apply(current.x, current.y);
      if (t < 1) {
        raf = requestAnimationFrame(stepReturn);
      } else {
        clear();
        mode = "idle";
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      target.x = clampSym((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      target.y = clampSym((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
      startFollow();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      returnFrom.x = current.x;
      returnFrom.y = current.y;
      cancelAnimationFrame(raf);
      if (Math.abs(returnFrom.x) < 0.0005 && Math.abs(returnFrom.y) < 0.0005) {
        clear();
        mode = "idle";
        return;
      }
      mode = "return";
      returnStart = performance.now();
      raf = requestAnimationFrame(stepReturn);
    };
    const onMotionChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      cancelAnimationFrame(raf);
      mode = "idle";
      clear();
    };

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    const mqMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    mqMotion?.addEventListener?.("change", onMotionChange);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      mqMotion?.removeEventListener?.("change", onMotionChange);
    };
  }, [containerRef, tiltRef]);
}

const GLASS =
  "absolute z-[2] rounded-2xl border px-[16px] py-[14px] " +
  "border-[#0B1F3F]/10 bg-white text-[#37423f] shadow-[0_8px_20px_-8px_rgba(11,31,63,0.12)] " +
  "dark:border-white/20 dark:bg-[#161c1a] dark:text-[#e7ece9] dark:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]";

const STAT_ROW =
  "flex items-center gap-[10px] mt-[8px] text-[13px] text-[#55605c] dark:text-[#c7d0cc]";

const BARS = (
  <div className="hi-bars">
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
);

export const HeroIllustration = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  useHeroParallax(containerRef, tiltRef);

  return (
  <div
    ref={containerRef}
    className="relative mx-auto hidden h-[500px] w-full max-w-[640px] lg:block"
    style={{ perspective: "1000px" }}
  >
    <style>{`
      .hi-comp{position:absolute;left:230px;top:60px;width:340px;z-index:2;transform:rotate(6deg);}
      .hi-mon{background:linear-gradient(155deg,#dde0de,#a8b0ac);border:2px solid #99a19d;border-radius:14px;padding:10px;box-shadow:0 12px 24px rgba(11,31,63,0.12);}
      .hi-screenc{position:relative;background:linear-gradient(160deg,#f6f9f8,#dfe5e2);border-radius:8px;padding:16px 18px;color:#1c2320;height:190px;box-sizing:border-box;overflow:hidden;}
      .hi-neck{width:16px;height:28px;background:linear-gradient(155deg,#c3c9c6,#9aa39f);margin:0 auto;}
      .hi-base{width:110px;height:9px;border-radius:4px;background:linear-gradient(155deg,#c3c9c6,#9aa39f);margin:0 auto;box-shadow:0 6px 14px rgba(11,31,63,0.2);}
      .dark .hi-mon{background:linear-gradient(155deg,#3a3f3e,#101312);border-color:#55605c;box-shadow:0 12px 24px rgba(0,0,0,0.4);}
      .dark .hi-screenc{background:linear-gradient(160deg,#161c1a,#040605);color:#e7ece9;}
      .dark .hi-neck{background:linear-gradient(155deg,#4a5350,#202623);}
      .dark .hi-base{background:linear-gradient(155deg,#4a5350,#202623);box-shadow:0 6px 14px rgba(0,0,0,0.4);}
      .hi-scr{position:absolute;inset:16px 18px;opacity:0;transform:translateX(24px);}
      .hi-s1{opacity:1;transform:none;}
      .hi-status{display:flex;justify-content:space-between;font-size:11px;color:#48524e;font-weight:600;}
      .hi-live{display:flex;align-items:center;gap:4px;color:#00AEEF;font-weight:600;}
      .hi-lp{width:5px;height:5px;border-radius:9999px;background:#00AEEF;}
      .hi-mini{display:flex;align-items:center;gap:18px;margin-top:10px;}
      .hi-minicard{display:flex;flex-direction:column;align-items:center;}
      .hi-ring{position:relative;display:flex;align-items:center;justify-content:center;}
      .hi-ring span{position:absolute;font-size:12px;font-weight:700;}
      .hi-minilbl{font-size:8px;color:#6b746f;margin-top:2px;}
      .hi-ic{color:#00AEEF;flex-shrink:0;}
      .hi-bars{display:flex;align-items:flex-end;gap:5px;height:40px;flex:1;}
      .hi-bars span{width:9px;border-radius:3px;background:linear-gradient(180deg,#00AEEF,#0B6C92);box-shadow:0 0 6px rgba(0,174,239,0.5);}
      .hi-bars span:nth-child(1){height:40%}.hi-bars span:nth-child(2){height:60%}.hi-bars span:nth-child(3){height:35%}.hi-bars span:nth-child(4){height:80%}.hi-bars span:nth-child(5){height:55%}.hi-bars span:nth-child(6){height:70%}.hi-bars span:nth-child(7){height:50%}
      .hi-bigs{margin-top:16px;height:50px;}
      .hi-approw{display:flex;align-items:center;gap:6px;font-size:11px;color:#48524e;margin-top:7px;}
      .hi-dot{width:6px;height:6px;border-radius:9999px;flex-shrink:0;background:#00AEEF;box-shadow:0 0 5px rgba(0,174,239,0.7);}
      .hi-dot.warn{background:#f0b955;box-shadow:0 0 5px rgba(240,185,85,0.7);}
      .hi-msg{margin-top:8px;font-size:12px;line-height:1.5;overflow-wrap:break-word;color:#37423f;background:rgba(11,31,63,0.05);border:1px solid transparent;border-radius:8px;padding:10px 12px;}
      .dark .hi-status{color:#c7d0cc;}
      .dark .hi-approw{color:#c7d0cc;}
      .dark .hi-minilbl{color:#8a9490;}
      .dark .hi-msg{color:#d3dbd7;background:rgba(255,255,255,0.06);}
      .hi-track{stroke:rgba(18,26,23,0.12);}
      .dark .hi-track{stroke:rgba(255,255,255,0.1);}
      .hi-siren{position:absolute;left:58px;top:206px;width:46px;z-index:2;}
      .hi-siren .sB{fill:rgba(0,174,239,0.10);stroke:#00AEEF;stroke-opacity:0.7;}
      .hi-siren .sH{fill:none;stroke:#00AEEF;stroke-opacity:0.5;}
      .hi-siren .sL{fill:#00AEEF;}
      .hi-rack{position:absolute;left:582px;top:150px;width:38px;z-index:2;}
      .hi-rack .u{fill:rgba(255,255,255,0.6);stroke:#00AEEF;stroke-opacity:0.55;}
      .hi-rack .v{stroke:#00AEEF;stroke-opacity:0.45;}
      .hi-rack .d{fill:#00AEEF;}
      .dark .hi-rack .u{fill:rgba(255,255,255,0.07);}
      .hi-sh{position:absolute;left:374px;top:368px;width:48px;z-index:2;}
      .hi-sh .sh{fill:rgba(0,174,239,0.10);stroke:#00AEEF;stroke-opacity:0.8;stroke-width:1.8;}
      .hi-sh .lk{fill:none;stroke:#00AEEF;stroke-opacity:0.9;stroke-width:1.8;}
      .hi-tab{position:absolute;top:-14px;left:20px;background:linear-gradient(160deg,#8b9490,#4a5350);color:#0a0d0c;font-size:11px;font-weight:700;padding:5px 12px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.4);}
      .hi-bar{height:10px;background:linear-gradient(90deg,#9aa39f,#6b746f);border-radius:5px;margin-top:16px;}
      @media (prefers-reduced-motion: no-preference){
        @keyframes hi-scrCycle{0%{opacity:0;transform:scale(0.985) translateX(26px)}4%{opacity:1;transform:scale(1) translateX(0)}23%{opacity:1;transform:scale(1) translateX(0)}28%{opacity:0;transform:scale(0.995) translateX(-26px)}100%{opacity:0;}}
        .hi-scr{animation:hi-scrCycle 16s ease-in-out infinite;}
        .hi-s1{animation-delay:0s}.hi-s2{animation-delay:4s}.hi-s3{animation-delay:8s}.hi-s4{animation-delay:12s}
        @keyframes hi-blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .hi-lp{animation:hi-blink 1.2s ease-in-out infinite;}
        @keyframes hi-ringRot{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .hi-ring svg{animation:hi-ringRot 36s linear infinite;}

        @keyframes hi-rowReveal{0%{opacity:0;transform:translateY(7px)}2%{opacity:0;transform:translateY(7px)}3%{opacity:1;transform:translateY(0)}25%{opacity:1;transform:translateY(0)}28%{opacity:0;transform:translateY(-4px)}100%{opacity:0}}
        .hi-approw,.hi-mini,.hi-msg,.hi-net,.hi-bigs{animation:hi-rowReveal 16s ease-out infinite;}
        @keyframes hi-sonar{0%{transform:scale(0.95);opacity:0.7}70%{transform:scale(1.6);opacity:0}100%{transform:scale(1.6);opacity:0}}
        .hi-sonar{animation:hi-sonar 2.8s ease-out infinite;}
        .hi-sonar.b{animation-delay:1.4s;}
        @keyframes hi-breathe{0%,100%{box-shadow:0 12px 24px rgba(11,31,63,0.10)}50%{box-shadow:0 12px 32px rgba(11,31,63,0.18)}}
        .hi-mon{animation:hi-breathe 5s ease-in-out infinite;}
        @keyframes hi-breatheDark{0%,100%{box-shadow:0 12px 24px rgba(0,0,0,0.40)}50%{box-shadow:0 12px 36px rgba(0,0,0,0.50)}}
        .dark .hi-mon{animation:hi-breatheDark 5s ease-in-out infinite;}
        @keyframes hi-alertPulse{0%,100%{border-color:rgba(240,185,85,0.3)}50%{border-color:rgba(240,185,85,0.85)}}
        .hi-msg{animation:hi-rowReveal 16s ease-out infinite, hi-alertPulse 1.4s ease-in-out infinite;animation-delay:8.4s, 8.1s;}
        @keyframes hi-warnPulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.6)}}
        .hi-dot.warn{animation:hi-warnPulse 1.2s ease-in-out infinite;}
        .hi-siren .sL{animation:hi-blink 1.8s ease-in-out infinite 0.2s;}
        .hi-rack .d:nth-of-type(2){animation:hi-blink 2.4s ease-in-out infinite 0.6s;}
        .hi-sh{animation:hi-shPulse 3.6s ease-in-out infinite;}
        @keyframes hi-shPulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes hi-fA{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes hi-fE{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes hi-fF{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        .hi-fA{animation:hi-fA 6s ease-in-out infinite;}
        .hi-fE{animation:hi-fE 6.4s ease-in-out infinite;}
        .hi-fF{animation:hi-fF 5.8s ease-in-out infinite;}
      }
    `}</style>

    <div
      ref={tiltRef}
      className="absolute inset-0"
      style={{ willChange: "transform" }}
    >
    <svg
      viewBox="0 0 640 500"
      className="absolute inset-0 z-[1] h-full w-full"
      fill="none"
      aria-hidden
    >
      <line x1="0" y1="90" x2="640" y2="65" stroke="#ffffff" strokeWidth="0.5" opacity="0.06" />
      <line x1="0" y1="270" x2="640" y2="245" stroke="#ffffff" strokeWidth="0.5" opacity="0.06" />
      <line x1="0" y1="430" x2="640" y2="405" stroke="#ffffff" strokeWidth="0.5" opacity="0.06" />

      <g stroke="#00AEEF" strokeWidth="1" fill="none" opacity="0.35">
        <path d="M240,150 C220,140 180,110 150,60" />
        <path d="M300,270 C260,290 180,300 120,320" />
        <path d="M400,140 C420,110 460,70 490,40" />
        <path d="M430,270 C480,280 550,290 600,300" />
      </g>
    </svg>

    <svg
      className="hi-siren will-change-transform"
      viewBox="0 0 56 52"
      role="img"
      aria-label={t("illustration.alarmSystem")}
      data-depth="16"
      data-dir-x="-1"
      data-dir-y="-1"
    >
      <rect className="sB" x="12" y="4" width="32" height="7" rx="3.5" />
      <rect className="sB" x="24" y="11" width="8" height="7" rx="3" />
      <rect className="sB" x="16" y="18" width="24" height="26" rx="7" />
      <circle className="sH" cx="28" cy="30" r="9" />
      <circle className="sH" cx="28" cy="30" r="5" />
      <circle className="sL" cx="28" cy="14" r="2.2" />
    </svg>

    <div
      className="absolute z-[2] left-[112px] top-[218px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_4px_10px_rgba(11,31,63,0.08)] will-change-transform dark:border-white/20 dark:bg-[#161c1a] dark:text-[#00AEEF]"
      data-depth="16"
      data-dir-x="-1"
      data-dir-y="1"
    >
      <Flame size={14} className="text-[#00AEEF]" />{t("illustration.alarm")}
    </div>

    <svg className="hi-rack" viewBox="0 0 38 62" role="img" aria-label={t("illustration.serverRack")}>
      <rect className="u" x="2" y="3" width="34" height="14" rx="2.5" />
      <circle className="d" cx="8" cy="10" r="1.6" />
      <path className="v" d="M14 6h16M14 14h16" />
      <rect className="u" x="2" y="23" width="34" height="14" rx="2.5" />
      <circle className="d" cx="8" cy="30" r="1.6" />
      <path className="v" d="M14 26h16M14 34h16" />
      <rect className="u" x="2" y="43" width="34" height="14" rx="2.5" />
      <circle className="d" cx="8" cy="50" r="1.6" />
      <path className="v" d="M14 46h16M14 54h16" />
    </svg>

    <div className="absolute z-[2] left-[50px] top-[300px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_4px_10px_rgba(11,31,63,0.08)] dark:border-white/20 dark:bg-[#161c1a] dark:text-[#00AEEF]">
      <Server size={14} className="text-[#00AEEF]" />{t("illustration.serversSurveilled")}
    </div>

    <svg
      className="hi-sh will-change-transform"
      viewBox="0 0 48 60"
      role="img"
      aria-label={t("illustration.security")}
      data-depth="16"
      data-dir-x="1"
      data-dir-y="-1"
    >
      <path
        className="sh"
        d="M24 3 L43 9.5 V27 C43 41 35 50 24 54 C13 50 5 41 5 27 V9.5 Z"
      />
      <path className="lk" d="M20 21 a4.5 4.5 0 0 1 9 0 v4" />
      <path className="lk" d="M18 25 h12 v10 h-12 z" />
      <circle className="lk" cx="24" cy="30" r="1.8" />
    </svg>

    <div
      className="absolute z-[2] left-[430px] top-[390px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_4px_10px_rgba(11,31,63,0.08)] will-change-transform dark:border-white/20 dark:bg-[#161c1a] dark:text-[#00AEEF]"
      data-depth="16"
      data-dir-x="1"
      data-dir-y="-1"
    >
      <ShieldCheck size={14} className="text-[#00AEEF]" />{t("illustration.security")}
    </div>

    <div className="absolute z-[2] left-[415px] top-[138px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_4px_10px_rgba(11,31,63,0.08)] dark:border-white/20 dark:bg-[#161c1a] dark:text-[#00AEEF]">
      <Fingerprint size={14} className="text-[#00AEEF]" />{t("illustration.biometric")}
    </div>

    <div
      className="absolute z-[2] left-[300px] top-[10px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_4px_10px_rgba(11,31,63,0.08)] will-change-transform dark:border-white/20 dark:bg-[#161c1a] dark:text-[#00AEEF]"
      data-depth="22"
      data-dir-x="1"
      data-dir-y="1"
      data-rot="2.5"
      data-rot-dir="-1"
    >
      <BarChart3 size={14} className="text-[#00AEEF]" />ERP
    </div>

    <div
      className="hi-comp will-change-transform"
      data-depth="10"
      data-dir-x="1"
      data-dir-y="1"
      data-base-rotate="6"
    >
      <div className="hi-mon">
        <div className="hi-screenc">
          <div className="hi-scr hi-s1">
            <div className="hi-status">
              <span>{t("illustration.adminTitle")}</span>
              <span className="hi-live">
                <span className="hi-lp" />
                {t("illustration.socActive")}
              </span>
            </div>
            <div className="hi-mini" style={{ animationDelay: "0.15s" }}>
              <div className="hi-minicard">
                <div className="hi-ring">
                  <span className="hi-sonar" />
                  <span className="hi-sonar b" />
                  <svg viewBox="0 0 100 100" width="46" height="46">
                    <circle cx="50" cy="50" r="42" fill="none" className="hi-track" strokeWidth="9" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#00AEEF"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray="264"
                      strokeDashoffset="24"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span>98</span>
                </div>
                <div className="hi-minilbl">{t("illustration.security")}</div>
              </div>
              {BARS}
            </div>
            <div className="hi-approw" style={{ animationDelay: "0.4s" }}>
              <Activity className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.liveMonitoring")}
            </div>
            <div className="hi-approw" style={{ animationDelay: "0.6s" }}>
              <ShieldCheck className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.firewallActive")}
            </div>
            <div className="hi-approw" style={{ animationDelay: "0.8s" }}>
              <Database className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.backupOk")}
            </div>
          </div>

          <div className="hi-scr hi-s2">
            <div className="hi-status">
              <span>{t("illustration.networkCloud")}</span>
              <span className="hi-live">
                <span className="hi-lp" />
                {t("illustration.live")}
              </span>
            </div>
            <div className="hi-net" style={{ marginTop: 8, animationDelay: "4.3s" }}>
              <svg viewBox="0 0 220 90" width="100%" height="58">
              <circle cx="110" cy="45" r="8" fill="#00AEEF" />
              <circle cx="30" cy="20" r="6" fill="none" stroke="#00AEEF" strokeWidth="2" />
              <circle cx="30" cy="70" r="6" fill="none" stroke="#00AEEF" strokeWidth="2" />
              <circle cx="190" cy="20" r="6" fill="none" stroke="#00AEEF" strokeWidth="2" />
              <circle cx="190" cy="70" r="6" fill="none" stroke="#00AEEF" strokeWidth="2" />
              <g stroke="#00AEEF" strokeWidth="1.4" opacity="0.5">
                <line x1="36" y1="24" x2="103" y2="41" />
                <line x1="36" y1="66" x2="103" y2="49" />
                <line x1="184" y1="24" x2="117" y2="41" />
                <line x1="184" y1="66" x2="117" y2="49" />
              </g>
            </svg>
            </div>
            <div className="hi-approw" style={{ animationDelay: "4.45s" }}>
              <Network className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.latency")}
            </div>
            <div className="hi-approw" style={{ animationDelay: "4.65s" }}>
              <Cloud className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.cloudMigration")}
            </div>
          </div>

          <div className="hi-scr hi-s3">
            <div className="hi-status">
              <span>{t("illustration.securityAlerts")}</span>
              <span className="hi-live" style={{ color: "#f0b955" }}>
                42
              </span>
            </div>
            <div className="hi-msg">{t("illustration.anomaly")}</div>
            <div className="hi-approw" style={{ animationDelay: "8.3s" }}>
              <Activity className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.analyzing")}
            </div>
            <div className="hi-approw" style={{ animationDelay: "8.5s" }}>
              <ShieldCheck className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.isolated")}
            </div>
            <div className="hi-approw" style={{ animationDelay: "8.7s" }}>
              <CheckCircle2 className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.reportSent")}
            </div>
          </div>

          <div className="hi-scr hi-s4">
            <div className="hi-status">
              <span>{t("illustration.availability")}</span>
              <span className="hi-live">98.5%</span>
            </div>
            <div className="hi-bars hi-bigs" style={{ animationDelay: "12.1s" }}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="hi-approw" style={{ animationDelay: "12.3s" }}>
              <Server className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.noDowntime")}
            </div>
            <div className="hi-approw" style={{ animationDelay: "12.55s" }}>
              <Cpu className="hi-ic" size={11} strokeWidth={2.4} />
              {t("illustration.serversMonitored")}
            </div>
          </div>
        </div>
      </div>
      <div className="hi-neck" />
      <div className="hi-base" />
    </div>

    <div
      className={`${GLASS} left-[20px] top-[30px] w-[230px] will-change-transform`}
      data-depth="22"
      data-dir-x="-1"
      data-dir-y="-1"
      data-rot="2.5"
      data-rot-dir="1"
    >
      <div className="hi-fA">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">{t("illustration.surveillance")}</span>
          <span className="rounded-full border border-[#00AEEF]/50 bg-[#00AEEF]/15 px-2 py-[1px] text-[11px] font-bold text-[#0B6C92] dark:text-[#00AEEF]">
            LIVE
          </span>
        </div>
        <div className={STAT_ROW}>
          <Camera className="hi-ic" size={13} />{t("illustration.camerasActive")}
        </div>
        <div className={STAT_ROW}>
          <Video className="hi-ic" size={13} />{t("illustration.continuousRecord")}
        </div>
      </div>
    </div>

    <div className="he-conn absolute left-[24px] top-[16px] z-[1] h-[1.5px] w-[40px] rounded-full bg-[#00AEEF]/40 dark:bg-[#00AEEF]/40" />

    <div
      className={`${GLASS} left-[400px] top-[20px] w-[190px] will-change-transform`}
      data-depth="30"
      data-dir-x="-1"
      data-dir-y="1"
      data-rot="3"
      data-rot-dir="1"
    >
      <div className="hi-fE">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">{t("illustration.supportIt")}</span>
          <span className="rounded-full border border-[#00AEEF]/50 bg-[#00AEEF]/15 px-2 py-[1px] text-[11px] font-bold text-[#0B6C92] dark:text-[#00AEEF]">
            24/7
          </span>
        </div>
        <div className={STAT_ROW}>
          <CheckCircle2 className="hi-ic" size={13} />{t("illustration.ticketResolved")}
        </div>
        <div className={STAT_ROW}>
          <Wrench className="hi-ic" size={13} />{t("illustration.remoteAssist")}
        </div>
      </div>
    </div>

    <div
      className={`${GLASS} left-[540px] top-[250px] w-[130px] will-change-transform`}
      data-depth="30"
      data-dir-x="1"
      data-dir-y="-1"
      data-rot="3"
      data-rot-dir="-1"
    >
      <div className="hi-fF">
        <div className="text-[13px] font-semibold" style={{ marginBottom: 6 }}>
          {t("illustration.uptime")}
        </div>
        <div className="text-[22px] font-bold">99.9%</div>
      </div>
    </div>
    </div>
  </div>
);
};
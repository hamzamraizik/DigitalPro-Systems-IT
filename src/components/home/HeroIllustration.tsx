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
import { useTranslation } from "react-i18next";

const GLASS =
  "absolute z-[2] rounded-2xl border px-[16px] py-[14px] backdrop-blur-md " +
  "border-[#0B1F3F]/10 bg-white/70 text-[#37423f] shadow-[0_12px_30px_rgba(11,31,63,0.15)] " +
  "dark:border-white/20 dark:bg-white/[0.09] dark:text-[#e7ece9] dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)]";

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

  return (
  <div className="relative mx-auto hidden h-[500px] w-full max-w-[640px] lg:block">
    <style>{`
      .hi-glow{position:absolute;width:8px;height:8px;border-radius:9999px;background:#00AEEF;box-shadow:0 0 12px 4px rgba(0,174,239,0.6);z-index:2;}
      .hi-glow.small{width:5px;height:5px;box-shadow:0 0 8px 3px rgba(0,174,239,0.5);}
      .hi-comp{position:absolute;left:230px;top:60px;width:340px;z-index:2;transform:rotate(6deg);}
      .hi-mon{background:linear-gradient(155deg,#dde0de,#a8b0ac);border:2px solid #99a19d;border-radius:14px;padding:10px;box-shadow:0 20px 40px rgba(11,31,63,0.18);}
      .hi-screenc{position:relative;background:linear-gradient(160deg,#f6f9f8,#dfe5e2);border-radius:8px;padding:16px 18px;color:#1c2320;height:190px;box-sizing:border-box;overflow:hidden;}
      .hi-neck{width:16px;height:28px;background:linear-gradient(155deg,#c3c9c6,#9aa39f);margin:0 auto;}
      .hi-base{width:110px;height:9px;border-radius:4px;background:linear-gradient(155deg,#c3c9c6,#9aa39f);margin:0 auto;box-shadow:0 6px 14px rgba(11,31,63,0.2);}
      .dark .hi-mon{background:linear-gradient(155deg,#3a3f3e,#101312);border-color:#55605c;box-shadow:0 20px 40px rgba(0,0,0,0.5);}
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
        @keyframes hi-breathe{0%,100%{box-shadow:0 18px 40px rgba(11,31,63,0.15)}50%{box-shadow:0 18px 60px rgba(11,31,63,0.32)}}
        .hi-mon{animation:hi-breathe 5s ease-in-out infinite;}
        @keyframes hi-breatheDark{0%,100%{box-shadow:0 20px 40px rgba(0,0,0,0.5)}50%{box-shadow:0 20px 70px rgba(0,0,0,0.72)}}
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
        @keyframes hi-fC{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes hi-fE{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes hi-fF{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        .hi-fA{animation:hi-fA 6s ease-in-out infinite;}
        .hi-fC{animation:hi-fC 6.2s ease-in-out infinite;}
        .hi-fE{animation:hi-fE 6.4s ease-in-out infinite;}
        .hi-fF{animation:hi-fF 5.8s ease-in-out infinite;}
      }
    `}</style>

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

    <div className="hi-glow" style={{ left: 560, top: 120 }} />
    <div className="hi-glow" style={{ left: 70, top: 340 }} />
    <div className="hi-glow small" style={{ left: 40, top: 60 }} />
    <div className="hi-glow small" style={{ left: 600, top: 320 }} />
    <div className="hi-glow small" style={{ left: 262, top: 118 }} />
    <div className="hi-glow small" style={{ left: 30, top: 300 }} />
    <div className="hi-glow small" style={{ left: 420, top: 356 }} />

    <svg className="hi-siren" viewBox="0 0 56 52" role="img" aria-label={t("illustration.alarmSystem")}>
      <rect className="sB" x="12" y="4" width="32" height="7" rx="3.5" />
      <rect className="sB" x="24" y="11" width="8" height="7" rx="3" />
      <rect className="sB" x="16" y="18" width="24" height="26" rx="7" />
      <circle className="sH" cx="28" cy="30" r="9" />
      <circle className="sH" cx="28" cy="30" r="5" />
      <circle className="sL" cx="28" cy="14" r="2.2" />
    </svg>

    <div className="absolute z-[2] left-[112px] top-[218px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white/70 px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_6px_16px_rgba(11,31,63,0.12)] backdrop-blur-md dark:border-white/20 dark:bg-white/[0.09] dark:text-[#00AEEF]">
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

    <div className="absolute z-[2] left-[548px] top-[226px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white/70 px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_6px_16px_rgba(11,31,63,0.12)] backdrop-blur-md dark:border-white/20 dark:bg-white/[0.09] dark:text-[#00AEEF]">
      <Server size={14} className="text-[#00AEEF]" />{t("illustration.serversSurveilled")}
    </div>

    <svg className="hi-sh" viewBox="0 0 48 60" role="img" aria-label={t("illustration.security")}>
      <path
        className="sh"
        d="M24 3 L43 9.5 V27 C43 41 35 50 24 54 C13 50 5 41 5 27 V9.5 Z"
      />
      <path className="lk" d="M20 21 a4.5 4.5 0 0 1 9 0 v4" />
      <path className="lk" d="M18 25 h12 v10 h-12 z" />
      <circle className="lk" cx="24" cy="30" r="1.8" />
    </svg>

    <div className="absolute z-[2] left-[430px] top-[390px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white/70 px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_6px_16px_rgba(11,31,63,0.12)] backdrop-blur-md dark:border-white/20 dark:bg-white/[0.09] dark:text-[#00AEEF]">
      <ShieldCheck size={14} className="text-[#00AEEF]" />{t("illustration.security")}
    </div>

    <div className="absolute z-[2] left-[415px] top-[138px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white/70 px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_6px_16px_rgba(11,31,63,0.12)] backdrop-blur-md dark:border-white/20 dark:bg-white/[0.09] dark:text-[#00AEEF]">
      <Fingerprint size={14} className="text-[#00AEEF]" />{t("illustration.biometric")}
    </div>

    <div className="absolute z-[2] left-[300px] top-[10px] flex items-center gap-[6px] rounded-[10px] border border-[#0B1F3F]/10 bg-white/70 px-[9px] py-[6px] text-[10px] font-semibold text-[#0B6C92] shadow-[0_6px_16px_rgba(11,31,63,0.12)] backdrop-blur-md dark:border-white/20 dark:bg-white/[0.09] dark:text-[#00AEEF]">
      <BarChart3 size={14} className="text-[#00AEEF]" />ERP
    </div>

    <div className="hi-comp">
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

    <div className={`${GLASS} hi-fA left-[20px] top-[30px] w-[230px]`}>
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

    <div className="he-conn absolute left-[24px] top-[16px] z-[1] h-[1.5px] w-[40px] rounded-full bg-[#00AEEF]/40 dark:bg-[#00AEEF]/40" />

    <div className={`${GLASS} hi-fC left-[20px] top-[290px] w-[185px]`}>
      <div className="text-[15px] font-semibold" style={{ marginBottom: 8 }}>
        {t("illustration.systemStatus")}
      </div>
      <div className={STAT_ROW}>
        <Network className="hi-ic" size={13} />{t("illustration.network")}
      </div>
      <div className={STAT_ROW}>
        <Database className="hi-ic" size={13} />{t("illustration.backups")}
      </div>
      <div className={STAT_ROW}>
        <Flame className="hi-ic" size={13} />{t("illustration.firewall")}
      </div>
    </div>

    <div className={`${GLASS} hi-fE left-[400px] top-[20px] w-[190px]`}>
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

    <div className={`${GLASS} hi-fF left-[540px] top-[250px] w-[130px]`}>
      <div className="text-[13px] font-semibold" style={{ marginBottom: 6 }}>
        {t("illustration.uptime")}
      </div>
      <div className="text-[22px] font-bold">99.9%</div>
    </div>
  </div>
);
};
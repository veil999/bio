import { useEffect, useRef, useState, type ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

type SocialLink = {
  name: string;
  href: string;
  icon: ReactNode;
};

const DiscordIcon = () => (
  <svg viewBox="0 -28.5 256 256" fill="currentColor" className="size-6" aria-hidden="true">
    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
    <path d="M19.7773,4.42984 C20.8652,3.97177 22.0315,4.8917 21.8394,6.05639 L19.5705,19.8131 C19.3517,21.1395 17.8949,21.9006 16.678,21.2396 C15.6597,20.6865 14.1489,19.8352 12.7873,18.9455 C12.1074,18.5012 10.0255,17.0766 10.2814,16.0625 C10.5002,15.1954 14.0001,11.9375 16.0001,10 C16.7857,9.23893 16.4279,8.79926 15.5001,9.5 C13.1985,11.2383 9.50332,13.8812 8.28136,14.625 C7.20323,15.2812 6.64031,15.3932 5.96886,15.2812 C4.74273,15.0769 3.60596,14.7605 2.67788,14.3758 C1.42351,13.8558 1.48461,12.132 2.67703,11.63 L19.7773,4.42984 Z" />
  </svg>
);

const RobloxIcon = () => (
  <svg viewBox="0 0 1333.35 1333.35" fill="currentColor" className="size-6" aria-hidden="true">
    <path d="M272.91 0L0 1060.43l1060.43 272.91L1333.34 272.9 272.91-.01zm316.86 536.5l207 53.25-53.28 207.02-207-53.28 53.28-207z" />
  </svg>
);

const socials: SocialLink[] = [
  { name: "discord", href: "https://discord.com/users/420526391348428800", icon: <DiscordIcon /> },
  { name: "telegram", href: "https://t.me/temp71111111111111111", icon: <TelegramIcon /> },
  { name: "roblox", href: "https://www.roblox.com/users/4806433456/profile", icon: <RobloxIcon /> },
];

const TARGET_VOLUME = 0.45;
const FADE_MS = 600;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const fadeAudio = (
  audio: HTMLAudioElement,
  from: number,
  to: number,
  duration: number,
  tokenRef: { current: number },
) => {
  const myToken = ++tokenRef.current;
  const start = performance.now();
  const safeFrom = clamp01(from);
  const safeTo = clamp01(to);
  try {
    audio.volume = safeFrom;
  } catch {}
  const step = (now: number) => {
    if (myToken !== tokenRef.current) return;
    const t = Math.min(1, (now - start) / duration);
    try {
      audio.volume = clamp01(safeFrom + (safeTo - safeFrom) * t);
    } catch {}
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTokenRef = useRef(0);
  const muteTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.title = "flaire";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "hi,, :3");
  }, []);

  const handleEnter = () => {
    setEntered(true);
    const audio = audioRef.current;
    if (audio) {
      try { audio.volume = 0; } catch {}
      audio.play().then(() => fadeAudio(audio, 0, TARGET_VOLUME, 1200, fadeTokenRef)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muteTimerRef.current !== null) {
      window.clearTimeout(muteTimerRef.current);
      muteTimerRef.current = null;
    }
    if (muted) {
      audio.muted = false;
      fadeAudio(audio, 0, TARGET_VOLUME, FADE_MS, fadeTokenRef);
      setMuted(false);
    } else {
      const startVol = audio.volume;
      fadeAudio(audio, startVol, 0, FADE_MS, fadeTokenRef);
      muteTimerRef.current = window.setTimeout(() => {
        audio.muted = true;
        muteTimerRef.current = null;
      }, FADE_MS);
      setMuted(true);
    }
  };

  return (
    <div className="min-h-dvh bg-background text-muted-foreground overflow-hidden relative">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] size-96 nerve-glow opacity-30 animate-drift" />
        <div
          className="absolute bottom-[-15%] right-[-10%] size-[600px] nerve-glow opacity-20 animate-drift"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 size-72 nerve-glow opacity-10 animate-drift"
          style={{ animationDelay: "-10s" }}
        />
      </div>

      <audio ref={audioRef} src="/audio/intro.mp3" loop preload="auto" />

      {/* Intro Gate */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-1000 ${
          entered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 size-full nerve-glow opacity-50 animate-pulse-slow" />
          <button
            type="button"
            onClick={handleEnter}
            className="relative z-10 cursor-pointer flex flex-col items-center gap-8 group focus:outline-none"
            aria-label="Enter flaire"
          >
            <h1 className="font-serif-display text-6xl md:text-8xl text-foreground italic tracking-tighter transition-all duration-700 group-hover:tracking-normal">
              flaire
            </h1>
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
              <span className="font-mono-display text-[10px] tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                click to enter
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main */}
      <main
        className={`relative z-10 max-w-[540px] mx-auto px-6 py-20 md:py-28 min-h-dvh flex flex-col transition-opacity duration-1000 delay-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      >
        <header className="flex flex-col items-center text-center mb-14 animate-fade-in-up">
          <div className="size-24 rounded-full p-[1px] bg-gradient-to-b from-primary/40 via-foreground/10 to-transparent mb-7">
            <div className="size-full rounded-full overflow-hidden bg-card">
              <img src={avatarImg} alt="flaire avatar" className="size-full object-cover" />
            </div>
          </div>

          <h2 className="font-serif-display text-5xl md:text-6xl text-foreground italic mb-3 tracking-tight">
            flaire
          </h2>

          <span className="font-mono-display text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4">
            16
          </span>

          <p className="font-mono-display text-xs leading-relaxed max-w-[310px] opacity-60 tracking-tight">
            "I'm such a fag." — Tank, My Best Friend's Girl
            <br />
            I love nerves ♡ my babyyy
          </p>
        </header>

        {/* Social Icons */}
        <nav
          aria-label="Social links"
          className="flex justify-center gap-5 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.name}
              className="group relative size-14 rounded-full glass-card flex items-center justify-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <span className="text-foreground/85 group-hover:text-primary transition-colors">
                {s.icon}
              </span>
              <span className="absolute -bottom-6 font-mono-display text-[9px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-60 transition-opacity">
                {s.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Link cards */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {[
            { tag: "Protocol 01", label: "pegasus.tech", href: "https://pegasuste.ch" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="glass-card group flex items-center justify-between p-5 hover:bg-foreground/5 transition-all duration-500 hover:translate-x-1"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono-display text-[10px] uppercase tracking-widest text-primary/60">
                  {l.tag}
                </span>
                <span className="text-foreground/90 font-medium">{l.label}</span>
              </div>
              <div className="size-8 flex items-center justify-center rounded-full border border-foreground/5 group-hover:border-primary/30 transition-colors">
                <div className="size-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-auto pt-20 pb-4 flex flex-col items-center">
          <div className="w-12 h-px bg-foreground/10 mb-4" />
          <p className="font-mono-display text-[9px] uppercase tracking-[0.3em] opacity-25">
            system active / terminal 09-x
          </p>
        </footer>
      </main>

      {/* Mute toggle */}
      {entered && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="fixed bottom-5 right-5 z-40 size-10 rounded-full glass-card flex items-center justify-center hover:border-primary/40 transition-colors"
        >
          {muted ? (
            <VolumeX className="size-4 text-foreground/70" />
          ) : (
            <Volume2 className="size-4 text-foreground/70" />
          )}
        </button>
      )}
    </div>
  );
};

export default Index;

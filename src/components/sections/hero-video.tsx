"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Vidéo des réalisations dans le haut de page.
 * Les navigateurs n'autorisent la lecture automatique qu'en muet :
 * la vidéo démarre sans le son, et le bouton « Activer le son » l'allume.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    video.play().catch(() => setPlaying(false));
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      // Le son repart du début pour que le visiteur voie toute la vidéo.
      if (video.currentTime > 2) video.currentTime = 0;
      video.play().catch(() => undefined);
    }
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  }

  return (
    <div className="relative mx-auto w-full max-w-[19rem] animate-fade-up [animation-delay:150ms] sm:max-w-sm lg:max-w-[25rem]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-violet-brand/35 blur-3xl" aria-hidden />

      <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-navy-900">
          <video
            ref={videoRef}
            className="size-full object-cover"
            src="/videos/ramez-realisations.mp4"
            poster="/videos/ramez-realisations-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Vidéo de présentation des sites réalisés par RAMEZ IT Solutions en Tunisie, en France et au Qatar"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          />

          {/* Bouton lecture / pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
            className="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-navy-950/60 text-white backdrop-blur transition-colors hover:bg-navy-950/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {playing ? <Pause className="size-4.5" aria-hidden /> : <Play className="size-4.5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Bouton son, bien visible sous la vidéo */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className={cn(
          "absolute -bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          muted ? "bg-white text-navy-900" : "bg-brand-gradient text-white",
        )}
      >
        {muted ? (
          <>
            <span className="relative flex size-6 items-center justify-center rounded-full bg-brand-gradient text-white">
              <span className="absolute inset-0 animate-ping rounded-full bg-violet-brand/50" aria-hidden />
              <VolumeX className="relative size-3.5" aria-hidden />
            </span>
            Activer le son
          </>
        ) : (
          <>
            <Volume2 className="size-5" aria-hidden />
            Couper le son
          </>
        )}
      </button>
    </div>
  );
}

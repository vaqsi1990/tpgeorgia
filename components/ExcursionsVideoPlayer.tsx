"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEOS = ["/excursions-video.mp4", "/IMG_8984.MP4"] as const;
const FADE_MS = 500;

type ExcursionsVideoPlayerProps = {
  ariaLabel: string;
  className?: string;
};

function isVideoFullscreen(video: HTMLVideoElement) {
  return (
    document.fullscreenElement === video ||
    (document as Document & { webkitFullscreenElement?: Element })
      .webkitFullscreenElement === video
  );
}

function applyNativeFullscreenLayout(video: HTMLVideoElement) {
  const { videoWidth, videoHeight } = video;
  if (!videoWidth || !videoHeight) return;

  video.style.width = `${videoWidth}px`;
  video.style.height = `${videoHeight}px`;
  video.style.maxWidth = "none";
  video.style.maxHeight = "none";
  video.style.objectFit = "contain";
  video.style.backgroundColor = "#000";
}

function clearNativeFullscreenLayout(video: HTMLVideoElement) {
  video.style.width = "";
  video.style.height = "";
  video.style.maxWidth = "";
  video.style.maxHeight = "";
  video.style.objectFit = "";
  video.style.backgroundColor = "";
}

export default function ExcursionsVideoPlayer({
  ariaLabel,
  className,
}: ExcursionsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const switchingRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const playCurrent = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
    } catch {
      // Autoplay can be blocked until user interaction.
    }
  }, []);

  const goToNextVideo = useCallback(() => {
    if (switchingRef.current) return;
    switchingRef.current = true;
    setVisible(false);
  }, []);

  useEffect(() => {
    if (visible) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % VIDEOS.length);
    }, FADE_MS);

    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      void playCurrent().then(() => {
        requestAnimationFrame(() => {
          setVisible(true);
          switchingRef.current = false;
        });
      });
    };

    const handleError = () => {
      switchingRef.current = false;
      setVisible(true);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
      return;
    }

    video.addEventListener("loadeddata", startPlayback, { once: true });
    video.addEventListener("error", handleError, { once: true });

    return () => {
      video.removeEventListener("loadeddata", startPlayback);
      video.removeEventListener("error", handleError);
    };
  }, [index, playCurrent]);

  useEffect(() => {
    const syncFullscreenLayout = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isVideoFullscreen(video)) {
        applyNativeFullscreenLayout(video);
      } else {
        clearNativeFullscreenLayout(video);
      }
    };

    document.addEventListener("fullscreenchange", syncFullscreenLayout);
    document.addEventListener("webkitfullscreenchange", syncFullscreenLayout);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenLayout);
      document.removeEventListener(
        "webkitfullscreenchange",
        syncFullscreenLayout,
      );
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={VIDEOS[index]}
        muted
        playsInline
        controls
        preload="metadata"
        aria-label={ariaLabel}
        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-in-out ${
          visible ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
        } ${className ?? ""}`}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (isVideoFullscreen(video)) {
            applyNativeFullscreenLayout(video);
          }
        }}
        onEnded={goToNextVideo}
      />
    </div>
  );
}

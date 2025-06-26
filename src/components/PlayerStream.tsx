import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { cn } from "@/lib/utils";

interface HLSPlayerProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
  onLoadedMetadata?: () => void;
}

const PlayerStream = ({
  src,
  autoPlay = true,
  muted = true,
  className = "",
  onLoadedMetadata,
}: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let player: Plyr | null = null;
    let isMounted = true;

    const initializePlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!isMounted) return;

          player = new Plyr(video, {
            controls: [
              "play-large",
              "play",
              "progress",
              "current-time",
              "mute",
              "volume",
              "settings",
              "fullscreen",
            ],
            settings: ["quality", "speed"],
            keyboard: { global: true },
            ratio: "16:9",
          });
          playerRef.current = player;

          if (autoPlay) {
            video.play().catch(() => { });
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        player = new Plyr(video, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
          settings: ["quality", "speed"],
          keyboard: { global: true },
          ratio: "16:9",
        });
        playerRef.current = player;

        if (autoPlay) {
          video.play().catch(() => { });
        }
      }
    };

    initializePlayer();

    return () => {
      isMounted = false;
      if (player) {
        player.destroy();
        playerRef.current = null;
      }
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoPlay]);

  return (
    <div
      className={cn(
        "overflow-hidden relative rounded-2xl shadow-lg bg-black w-[80%]",
        className
      )}
    >
      <video
        ref={videoRef}
        className="w-full h-auto aspect-video"
        muted={muted}
        playsInline
        onLoadedMetadata={onLoadedMetadata}
      />
    </div>
  );
};

export default PlayerStream;
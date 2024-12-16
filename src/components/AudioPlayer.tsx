import { Chapter } from "@/types/book";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  chapter: Chapter;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function AudioPlayer({ chapter, onNext, onPrevious }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0];
      setVolume(value[0]);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/80 border-t">
      <audio ref={audioRef} src={chapter.audioUrl} />
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium">{chapter.title}</h4>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                disabled={!onPrevious}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="h-12 w-12"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={!onNext}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={[volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              onValueChange={handleProgressChange}
              className="flex-1"
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
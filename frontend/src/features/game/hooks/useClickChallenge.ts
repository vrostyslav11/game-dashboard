import { useCallback, useEffect, useRef, useState } from 'react';

export type ChallengePhase = 'idle' | 'playing' | 'finished';

interface UseClickChallengeOptions {
  durationSeconds: number;
  onTimeUp: (clicks: number) => void;
}

export function useClickChallenge({
  durationSeconds,
  onTimeUp,
}: UseClickChallengeOptions) {
  const [phase, setPhase] = useState<ChallengePhase>('idle');
  const [clicks, setClicks] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const endTimeRef = useRef<number | null>(null);
  const clicksRef = useRef(0);
  const onTimeUpRef = useRef(onTimeUp);
  const timeUpFiredRef = useRef(false);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (phase === 'idle') {
      endTimeRef.current = null;
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing' || endTimeRef.current === null) {
      return;
    }

    const tick = () => {
      const remainingMs = endTimeRef.current! - Date.now();
      const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsLeft(remainingSec);

      if (remainingMs <= 0) {
        setPhase('finished');
        if (!timeUpFiredRef.current) {
          timeUpFiredRef.current = true;
          onTimeUpRef.current(clicksRef.current);
        }
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 100);
    return () => window.clearInterval(intervalId);
  }, [phase]);

  const start = useCallback(() => {
    timeUpFiredRef.current = false;
    clicksRef.current = 0;
    setClicks(0);
    setSecondsLeft(durationSeconds);
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setPhase('playing');
  }, [durationSeconds]);

  const registerClick = useCallback(() => {
    if (phase !== 'playing') return;
    setClicks((prev) => {
      const next = prev + 1;
      clicksRef.current = next;
      return next;
    });
  }, [phase]);

  const reset = useCallback(() => {
    timeUpFiredRef.current = false;
    endTimeRef.current = null;
    clicksRef.current = 0;
    setClicks(0);
    setSecondsLeft(durationSeconds);
    setPhase('idle');
  }, [durationSeconds]);

  const displaySecondsLeft = phase === 'idle' ? durationSeconds : secondsLeft;

  return {
    phase,
    clicks,
    secondsLeft: displaySecondsLeft,
    start,
    registerClick,
    reset,
    isPlaying: phase === 'playing',
  };
}

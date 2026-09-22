import React, { useRef, useState, useEffect, useCallback } from 'react';

interface VirtualJoystickProps {
  onMove: (dir: 'W' | 'A' | 'S' | 'D') => void;
  speedMultiplier?: number;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onMove,
  speedMultiplier = 1.0
}) => {
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [knobOffset, setKnobOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeVector, setActiveVector] = useState<{ x: number; y: number } | null>(null);
  const touchIdRef = useRef<number | null>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const RADIUS = 44; // max distance knob can travel from center

  // Continuous movement tick while holding joystick off-center
  useEffect(() => {
    if (!activeVector) {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
        moveIntervalRef.current = null;
      }
      return;
    }

    // Gentler tick interval matching slower walking speed
    const intervalMs = Math.max(140, Math.floor(220 / Math.max(speedMultiplier, 1.0)));

    const tick = () => {
      const { x, y } = activeVector;
      const absX = Math.abs(x);
      const absY = Math.abs(y);

      // Require minimum displacement threshold to prevent accidental drift
      if (absX < 0.22 && absY < 0.22) return;

      if (absY > absX) {
        if (y < 0) onMove('W');
        else onMove('S');
      } else {
        if (x < 0) onMove('A');
        else onMove('D');
      }
    };

    // Initial immediate step
    tick();

    moveIntervalRef.current = setInterval(tick, intervalMs);

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
        moveIntervalRef.current = null;
      }
    };
  }, [activeVector, onMove, speedMultiplier]);

  const updateKnobFromCoords = useCallback((clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance <= RADIUS) {
      setKnobOffset({ x: dx, y: dy });
      setActiveVector({ x: dx / RADIUS, y: dy / RADIUS });
    } else {
      const angle = Math.atan2(dy, dx);
      const clampedX = Math.cos(angle) * RADIUS;
      const clampedY = Math.sin(angle) * RADIUS;
      setKnobOffset({ x: clampedX, y: clampedY });
      setActiveVector({ x: clampedX / RADIUS, y: clampedY / RADIUS });
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchIdRef.current !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    updateKnobFromCoords(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        updateKnobFromCoords(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null;
        setKnobOffset({ x: 0, y: 0 });
        setActiveVector(null);
        break;
      }
    }
  };

  // Determine current active cardinal arrow to highlight
  const getActiveDirection = () => {
    if (!activeVector) return null;
    const { x, y } = activeVector;
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    if (absX < 0.25 && absY < 0.25) return null;
    if (absY > absX) {
      return y < 0 ? 'N' : 'S';
    }
    return x < 0 ? 'W' : 'E';
  };

  const activeDir = getActiveDirection();

  return (
    <div className="flex flex-col items-center select-none touch-none">
      <div className="text-[10px] font-black uppercase tracking-wider text-slate-300 mb-1 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow">
        Virtual Joystick
      </div>

      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative w-32 h-32 rounded-full bg-slate-950/85 backdrop-blur-md border-2 border-slate-700/90 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Crosshair guide lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-full h-[1px] bg-slate-400" />
          <div className="absolute h-full w-[1px] bg-slate-400" />
        </div>

        {/* Direction indicators */}
        <span
          className={`absolute top-2 text-[10px] font-black tracking-widest transition-colors ${
            activeDir === 'N' ? 'text-amber-400 font-bold scale-125' : 'text-slate-500'
          }`}
        >
          ▲ W
        </span>
        <span
          className={`absolute bottom-2 text-[10px] font-black tracking-widest transition-colors ${
            activeDir === 'S' ? 'text-amber-400 font-bold scale-125' : 'text-slate-500'
          }`}
        >
          ▼ S
        </span>
        <span
          className={`absolute left-2 text-[10px] font-black tracking-widest transition-colors ${
            activeDir === 'W' ? 'text-amber-400 font-bold scale-125' : 'text-slate-500'
          }`}
        >
          ◀ A
        </span>
        <span
          className={`absolute right-2 text-[10px] font-black tracking-widest transition-colors ${
            activeDir === 'E' ? 'text-amber-400 font-bold scale-125' : 'text-slate-500'
          }`}
        >
          D ▶
        </span>

        {/* Inner concentric track ring */}
        <div className="w-16 h-16 rounded-full border border-dashed border-slate-700/70 pointer-events-none" />

        {/* Movable Joystick Knob */}
        <div
          className={`absolute w-12 h-12 rounded-full shadow-lg border-2 flex items-center justify-center transition-transform duration-75 pointer-events-none ${
            activeVector
              ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-white text-slate-950 scale-105 shadow-amber-500/40'
              : 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-500 text-slate-300'
          }`}
          style={{
            transform: `translate3d(${knobOffset.x}px, ${knobOffset.y}px, 0)`
          }}
        >
          <div className="w-4 h-4 rounded-full bg-white/40 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

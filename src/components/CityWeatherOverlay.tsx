import React, { useEffect, useRef, useState, useMemo } from 'react';
import { WeatherCondition, WeatherInfo } from '../types';
import { Sun, CloudRain, Snowflake, Clock, Sparkles, ChevronRight, Wind } from 'lucide-react';
import { soundEffects } from '../utils/audio';

const CYCLE_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

export const WEATHER_DATA: Record<WeatherCondition, WeatherInfo> = {
  sunny: {
    condition: 'sunny',
    label: 'Sunny Skies',
    icon: '☀️',
    tempCelsius: 22,
    description: 'Clear golden sunlight warming the city streets and avenues.',
    ambianceEffect: 'Golden sunbeams, radiant atmosphere & high visibility'
  },
  rainy: {
    condition: 'rainy',
    label: 'Rainstorm',
    icon: '🌧️',
    tempCelsius: 13,
    description: 'Overcast skies with steady raindrops glistening on asphalt roads.',
    ambianceEffect: 'Diagonal rain streaks, puddle splashes & cool slate-blue hue'
  },
  snowy: {
    condition: 'snowy',
    label: 'Winter Snowfall',
    icon: '❄️',
    tempCelsius: -2,
    description: 'Gentle snowflakes fluttering down across monuments and parks.',
    ambianceEffect: 'Floating snow particles, crisp ice-blue tint & frosty vignette'
  }
};

const WEATHER_ORDER: WeatherCondition[] = ['sunny', 'rainy', 'snowy'];

interface CityWeatherOverlayProps {
  manualWeather?: WeatherCondition | null;
  onWeatherChange?: (condition: WeatherCondition) => void;
  className?: string;
}

export const CityWeatherOverlay: React.FC<CityWeatherOverlayProps> = ({
  manualWeather = null,
  onWeatherChange,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-calculated weather based on 15-minute global cycle
  const [autoWeather, setAutoWeather] = useState<WeatherCondition>(() => {
    const cycleIndex = Math.floor(Date.now() / CYCLE_MS) % 3;
    return WEATHER_ORDER[cycleIndex];
  });

  const [msUntilNextShift, setMsUntilNextShift] = useState<number>(() => {
    return CYCLE_MS - (Date.now() % CYCLE_MS);
  });

  // Effective weather condition
  const activeWeather = manualWeather || autoWeather;

  // Track 15-minute interval cycle and countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const cycleIndex = Math.floor(now / CYCLE_MS) % 3;
      const nextWeather = WEATHER_ORDER[cycleIndex];
      const remaining = CYCLE_MS - (now % CYCLE_MS);

      setMsUntilNextShift(remaining);

      if (nextWeather !== autoWeather) {
        setAutoWeather(nextWeather);
        if (!manualWeather && onWeatherChange) {
          onWeatherChange(nextWeather);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [autoWeather, manualWeather, onWeatherChange]);

  // Canvas particle animation (Rain or Snow or Sunlight motes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definitions based on weather
    const rainParticles: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }> = [];

    const snowParticles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      angle: number;
      opacity: number;
    }> = [];

    const sunMotes: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    if (activeWeather === 'rainy') {
      const count = Math.min(140, Math.floor(width / 10));
      for (let i = 0; i < count; i++) {
        rainParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: 14 + Math.random() * 18,
          speed: 15 + Math.random() * 12,
          opacity: 0.35 + Math.random() * 0.45
        });
      }
    } else if (activeWeather === 'snowy') {
      const count = Math.min(100, Math.floor(width / 14));
      for (let i = 0; i < count; i++) {
        snowParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 2.8,
          speedY: 0.8 + Math.random() * 1.6,
          speedX: (Math.random() - 0.5) * 0.6,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.45 + Math.random() * 0.5
        });
      }
    } else if (activeWeather === 'sunny') {
      // Warm floating light particles
      const count = 35;
      for (let i = 0; i < count; i++) {
        sunMotes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3,
          speedY: -0.3 - Math.random() * 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: 0.2 + Math.random() * 0.45
        });
      }
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (activeWeather === 'rainy') {
        // Draw diagonal raindrops
        ctx.lineWidth = 1.6;
        rainParticles.forEach(p => {
          ctx.strokeStyle = `rgba(186, 230, 253, ${p.opacity})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 3, p.y + p.length);
          ctx.stroke();

          // Update position
          p.x -= 1.5;
          p.y += p.speed;

          // Splash ripple occasionally at bottom
          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * (width + 50);
          }
        });
      } else if (activeWeather === 'snowy') {
        // Draw soft falling snow circles with sway
        snowParticles.forEach(p => {
          p.angle += 0.02;
          p.x += Math.sin(p.angle) * 0.8 + p.speedX;
          p.y += p.speedY;

          ctx.fillStyle = `rgba(240, 249, 255, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        });
      } else if (activeWeather === 'sunny') {
        // Draw golden sun sparkles
        sunMotes.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
          gradient.addColorStop(0, `rgba(253, 224, 71, ${p.opacity})`);
          gradient.addColorStop(1, `rgba(251, 191, 36, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
          ctx.fill();

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeWeather]);

  return (
    <div className={`pointer-events-none absolute inset-0 z-[350] overflow-hidden transition-all duration-1000 ${className}`}>
      
      {/* 1. Ambiance Lighting and Color Grading Tint on Map */}
      {activeWeather === 'sunny' && (
        <>
          {/* Radiant Sun Lens Flare in top-right */}
          <div className="absolute top-0 right-0 w-[55vw] h-[55vh] max-w-[600px] max-h-[600px] bg-gradient-to-br from-amber-400/20 via-yellow-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          {/* Subtle warm golden ambiance over map */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-yellow-500/10 mix-blend-screen pointer-events-none" />
        </>
      )}

      {activeWeather === 'rainy' && (
        <>
          {/* Overcast, cool blue-slate gloomy atmosphere */}
          <div className="absolute inset-0 bg-slate-950/25 backdrop-saturate-[0.85] pointer-events-none" />
          {/* Dark storm vignette around edges */}
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(15,23,42,0.6)] pointer-events-none" />
        </>
      )}

      {activeWeather === 'snowy' && (
        <>
          {/* Frosty cool ice-blue tint */}
          <div className="absolute inset-0 bg-sky-950/15 backdrop-saturate-[0.8] backdrop-contrast-[1.05] pointer-events-none" />
          {/* Soft winter frost vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(186,230,253,0.35)] pointer-events-none" />
        </>
      )}

      {/* 2. Interactive Canvas for Particles (Rain, Snow, Motes) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

// Weather Badge with 15-Minute Countdown & Quick Toggle for Header
interface CityWeatherWidgetProps {
  currentWeather: WeatherCondition;
  onSelectWeather: (weather: WeatherCondition | null) => void;
  isManualOverride: boolean;
}

export const CityWeatherWidget: React.FC<CityWeatherWidgetProps> = ({
  currentWeather,
  onSelectWeather,
  isManualOverride
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [countdownStr, setCountdownStr] = useState('15:00');

  // Format mm:ss remaining in 15-minute slot
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const msRemaining = CYCLE_MS - (now % CYCLE_MS);
      const m = Math.floor(msRemaining / 60000);
      const s = Math.floor((msRemaining % 60000) / 1000);
      setCountdownStr(`${m}:${s < 10 ? '0' : ''}${s}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const info = WEATHER_DATA[currentWeather];

  const handleToggle = () => {
    soundEffects.playSelect();
    setShowDropdown(prev => !prev);
  };

  const handlePickCondition = (cond: WeatherCondition) => {
    soundEffects.playSelect();
    onSelectWeather(cond);
    setShowDropdown(false);
  };

  const handleResetToAuto = () => {
    soundEffects.playSelect();
    onSelectWeather(null);
    setShowDropdown(false);
  };

  return (
    <div className="relative pointer-events-auto">
      {/* Weather Header Badge */}
      <button
        id="city-weather-widget-btn"
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-black shadow-lg transition active:scale-95 cursor-pointer shrink-0 ${
          currentWeather === 'sunny'
            ? 'bg-gradient-to-r from-amber-500/90 to-yellow-600/90 border-amber-400 text-white shadow-amber-500/25'
            : currentWeather === 'rainy'
            ? 'bg-gradient-to-r from-blue-700/90 to-slate-800/90 border-sky-400 text-sky-100 shadow-blue-500/25'
            : 'bg-gradient-to-r from-cyan-600/90 to-blue-800/90 border-cyan-300 text-cyan-50 shadow-cyan-500/25'
        }`}
        title={`Weather: ${info.label} (${info.tempCelsius}°C). Cycles every 15 min. Click to change.`}
      >
        <span className="text-base filter drop-shadow">{info.icon}</span>
        <span className="font-extrabold hidden sm:inline">{info.label}</span>
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-black/30 border border-white/20">
          {info.tempCelsius}°C
        </span>
        <span className="text-[9px] font-mono text-white/80 hidden md:inline">
          ⏱️ {countdownStr}
        </span>
      </button>

      {/* Popover Dropdown for Details & Instant Weather Toggling */}
      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl shadow-2xl p-3.5 text-white z-[600] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-300">City Weather System</span>
              <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.2 rounded">
                15-Min Cycle
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Next: {countdownStr}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 mb-3 leading-snug">
            Ambiance automatically alternates between <strong>Sunny</strong>, <strong>Rainy</strong>, and <strong>Snowy</strong> every 15 minutes. Select any condition below to test immediately:
          </p>

          <div className="space-y-1.5 mb-3">
            {WEATHER_ORDER.map((cond) => {
              const item = WEATHER_DATA[cond];
              const isSelected = currentWeather === cond;
              return (
                <button
                  key={cond}
                  onClick={() => handlePickCondition(cond)}
                  className={`w-full p-2 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400/50 shadow'
                      : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{item.label}</span>
                        <span className="text-[10px] text-amber-300">{item.tempCelsius}°C</span>
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight line-clamp-1">
                        {item.ambianceEffect}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[9px] font-bold text-sky-400 bg-sky-950/70 px-1.5 py-0.5 rounded border border-sky-600/50 shrink-0">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Reset to Auto 15-Minute Cycle */}
          {isManualOverride && (
            <button
              onClick={handleResetToAuto}
              className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-sky-300 text-[11px] font-bold border border-slate-700 transition cursor-pointer text-center"
            >
              🔄 Resume Automatic 15-Min Rotation
            </button>
          )}
        </div>
      )}
    </div>
  );
};

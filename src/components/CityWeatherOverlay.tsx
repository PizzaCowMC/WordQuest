import React, { useEffect, useRef, useState } from 'react';
import { WeatherCondition, WeatherInfo } from '../types';
import { 
  WEATHER_CYCLE_MS, 
  WEATHER_DATA, 
  getRandomWeatherForTimestamp, 
  formatTemperature 
} from '../utils/weatherUtils';
import { soundEffects } from '../utils/audio';
import { Smartphone, Info, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

interface CityWeatherOverlayProps {
  weather: WeatherCondition;
  className?: string;
}

export const CityWeatherOverlay: React.FC<CityWeatherOverlayProps> = ({
  weather,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightningFlash, setLightningFlash] = useState<boolean>(false);

  // Occasional subtle lightning flash for thunderstorm
  useEffect(() => {
    if (weather !== 'thunderstorm') {
      setLightningFlash(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const scheduleFlash = () => {
      const delay = 6000 + Math.random() * 9000;
      timeoutId = setTimeout(() => {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 120);
        scheduleFlash();
      }, delay);
    };

    scheduleFlash();
    return () => clearTimeout(timeoutId);
  }, [weather]);

  // Canvas particle animation (Safe 2D canvas, no backdrop filters)
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

    const fogPatches: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      opacity: number;
    }> = [];

    const windLeaves: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
    }> = [];

    if (weather === 'rainy' || weather === 'thunderstorm') {
      const count = weather === 'thunderstorm' 
        ? Math.min(180, Math.floor(width / 7)) 
        : Math.min(120, Math.floor(width / 10));

      for (let i = 0; i < count; i++) {
        rainParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: weather === 'thunderstorm' ? 18 + Math.random() * 22 : 12 + Math.random() * 16,
          speed: weather === 'thunderstorm' ? 18 + Math.random() * 14 : 14 + Math.random() * 10,
          opacity: 0.3 + Math.random() * 0.45
        });
      }
    } else if (weather === 'snowy') {
      const count = Math.min(100, Math.floor(width / 14));
      for (let i = 0; i < count; i++) {
        snowParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 2.8,
          speedY: 0.8 + Math.random() * 1.5,
          speedX: (Math.random() - 0.5) * 0.7,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.45 + Math.random() * 0.45
        });
      }
    } else if (weather === 'sunny') {
      const count = 30;
      for (let i = 0; i < count; i++) {
        sunMotes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3,
          speedY: -0.2 - Math.random() * 0.4,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: 0.2 + Math.random() * 0.4
        });
      }
    } else if (weather === 'foggy') {
      const count = 18;
      for (let i = 0; i < count; i++) {
        fogPatches.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 120 + Math.random() * 180,
          speedX: 0.2 + Math.random() * 0.4,
          opacity: 0.08 + Math.random() * 0.12
        });
      }
    } else if (weather === 'windy') {
      const count = 35;
      const leafColors = ['#eab308', '#f97316', '#84cc16', '#b45309'];
      for (let i = 0; i < count; i++) {
        windLeaves.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 4 + Math.random() * 6,
          speedX: 5 + Math.random() * 7,
          speedY: 1 + Math.random() * 3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          color: leafColors[Math.floor(Math.random() * leafColors.length)]
        });
      }
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (weather === 'rainy' || weather === 'thunderstorm') {
        ctx.lineWidth = weather === 'thunderstorm' ? 2.0 : 1.5;
        rainParticles.forEach(p => {
          ctx.strokeStyle = weather === 'thunderstorm' 
            ? `rgba(147, 197, 253, ${p.opacity})` 
            : `rgba(186, 230, 253, ${p.opacity})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 3.5, p.y + p.length);
          ctx.stroke();

          p.x -= 2.0;
          p.y += p.speed;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * (width + 60);
          }
        });
      } else if (weather === 'snowy') {
        snowParticles.forEach(p => {
          p.angle += 0.02;
          p.x += Math.sin(p.angle) * 0.9 + p.speedX;
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
      } else if (weather === 'sunny') {
        sunMotes.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
          gradient.addColorStop(0, `rgba(253, 224, 71, ${p.opacity})`);
          gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
          ctx.fill();

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        });
      } else if (weather === 'foggy') {
        fogPatches.forEach(p => {
          p.x += p.speedX;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          gradient.addColorStop(0, `rgba(226, 232, 240, ${p.opacity})`);
          gradient.addColorStop(1, 'rgba(226, 232, 240, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          if (p.x - p.radius > width) {
            p.x = -p.radius;
            p.y = Math.random() * height;
          }
        });
      } else if (weather === 'windy') {
        windLeaves.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (p.x > width + 20) {
            p.x = -20;
            p.y = Math.random() * height;
          }
          if (p.y > height + 20) {
            p.y = -20;
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
  }, [weather]);

  return (
    <div className={`pointer-events-none absolute inset-0 z-[350] overflow-hidden ${className}`}>
      
      {/* 1. SAFE Ambient Lighting Tints (NO backdrop-filter, never breaks Leaflet) */}
      {weather === 'sunny' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
        </>
      )}

      {weather === 'cloudy' && (
        <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
      )}

      {weather === 'rainy' && (
        <>
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(15,23,42,0.45)] pointer-events-none" />
        </>
      )}

      {weather === 'thunderstorm' && (
        <>
          <div className="absolute inset-0 bg-slate-950/35 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(2,6,23,0.7)] pointer-events-none" />
          {/* Lightning Flash Effect */}
          {lightningFlash && (
            <div className="absolute inset-0 bg-sky-100/40 pointer-events-none transition-opacity duration-75" />
          )}
        </>
      )}

      {weather === 'snowy' && (
        <>
          <div className="absolute inset-0 bg-cyan-950/10 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(186,230,253,0.25)] pointer-events-none" />
        </>
      )}

      {weather === 'foggy' && (
        <>
          <div className="absolute inset-0 bg-slate-800/25 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(203,213,225,0.2)] pointer-events-none" />
        </>
      )}

      {weather === 'windy' && (
        <div className="absolute inset-0 bg-emerald-950/5 pointer-events-none" />
      )}

      {/* 2. Particle Canvas (Rain, Snow, Motes, Fog, Leaves) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

// Weather Badge for Header (Purely informational with countdown, NO manual changing)
interface CityWeatherWidgetProps {
  currentWeather: WeatherCondition;
  tempUnit?: 'C' | 'F';
  onOpenPhoneWeather?: () => void;
}

export const CityWeatherWidget: React.FC<CityWeatherWidgetProps> = ({
  currentWeather,
  tempUnit = 'C',
  onOpenPhoneWeather
}) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [countdownStr, setCountdownStr] = useState<string>('15:00');

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const msRemaining = WEATHER_CYCLE_MS - (now % WEATHER_CYCLE_MS);
      const m = Math.floor(msRemaining / 60000);
      const s = Math.floor((msRemaining % 60000) / 1000);
      setCountdownStr(`${m}:${s < 10 ? '0' : ''}${s}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const info = WEATHER_DATA[currentWeather] || WEATHER_DATA.sunny;

  return (
    <div className="relative pointer-events-auto">
      {/* Weather Header Badge (Display only, no manual override) */}
      <button
        id="city-weather-widget-btn"
        onClick={() => {
          soundEffects.playSelect();
          setShowInfo(prev => !prev);
        }}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-black shadow-lg transition active:scale-95 cursor-pointer shrink-0 ${
          currentWeather === 'sunny'
            ? 'bg-gradient-to-r from-amber-500/90 to-yellow-600/90 border-amber-400 text-white shadow-amber-500/25'
            : currentWeather === 'rainy' || currentWeather === 'thunderstorm'
            ? 'bg-gradient-to-r from-blue-700/90 to-slate-800/90 border-sky-400 text-sky-100 shadow-blue-500/25'
            : currentWeather === 'snowy'
            ? 'bg-gradient-to-r from-cyan-600/90 to-blue-800/90 border-cyan-300 text-cyan-50 shadow-cyan-500/25'
            : currentWeather === 'foggy'
            ? 'bg-gradient-to-r from-slate-600/90 to-slate-800/90 border-slate-400 text-slate-100 shadow-slate-500/25'
            : 'bg-gradient-to-r from-emerald-600/90 to-teal-800/90 border-emerald-400 text-emerald-50 shadow-emerald-500/25'
        }`}
        title={`Weather: ${info.label} (${formatTemperature(info.tempCelsius, tempUnit)}). Changes randomly every 15 min.`}
      >
        <span className="text-base filter drop-shadow">{info.icon}</span>
        <span className="font-extrabold hidden sm:inline">{info.label}</span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/30 border border-white/20">
          {formatTemperature(info.tempCelsius, tempUnit)}
        </span>
        <span className="text-[9px] font-mono text-white/80 hidden md:inline">
          ⏱️ {countdownStr}
        </span>
      </button>

      {/* Info Card Popover (Random Nature explained + Phone Weather App shortcut) */}
      {showInfo && (
        <div className="absolute top-full mt-2 left-0 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl shadow-2xl p-4 text-white z-[600] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-200">City Microclimate</span>
              <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                Random
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Next shift in: {countdownStr}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 mb-3">
            <span className="text-3xl">{info.icon}</span>
            <div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>{info.label}</span>
                <span className="text-xs text-amber-300 font-mono">
                  {formatTemperature(info.tempCelsius, tempUnit)}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 leading-tight mt-0.5">
                {info.description}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 mb-3">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/50 border border-slate-700/60">
              <Wind className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Wind: {info.windSpeedKmh} km/h</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/50 border border-slate-700/60">
              <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Humidity: {info.humidity}%</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 mb-3 italic">
            * The city weather changes randomly every 15 minutes. Check your Smartphone for full 5-day forecasts!
          </p>

          {onOpenPhoneWeather && (
            <button
              onClick={() => {
                soundEffects.playSelect();
                setShowInfo(false);
                onOpenPhoneWeather();
              }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5 text-purple-200" />
              <span>Open Phone Weather App</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Settings, Volume2, VolumeX, Map, Check, X, ShieldAlert, Sparkles, Sliders } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface SettingsModalProps {
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  showMiniMap,
  onToggleMiniMap,
  isMuted,
  onToggleMute,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base font-black text-white font-['Fredoka',sans-serif]">Game Settings</h2>
              <p className="text-[11px] text-slate-400">Customize display, HUD & audio</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 space-y-4">
          
          {/* 1. Mini-Map Radar Setting */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold text-white">Real-Time Mini-Map</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300 font-mono">
                  HUD
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Display district radar overlay with player GPS pointer, boundary box, and live monster dots.
              </p>
              <div className="text-[10px] text-slate-500 italic">
                (Default: OFF)
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              id="settings-toggle-minimap-switch"
              onClick={() => {
                soundEffects.playSelect();
                onToggleMiniMap();
              }}
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showMiniMap ? 'bg-sky-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={showMiniMap}
              title={showMiniMap ? 'Disable Mini-Map' : 'Enable Mini-Map'}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  showMiniMap ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2. Sound Effects Setting */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-400" />
                )}
                <span className="text-sm font-bold text-white">Sound Effects</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Play retro 8-bit chimes for correct answers, car horns, arpeggios, and level ups.
              </p>
            </div>

            <button
              onClick={() => {
                soundEffects.playSelect();
                onToggleMute();
              }}
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                !isMuted ? 'bg-amber-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={!isMuted}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  !isMuted ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3. Controls Info Tip */}
          <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-800/50 flex items-start gap-3 text-xs text-sky-200">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Tip:</strong> You can steer with <strong>WASD</strong> or touch the <strong>Virtual Joystick</strong> on mobile phones!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

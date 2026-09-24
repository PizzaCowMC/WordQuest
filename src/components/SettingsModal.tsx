import React from 'react';
import { Settings, Volume2, VolumeX, Map, Check, X, ShieldAlert, Sparkles, Sliders, Save, RotateCcw, ArrowRight, Thermometer } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface SettingsModalProps {
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  tempUnit?: 'C' | 'F';
  onToggleTempUnit?: (unit: 'C' | 'F') => void;
  onOpenSaveSystem?: () => void;
  onResetClick?: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  showMiniMap,
  onToggleMiniMap,
  isMuted,
  onToggleMute,
  tempUnit = 'C',
  onToggleTempUnit,
  onOpenSaveSystem,
  onResetClick,
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
              <p className="text-[11px] text-slate-400">Customize display, audio, save progress & reset</p>
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
        <div className="p-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Mini-Map Radar Setting */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold text-white">Real-Time Mini-Map</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300 font-mono">
                  HUD
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Display district radar overlay with player GPS pointer and live monster locations.
              </p>
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
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
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
                Play retro 8-bit chimes for correct answers, car horns, fanfares, and audio cues.
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

          {/* 3. Temperature Unit Setting (Celsius °C vs Fahrenheit °F) */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Temperature Unit</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                  {tempUnit === 'F' ? 'Fahrenheit' : 'Celsius'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose temperature unit across the city weather widget and Phone Weather app.
              </p>
            </div>

            {/* Segmented Control °C / °F */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-750 shrink-0">
              <button
                id="settings-temp-celsius-btn"
                onClick={() => {
                  soundEffects.playSelect();
                  onToggleTempUnit?.('C');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                  tempUnit === 'C'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Use Celsius (°C)"
              >
                °C
              </button>
              <button
                id="settings-temp-fahrenheit-btn"
                onClick={() => {
                  soundEffects.playSelect();
                  onToggleTempUnit?.('F');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                  tempUnit === 'F'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Use Fahrenheit (°F)"
              >
                °F
              </button>
            </div>
          </div>

          {/* 4. Save Game & Cloud Slots */}
          {onOpenSaveSystem && (
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">Save Adventure</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                    3 Slots
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Manage save slots, export backup files, or load saved adventures.
                </p>
              </div>

              <button
                id="settings-open-save-btn"
                onClick={() => {
                  soundEffects.playSelect();
                  onClose();
                  onOpenSaveSystem();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition cursor-pointer shrink-0 active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          )}

          {/* 4. Reset Adventure */}
          {onResetClick && (
            <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-bold text-rose-200">Reset Adventure</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-mono border border-rose-500/30">
                    Restart
                  </span>
                </div>
                <p className="text-xs text-rose-300/70 leading-relaxed">
                  Clear active game progress and redo character setup and initial city.
                </p>
              </div>

              <button
                id="settings-reset-adventure-btn"
                onClick={() => {
                  soundEffects.playSelect();
                  onClose();
                  onResetClick();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 border border-rose-500/50 hover:border-rose-400 text-rose-200 hover:text-white text-xs font-bold shadow transition cursor-pointer shrink-0 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          )}

          {/* 5. Controls Info Tip */}
          <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-800/50 flex items-start gap-2.5 text-xs text-sky-200">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Tip:</strong> You can walk with <strong>WASD</strong> or touch the <strong>Virtual Joystick</strong> on mobile!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">WordQuest</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[11px] font-bold border border-sky-500/30">
              v1.9.5
            </span>
          </div>

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

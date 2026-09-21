import React from 'react';
import { soundEffects } from '../utils/audio';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 text-white text-center animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center text-2xl mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-extrabold text-white font-['Fredoka',sans-serif] mb-2">
          Reset Your English Adventure?
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          This will reset your current progress, letting you return to the trainer creation menu to choose your name, appearance, and starting companion anew.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onConfirm();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yes, Reset Adventure</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              onCancel();
            }}
            className="py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
          >
            Keep Playing
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { StudentProfile, CityData } from '../types';
import { soundEffects } from '../utils/audio';
import { 
  X, 
  Save, 
  Download, 
  Upload, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Database,
  MapPin,
  Sparkles,
  RefreshCw,
  Trash2
} from 'lucide-react';

interface SaveSystemModalProps {
  student: StudentProfile;
  currentCity: CityData;
  cityIndex: number;
  totalCities: number;
  onLoadProfile: (profile: StudentProfile, cityIndex: number) => void;
  onClose: () => void;
}

interface SaveSlot {
  id: string;
  name: string;
  timestamp: number;
  cityIndex: number;
  cityName: string;
  level: number;
  coins: number;
  monstersDefeated: number;
  profile: StudentProfile;
}

const STORAGE_KEY = 'wordquest_student_profile';
const SLOTS_KEY = 'wordquest_save_slots';

export const SaveSystemModal: React.FC<SaveSystemModalProps> = ({
  student,
  currentCity,
  cityIndex,
  totalCities,
  onLoadProfile,
  onClose
}) => {
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [slots, setSlots] = useState<SaveSlot[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string>('Just now');

  // Load existing save slots from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SLOTS_KEY);
      if (stored) {
        setSlots(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load save slots:', e);
    }
  }, []);

  // Quick Manual Save to primary active slot
  const handleQuickSave = () => {
    try {
      soundEffects.playSelect();
      const updatedProfile = {
        ...student,
        currentCityIndex: cityIndex,
        lastSavedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      setSaveStatus('Game saved successfully to browser storage! 💾');
      setLastAutoSaveTime(new Date().toLocaleTimeString());
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus('Failed to save to storage.');
    }
  };

  // Save into a named slot (Slot 1, 2, 3)
  const handleSaveToSlot = (slotIndex: number) => {
    try {
      soundEffects.playSelect();
      const slotId = `slot_${slotIndex}`;
      const newSlot: SaveSlot = {
        id: slotId,
        name: `Slot ${slotIndex + 1}: ${currentCity.name} (Lv. ${student.level})`,
        timestamp: Date.now(),
        cityIndex,
        cityName: currentCity.name,
        level: student.level,
        coins: student.coins,
        monstersDefeated: student.defeatedMonsterIds.length,
        profile: {
          ...student,
          currentCityIndex: cityIndex
        }
      };

      const existingIndex = slots.findIndex(s => s.id === slotId);
      let updatedSlots: SaveSlot[];
      if (existingIndex >= 0) {
        updatedSlots = [...slots];
        updatedSlots[existingIndex] = newSlot;
      } else {
        updatedSlots = [...slots, newSlot];
      }

      setSlots(updatedSlots);
      localStorage.setItem(SLOTS_KEY, JSON.stringify(updatedSlots));
      setSaveStatus(`Saved to Slot ${slotIndex + 1}! ✨`);
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus('Error saving slot.');
    }
  };

  // Load from a specific slot
  const handleLoadSlot = (slot: SaveSlot) => {
    soundEffects.playLevelUp();
    onLoadProfile(slot.profile, slot.cityIndex);
    setSaveStatus(`Loaded ${slot.name}! 🚀`);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  // Delete a slot
  const handleDeleteSlot = (slotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playSelect();
    const updated = slots.filter(s => s.id !== slotId);
    setSlots(updated);
    localStorage.setItem(SLOTS_KEY, JSON.stringify(updated));
  };

  // Export Save File (.json)
  const handleExportBackup = () => {
    soundEffects.playSelect();
    const saveData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      student: {
        ...student,
        currentCityIndex: cityIndex
      },
      cityIndex,
      cityName: currentCity.name,
      totalCities
    };

    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordquest-save-${student.name.toLowerCase().replace(/\s+/g, '-')}-${currentCity.name.toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSaveStatus('Save file downloaded! Keep it safe or share it across devices. 📁');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // Import Save File (.json)
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed.student || typeof parsed.student.name !== 'string') {
          throw new Error('Invalid save file format. Missing trainer profile.');
        }

        const loadedIndex = typeof parsed.cityIndex === 'number' 
          ? parsed.cityIndex 
          : typeof parsed.student.currentCityIndex === 'number' 
            ? parsed.student.currentCityIndex 
            : 0;

        soundEffects.playLevelUp();
        onLoadProfile(parsed.student, loadedIndex);
        setSaveStatus('Save file restored successfully! 🎉');
        setTimeout(() => {
          onClose();
        }, 1000);
      } catch (err: any) {
        setImportError(err.message || 'Corrupted or unreadable save file.');
        setTimeout(() => setImportError(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      className="fixed inset-0 z-[600] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xl shadow">
              💾
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-['Fredoka',sans-serif] flex items-center gap-2">
                Adventure Save Center
              </h2>
              <p className="text-[11px] text-slate-400">
                WordQuest Persistent Progress & Multi-Slot Manager
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Toast Notification */}
        {saveStatus && (
          <div className="px-4 py-2.5 bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{saveStatus}</span>
          </div>
        )}

        {importError && (
          <div className="px-4 py-2.5 bg-red-500/20 border-b border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{importError}</span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Current Adventure Snapshot */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl border border-white/40 flex items-center justify-center text-2xl shadow"
                style={{ backgroundColor: student.appearance?.outfitColor || '#2563EB' }}
              >
                {student.appearance?.avatar || '🧒'}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400">Active Adventurer</div>
                <div className="text-sm font-black text-white">{student.name} • Lv. {student.level}</div>
                <div className="text-[11px] text-sky-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{currentCity.name}, {currentCity.country} ({cityIndex + 1}/{totalCities})</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleQuickSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition cursor-pointer active:scale-95"
              title="Save game to browser storage right now"
            >
              <Save className="w-4 h-4" />
              <span>Quick Save</span>
            </button>
          </div>

          {/* Autosave Status Pill */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Auto-save is active: saves every victory & city move
            </span>
            <span className="font-mono text-slate-500">Last saved: {lastAutoSaveTime}</span>
          </div>

          {/* 3 Dedicated Save Slots */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
              <span>Manual Save Slots (1 to 3)</span>
              <span className="text-[10px] text-slate-500 lowercase">allows branching or backup points</span>
            </div>

            <div className="space-y-2.5">
              {[0, 1, 2].map(slotIdx => {
                const slot = slots.find(s => s.id === `slot_${slotIdx}`);

                return (
                  <div 
                    key={slotIdx}
                    className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between gap-3 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-xs font-black text-slate-300">
                        #{slotIdx + 1}
                      </div>

                      {slot ? (
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{slot.cityName}</span>
                            <span className="text-[10px] text-amber-300 font-mono">Lv. {slot.level}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({slot.coins} 🪙)</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{new Date(slot.timestamp).toLocaleDateString()} {new Date(slot.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="mx-1">•</span>
                            <span>{slot.monstersDefeated} monsters defeated</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs font-bold text-slate-500">Empty Slot</div>
                          <div className="text-[10px] text-slate-600">Save current city progress here</div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {slot && (
                        <>
                          <button
                            onClick={() => handleLoadSlot(slot)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition cursor-pointer"
                            title="Load this save file"
                          >
                            Load
                          </button>
                          <button
                            onClick={(e) => handleDeleteSlot(slot.id, e)}
                            className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 text-xs transition cursor-pointer"
                            title="Delete this save slot"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleSaveToSlot(slotIdx)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-bold transition cursor-pointer"
                        title="Overwrite or save to this slot"
                      >
                        {slot ? 'Overwrite' : 'Save Slot'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backup File Import & Export (For switching devices / GitHub Pages sharing) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/80">
            <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export & Import Save File (.json)</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3.5">
              Download your adventure as a file to play on mobile, school computers, or backup your journey across all 26 cities!
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Export Button */}
              <button
                onClick={handleExportBackup}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 text-slate-200 text-xs font-bold shadow transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Export Save File</span>
              </button>

              {/* Import Button */}
              <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 text-slate-200 text-xs font-bold shadow transition cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Import Save File</span>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImportBackup} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>WordQuest Cloud & Local Storage Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

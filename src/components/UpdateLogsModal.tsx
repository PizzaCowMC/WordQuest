import React, { useState } from 'react';
import { UPDATE_LOGS, APP_VERSION, UpdateLogEntry } from '../data/updateLogs';
import { X, Sparkles, History, Search, Rocket, Zap, ShieldCheck, CheckCircle2, ChevronRight, Tag } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface UpdateLogsModalProps {
  onClose: () => void;
}

export const UpdateLogsModal: React.FC<UpdateLogsModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Major', 'Feature', 'Engine', 'Polish'];

  const filteredLogs = UPDATE_LOGS.filter((log) => {
    const matchesSearch =
      log.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.highlight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.changes.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag = selectedTag === 'All' || log.tag === selectedTag;

    return matchesSearch && matchesTag;
  });

  const getTagBadge = (tag: UpdateLogEntry['tag']) => {
    switch (tag) {
      case 'Major':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black border-amber-300';
      case 'Engine':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black border-emerald-300';
      case 'Feature':
        return 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold border-sky-300';
      case 'Polish':
        return 'bg-purple-500/20 text-purple-300 font-bold border-purple-400/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header Ribbon */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center text-lg shadow-inner">
              <History className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white font-['Fredoka',sans-serif]">
                  Lexiroam Release Notes
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-black border border-emerald-500/30">
                  v{APP_VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Complete timeline of features, engine updates, and learning improvements
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close Update Logs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search features, fixes, or versions..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => {
                  soundEffects.playSelect();
                  setSelectedTag(t);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                  selectedTag === t
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Update Logs Timeline List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 divide-y divide-slate-800/60">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No release notes matched your search query.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isCurrent = log.version === APP_VERSION;
              return (
                <article
                  key={log.version}
                  className={`pt-4 first:pt-0 rounded-2xl transition ${
                    isCurrent ? 'p-4 bg-gradient-to-br from-slate-850 to-indigo-950/30 border border-sky-500/40 shadow-xl mb-2' : ''
                  }`}
                >
                  {/* Version Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-sm text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-lg border border-sky-800/60">
                        v{log.version}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-white">
                        {log.title}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border shadow-sm ${getTagBadge(log.tag)}`}>
                        {log.tag}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {log.releaseDate}
                      </span>
                    </div>
                  </div>

                  {/* Summary Highlight */}
                  <p className="text-xs text-sky-200/90 font-medium mb-2.5">
                    💡 {log.highlight}
                  </p>

                  {/* Change Bullet Points */}
                  <ul className="space-y-1.5 pl-1">
                    {log.changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="text-sky-400 mt-1 shrink-0 text-[10px]">●</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredLogs.length} release milestone{filteredLogs.length !== 1 ? 's' : ''} (1.0.0 – 1.9.6)</span>
          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

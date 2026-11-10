import React, { useState } from 'react';
import { BadgeData, BadgeSettings } from '../types/badge';
import { BadgeFront } from './BadgeFront';
import { BadgeBack } from './BadgeBack';
import { RotateCw, Eye, Sparkles, Layers } from 'lucide-react';

interface Badge3DViewerProps {
  data: BadgeData;
  settings: BadgeSettings;
  onUpdateSettings: (newSettings: Partial<BadgeSettings>) => void;
  frontRef: React.RefObject<HTMLDivElement | null>;
  backRef: React.RefObject<HTMLDivElement | null>;
}

export const Badge3DViewer: React.FC<Badge3DViewerProps> = ({
  data,
  settings,
  onUpdateSettings,
  frontRef,
  backRef,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'flip' | 'both'>('flip');

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Top View Mode & Action Toolbar */}
      <div className="flex items-center gap-2 mb-6 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm">
        <button
          onClick={() => setViewMode('flip')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewMode === 'flip'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Vista 3D Giratoria</span>
        </button>

        <button
          onClick={() => setViewMode('both')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewMode === 'both'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ambas Caras (Dúplex)</span>
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        {viewMode === 'flip' && (
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-all border border-cyan-500/30"
          >
            <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? 'Ver Anverso (Frente)' : 'Ver Reverso (Atrás)'}</span>
          </button>
        )}

        <button
          onClick={() => onUpdateSettings({ showHologram: !settings.showHologram })}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            settings.showHologram
              ? 'bg-indigo-950/80 text-cyan-300 border-cyan-500/40'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
          title="Alternar brillo holográfico de seguridad"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Holograma</span>
        </button>
      </div>

      {/* Render Area */}
      {viewMode === 'flip' ? (
        <div className="perspective-1000 py-4 flex flex-col items-center">
          <div
            className={`relative transition-transform duration-700 transform-style-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front Card */}
            <div className="backface-hidden" ref={frontRef as any}>
              <BadgeFront data={data} settings={settings} />
            </div>

            {/* Back Card */}
            <div className="absolute inset-0 backface-hidden rotate-y-180" ref={backRef as any}>
              <BadgeBack data={data} settings={settings} />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-4 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-500" />
            <span>Haz clic sobre la tarjeta para girar entre el frente y el reverso</span>
          </p>
        </div>
      ) : (
        /* Both Sides Side-by-Side */
        <div className="flex flex-wrap items-center justify-center gap-8 py-4">
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Anverso (Frente)</span>
            </div>
            <div ref={frontRef as any}>
              <BadgeFront data={data} settings={settings} />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Reverso (Atrás)</span>
            </div>
            <div ref={backRef as any}>
              <BadgeBack data={data} settings={settings} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

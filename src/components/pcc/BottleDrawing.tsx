import { pccAssets } from './assets';

export function BottleDrawing() {
  return (
    <div className="relative flex h-full w-full min-h-[460px] items-center justify-center overflow-hidden bg-[#07569b] p-4 md:min-h-[600px]" role="img" aria-label="PCC bottle engineering blueprint reference">
      <img
        src={pccAssets.bottleBlueprint}
        alt="PCC bottle engineering blueprint reference"
        width={1086}
        height={1448}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 border-t border-white/20 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
        <span>PCC / ENGINEERING REFERENCE</span>
        <span>500 ML FORMAT</span>
      </div>
    </div>
  );
}

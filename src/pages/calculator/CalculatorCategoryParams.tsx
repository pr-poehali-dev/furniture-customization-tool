import Icon from "@/components/ui/icon";
import {
  CategoryParams,
  DoorParams,
  KitchenParams,
  StaircaseParams,
  WardrobeParams,
  doorWidths,
  kitchenMetersCorner,
  kitchenMetersDirect,
  kitchenTypes,
  staircaseTypes,
  wardrobeDepths,
  wardrobeFilling,
  wardrobeHeights,
  wardrobeOpenTypes,
  wardrobeWidths,
} from "./calculator.types";

function OptionButton({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 border text-left transition-all duration-300 ${
        selected
          ? "border-[#c9a96e] bg-[#c9a96e]/10"
          : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
      } ${className}`}
    >
      <span className={`font-golos text-sm ${selected ? "text-[#c9a96e]" : "text-[#e8d5b0]/70"}`}>
        {children}
      </span>
    </button>
  );
}

function ParamGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3 className="font-golos text-[10px] tracking-[0.25em] uppercase text-[#c9a96e]/60 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function WardrobeStep({
  params,
  onChange,
}: {
  params: WardrobeParams;
  onChange: (p: CategoryParams) => void;
}) {
  const toggleFilling = (val: string) => {
    const next = params.filling.includes(val)
      ? params.filling.filter((f) => f !== val)
      : [...params.filling, val];
    onChange({ ...params, filling: next });
  };

  return (
    <>
      <ParamGroup title="Ширина">
        <div className="grid grid-cols-3 gap-2">
          {wardrobeWidths.map((w) => (
            <OptionButton key={w} selected={params.width === w} onClick={() => onChange({ ...params, width: w })}>
              {w}
            </OptionButton>
          ))}
        </div>
      </ParamGroup>

      <ParamGroup title="Высота">
        <div className="grid grid-cols-3 gap-2">
          {wardrobeHeights.map((h) => (
            <OptionButton key={h} selected={params.height === h} onClick={() => onChange({ ...params, height: h })}>
              {h}
            </OptionButton>
          ))}
        </div>
      </ParamGroup>

      <ParamGroup title="Глубина">
        <div className="grid grid-cols-3 gap-2">
          {wardrobeDepths.map((d) => (
            <OptionButton key={d} selected={params.depth === d} onClick={() => onChange({ ...params, depth: d })}>
              {d}
            </OptionButton>
          ))}
        </div>
      </ParamGroup>

      <ParamGroup title="Тип открывания">
        <div className="grid grid-cols-2 gap-2">
          {wardrobeOpenTypes.map((o) => (
            <OptionButton key={o} selected={params.openType === o} onClick={() => onChange({ ...params, openType: o })}>
              {o}
            </OptionButton>
          ))}
        </div>
      </ParamGroup>

      <ParamGroup title="Наполнение (можно несколько)">
        <div className="grid grid-cols-1 gap-2">
          {wardrobeFilling.map((f) => (
            <button
              key={f}
              onClick={() => toggleFilling(f)}
              className={`p-3 border flex items-center gap-3 transition-all duration-300 ${
                params.filling.includes(f)
                  ? "border-[#c9a96e] bg-[#c9a96e]/10"
                  : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
              }`}
            >
              <div className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all ${
                params.filling.includes(f) ? "border-[#c9a96e] bg-[#c9a96e]" : "border-[#c9a96e]/30"
              }`}>
                {params.filling.includes(f) && <Icon name="Check" size={10} className="text-[#0e0a06]" />}
              </div>
              <span className={`font-golos text-sm ${params.filling.includes(f) ? "text-[#c9a96e]" : "text-[#e8d5b0]/70"}`}>
                {f}
              </span>
            </button>
          ))}
        </div>
      </ParamGroup>
    </>
  );
}

export function KitchenStep({
  params,
  onChange,
}: {
  params: KitchenParams;
  onChange: (p: CategoryParams) => void;
}) {
  const meterOptions = params.kitchenType === "Угловая" ? kitchenMetersCorner : kitchenMetersDirect;

  return (
    <>
      <ParamGroup title="Тип кухни">
        <div className="grid grid-cols-2 gap-2">
          {kitchenTypes.map((t) => (
            <OptionButton
              key={t}
              selected={params.kitchenType === t}
              onClick={() => onChange({ ...params, kitchenType: t, meters: "" })}
            >
              {t}
            </OptionButton>
          ))}
        </div>
      </ParamGroup>

      {params.kitchenType && (
        <ParamGroup title="Количество погонных метров">
          <div className="grid grid-cols-2 gap-2">
            {meterOptions.map((m) => (
              <OptionButton key={m} selected={params.meters === m} onClick={() => onChange({ ...params, meters: m })}>
                {m}
              </OptionButton>
            ))}
          </div>
        </ParamGroup>
      )}
    </>
  );
}

export function DoorStep({
  params,
  onChange,
}: {
  params: DoorParams;
  onChange: (p: CategoryParams) => void;
}) {
  return (
    <ParamGroup title="Ширина двери">
      <div className="grid grid-cols-2 gap-2">
        {doorWidths.map((w) => (
          <OptionButton key={w} selected={params.width === w} onClick={() => onChange({ ...params, width: w })}>
            {w}
          </OptionButton>
        ))}
      </div>
    </ParamGroup>
  );
}

export function StaircaseStep({
  params,
  onChange,
}: {
  params: StaircaseParams;
  onChange: (p: CategoryParams) => void;
}) {
  return (
    <ParamGroup title="Тип лестницы">
      <div className="grid grid-cols-1 gap-2">
        {staircaseTypes.map((t) => (
          <OptionButton key={t} selected={params.staircaseType === t} onClick={() => onChange({ ...params, staircaseType: t })}>
            {t}
          </OptionButton>
        ))}
      </div>
    </ParamGroup>
  );
}

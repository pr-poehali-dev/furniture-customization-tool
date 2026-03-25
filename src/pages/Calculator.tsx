import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

type Step = 1 | 2 | 3 | 4;
type CategoryId = "wardrobe" | "kitchen" | "door" | "staircase";

const categories: { id: CategoryId; label: string; icon: string; basePrice: number }[] = [
  { id: "wardrobe", label: "Шкаф", icon: "Archive", basePrice: 65000 },
  { id: "kitchen", label: "Кухня", icon: "ChefHat", basePrice: 290000 },
  { id: "door", label: "Дверь", icon: "SquareDashedBottom", basePrice: 60000 },
  { id: "staircase", label: "Лестница", icon: "ArrowUpRight", basePrice: 300000 },
];

const extras = [
  { id: "viz3d", label: "3D-визуализация", price: 8000, icon: "Eye" },
  { id: "measure", label: "Выезд замерщика", price: 0, icon: "Ruler" },
  { id: "install", label: "Монтаж и установка", price: 15000, icon: "Wrench" },
  { id: "handles", label: "Фурнитура премиум-класса", price: 12000, icon: "Star" },
  { id: "lighting", label: "Встроенная подсветка", price: 9000, icon: "Lightbulb" },
];

type WardrobeParams = {
  width: string;
  height: string;
  depth: string;
  openType: string;
  filling: string[];
};

type KitchenParams = {
  kitchenType: string;
  meters: string;
};

type DoorParams = {
  width: string;
};

type StaircaseParams = {
  staircaseType: string;
};

type CategoryParams = WardrobeParams | KitchenParams | DoorParams | StaircaseParams;

const wardrobeWidths = ["80 см", "90 см", "100 см", "150 см", "200 см", "300 см"];
const wardrobeHeights = ["200 см", "240 см", "270 см"];
const wardrobeDepths = ["30 см", "40 см", "50 см"];
const wardrobeOpenTypes = ["Распашной", "Купе"];
const wardrobeFilling = ["Полки", "Ящики", "Штанги для вешалок"];

const kitchenTypes = ["Прямая", "Угловая"];
const kitchenMetersDirect = ["2 м.п.", "3 м.п.", "4 м.п."];
const kitchenMetersCorner = ["3 м.п.", "4 м.п.", "5 м.п.", "6 м.п."];

const doorWidths = ["60 см", "70 см", "80 см", "90 см"];

const staircaseTypes = ["Деревянная", "Металлическая", "Бетонная"];

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

function WardrobeStep({
  params,
  onChange,
}: {
  params: WardrobeParams;
  onChange: (p: WardrobeParams) => void;
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

function KitchenStep({
  params,
  onChange,
}: {
  params: KitchenParams;
  onChange: (p: KitchenParams) => void;
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

function DoorStep({ params, onChange }: { params: DoorParams; onChange: (p: DoorParams) => void }) {
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

function StaircaseStep({
  params,
  onChange,
}: {
  params: StaircaseParams;
  onChange: (p: StaircaseParams) => void;
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

function isParamsComplete(category: CategoryId, params: CategoryParams): boolean {
  if (category === "wardrobe") {
    const p = params as WardrobeParams;
    return !!(p.width && p.height && p.depth && p.openType && p.filling.length > 0);
  }
  if (category === "kitchen") {
    const p = params as KitchenParams;
    return !!(p.kitchenType && p.meters);
  }
  if (category === "door") {
    const p = params as DoorParams;
    return !!p.width;
  }
  if (category === "staircase") {
    const p = params as StaircaseParams;
    return !!p.staircaseType;
  }
  return false;
}

function getParamsSummary(category: CategoryId, params: CategoryParams): { label: string; value: string }[] {
  if (category === "wardrobe") {
    const p = params as WardrobeParams;
    return [
      { label: "Ширина", value: p.width || "—" },
      { label: "Высота", value: p.height || "—" },
      { label: "Глубина", value: p.depth || "—" },
      { label: "Открывание", value: p.openType || "—" },
      { label: "Наполнение", value: p.filling.length ? p.filling.join(", ") : "—" },
    ];
  }
  if (category === "kitchen") {
    const p = params as KitchenParams;
    return [
      { label: "Тип", value: p.kitchenType || "—" },
      { label: "Погонных метров", value: p.meters || "—" },
    ];
  }
  if (category === "door") {
    const p = params as DoorParams;
    return [{ label: "Ширина", value: p.width || "—" }];
  }
  if (category === "staircase") {
    const p = params as StaircaseParams;
    return [{ label: "Тип лестницы", value: p.staircaseType || "—" }];
  }
  return [];
}

const defaultParams: Record<CategoryId, CategoryParams> = {
  wardrobe: { width: "", height: "", depth: "", openType: "", filling: [] },
  kitchen: { kitchenType: "", meters: "" },
  door: { width: "" },
  staircase: { staircaseType: "" },
};

export default function Calculator() {
  const [step, setStep] = useState<Step>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "">("");
  const [categoryParams, setCategoryParams] = useState<Record<CategoryId, CategoryParams>>({ ...defaultParams });
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });
  const [sent, setSent] = useState(false);

  const catObj = categories.find((c) => c.id === selectedCategory);
  const basePrice = catObj?.basePrice ?? 0;
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const e = extras.find((ex) => ex.id === id);
    return sum + (e?.price ?? 0);
  }, 0);
  const total = Math.round(basePrice + extrasTotal);

  const currentParams = selectedCategory ? categoryParams[selectedCategory] : null;
  const paramsComplete = selectedCategory
    ? isParamsComplete(selectedCategory as CategoryId, categoryParams[selectedCategory])
    : false;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const updateParams = (p: CategoryParams) => {
    if (!selectedCategory) return;
    setCategoryParams((prev) => ({ ...prev, [selectedCategory]: p }));
  };

  const steps = [
    { num: 1, label: "Категория" },
    { num: 2, label: "Параметры" },
    { num: 3, label: "Опции" },
    { num: 4, label: "Контакты" },
  ];

  return (
    <Layout>
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Калькулятор
          </span>
          <h1 className="section-title mb-4">Рассчитайте стоимость</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Укажите параметры — получите предварительную стоимость и бесплатную консультацию
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Steps indicator */}
            <div className="flex items-center justify-center mb-12">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                        step === s.num
                          ? "border-[#c9a96e] bg-[#c9a96e] text-[#0e0a06]"
                          : step > s.num
                          ? "border-[#c9a96e]/50 text-[#c9a96e]/50"
                          : "border-[#e8d5b0]/20 text-[#e8d5b0]/30"
                      }`}
                    >
                      {step > s.num ? (
                        <Icon name="Check" size={14} />
                      ) : (
                        <span className="font-golos text-sm">{s.num}</span>
                      )}
                    </div>
                    <span
                      className={`font-golos text-[10px] tracking-widest uppercase mt-2 hidden sm:block ${
                        step === s.num ? "text-[#c9a96e]" : "text-[#e8d5b0]/30"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-16 md:w-24 h-px mx-2 transition-colors duration-300 ${
                        step > s.num ? "bg-[#c9a96e]/40" : "bg-[#e8d5b0]/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Panel */}
              <div className="lg:col-span-2">
                {!sent ? (
                  <>
                    {/* Step 1 — Category */}
                    {step === 1 && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Выберите категорию
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {categories.map(({ id, label, icon }) => (
                            <button
                              key={id}
                              onClick={() => setSelectedCategory(id)}
                              className={`p-4 border text-center transition-all duration-300 ${
                                selectedCategory === id
                                  ? "border-[#c9a96e] bg-[#c9a96e]/10"
                                  : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
                              }`}
                            >
                              <Icon
                                name={icon}
                                size={22}
                                className={`mx-auto mb-2 ${
                                  selectedCategory === id ? "text-[#c9a96e]" : "text-[#e8d5b0]/40"
                                }`}
                              />
                              <span
                                className={`font-golos text-xs ${
                                  selectedCategory === id ? "text-[#c9a96e]" : "text-[#e8d5b0]/55"
                                }`}
                              >
                                {label}
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-end mt-8">
                          <button
                            disabled={!selectedCategory}
                            onClick={() => setStep(2)}
                            className={`btn-gold ${!selectedCategory ? "opacity-40 cursor-not-allowed" : ""}`}
                          >
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 — Parameters */}
                    {step === 2 && selectedCategory && currentParams && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Параметры{" "}
                          <span className="text-[#c9a96e]">{catObj?.label}</span>
                        </h2>

                        {selectedCategory === "wardrobe" && (
                          <WardrobeStep
                            params={currentParams as WardrobeParams}
                            onChange={updateParams}
                          />
                        )}
                        {selectedCategory === "kitchen" && (
                          <KitchenStep
                            params={currentParams as KitchenParams}
                            onChange={updateParams}
                          />
                        )}
                        {selectedCategory === "door" && (
                          <DoorStep
                            params={currentParams as DoorParams}
                            onChange={updateParams}
                          />
                        )}
                        {selectedCategory === "staircase" && (
                          <StaircaseStep
                            params={currentParams as StaircaseParams}
                            onChange={updateParams}
                          />
                        )}

                        <div className="flex justify-between mt-6">
                          <button onClick={() => setStep(1)} className="btn-outline-gold">
                            Назад
                          </button>
                          <button
                            disabled={!paramsComplete}
                            onClick={() => setStep(3)}
                            className={`btn-gold ${!paramsComplete ? "opacity-40 cursor-not-allowed" : ""}`}
                          >
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3 — Extras */}
                    {step === 3 && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Дополнительные опции
                        </h2>
                        <div className="space-y-3">
                          {extras.map(({ id, label, price, icon }) => {
                            const checked = selectedExtras.includes(id);
                            return (
                              <button
                                key={id}
                                onClick={() => toggleExtra(id)}
                                className={`w-full p-4 border flex items-center gap-4 transition-all duration-300 ${
                                  checked
                                    ? "border-[#c9a96e] bg-[#c9a96e]/10"
                                    : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                                    checked ? "border-[#c9a96e] bg-[#c9a96e]" : "border-[#c9a96e]/30"
                                  }`}
                                >
                                  {checked && <Icon name="Check" size={12} className="text-[#0e0a06]" />}
                                </div>
                                <Icon
                                  name={icon}
                                  size={16}
                                  className={checked ? "text-[#c9a96e]" : "text-[#e8d5b0]/40"}
                                />
                                <span
                                  className={`font-golos text-sm flex-1 text-left ${
                                    checked ? "text-[#c9a96e]" : "text-[#e8d5b0]/70"
                                  }`}
                                >
                                  {label}
                                </span>
                                <span className="font-golos text-xs text-[#c9a96e]/60">
                                  {price === 0 ? "Бесплатно" : `+${price.toLocaleString("ru-RU")} ₽`}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-between mt-8">
                          <button onClick={() => setStep(2)} className="btn-outline-gold">
                            Назад
                          </button>
                          <button onClick={() => setStep(4)} className="btn-gold">
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4 — Contacts */}
                    {step === 4 && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Ваши контакты
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                                Имя *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="Иван Иванов"
                                className="input-dark"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                                Телефон *
                              </label>
                              <input
                                type="tel"
                                required
                                placeholder="+7 (___) ___-__-__"
                                className="input-dark"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="your@email.ru"
                              className="input-dark"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                              Пожелания
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Опишите ваш проект, дополнительные пожелания..."
                              className="input-dark resize-none"
                              value={form.comment}
                              onChange={(e) => setForm({ ...form, comment: e.target.value })}
                            />
                          </div>
                          <div className="flex justify-between mt-2">
                            <button type="button" onClick={() => setStep(3)} className="btn-outline-gold">
                              Назад
                            </button>
                            <button type="submit" className="btn-gold">
                              Отправить заявку
                            </button>
                          </div>
                          <p className="font-golos text-[10px] text-[#e8d5b0]/25 text-center">
                            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                          </p>
                        </form>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="card-dark p-12 text-center">
                    <div className="w-16 h-16 border border-[#c9a96e]/30 flex items-center justify-center mx-auto mb-6">
                      <Icon name="CheckCircle" size={28} className="text-[#c9a96e]" />
                    </div>
                    <h2 className="font-cormorant text-3xl text-[#e8d5b0] mb-4">Заявка отправлена!</h2>
                    <p className="font-golos text-sm text-[#e8d5b0]/50 mb-4">
                      Наш менеджер свяжется с вами в течение 30 минут в рабочее время для уточнения деталей и составления точного расчёта.
                    </p>
                    <div className="mt-6 p-4 border border-[#c9a96e]/20 bg-[#c9a96e]/5">
                      <p className="font-golos text-xs text-[#c9a96e]/70 mb-1">Предварительная стоимость</p>
                      <p className="font-cormorant text-3xl text-[#c9a96e]">
                        от {total.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <div className="card-dark p-6 sticky top-24">
                  <h3 className="font-golos text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-6">
                    Ваш расчёт
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="font-golos text-xs text-[#e8d5b0]/50">Категория</span>
                      <span className="font-golos text-xs text-[#e8d5b0]/80">
                        {catObj?.label ?? "—"}
                      </span>
                    </div>

                    {selectedCategory &&
                      getParamsSummary(selectedCategory as CategoryId, categoryParams[selectedCategory]).map(
                        ({ label, value }) => (
                          <div key={label} className="flex justify-between gap-2">
                            <span className="font-golos text-xs text-[#e8d5b0]/50 shrink-0">{label}</span>
                            <span className="font-golos text-xs text-[#e8d5b0]/80 text-right">{value}</span>
                          </div>
                        )
                      )}

                    {selectedExtras.length > 0 && (
                      <div>
                        <span className="font-golos text-xs text-[#e8d5b0]/50 block mb-1">Опции:</span>
                        {selectedExtras.map((id) => {
                          const ex = extras.find((e) => e.id === id);
                          return (
                            <div key={id} className="flex justify-between ml-2">
                              <span className="font-golos text-[10px] text-[#e8d5b0]/40">· {ex?.label}</span>
                              <span className="font-golos text-[10px] text-[#e8d5b0]/40">
                                {ex?.price === 0 ? "бесплатно" : `+${ex?.price?.toLocaleString("ru-RU")} ₽`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="divider-gold mb-5" />

                  <div className="text-center">
                    <p className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e]/60 mb-2">
                      Предварительная стоимость
                    </p>
                    <p className="font-cormorant text-4xl text-[#c9a96e]">
                      {selectedCategory ? `от ${total.toLocaleString("ru-RU")} ₽` : "—"}
                    </p>
                    <p className="font-golos text-[10px] text-[#e8d5b0]/30 mt-2">
                      Точная цена после замера
                    </p>
                  </div>

                  <div className="mt-6 p-4 bg-[#c9a96e]/5 border border-[#c9a96e]/15">
                    <div className="flex items-start gap-2">
                      <Icon name="Info" size={13} className="text-[#c9a96e]/50 mt-0.5 shrink-0" />
                      <p className="font-golos text-[10px] text-[#e8d5b0]/35 leading-relaxed">
                        Расчёт ориентировочный. Точная стоимость определяется после выезда замерщика и согласования проекта.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

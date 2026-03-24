import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

type Step = 1 | 2 | 3 | 4;

const furnitureTypes = [
  { id: "kitchen", label: "Кухня", icon: "ChefHat", basePrice: 290000 },
  { id: "wardrobe", label: "Шкаф-купе", icon: "DoorOpen", basePrice: 75000 },
  { id: "cabinet", label: "Распашной шкаф", icon: "Archive", basePrice: 65000 },
  { id: "kids", label: "Детская комната", icon: "Baby", basePrice: 140000 },
  { id: "office", label: "Офисная мебель", icon: "Briefcase", basePrice: 180000 },
  { id: "table", label: "Стол из слэба", icon: "Columns2", basePrice: 90000 },
  { id: "staircase", label: "Лестница", icon: "ArrowUpRight", basePrice: 300000 },
  { id: "door", label: "Дверь из массива", icon: "SquareDashedBottom", basePrice: 60000 },
];

const materials = [
  { id: "ldsp", label: "ЛДСП Premium", desc: "Надёжно, экономично", coef: 1.0 },
  { id: "mdf", label: "МДФ эмаль", desc: "Гладкая поверхность, яркие цвета", coef: 1.35 },
  { id: "oak", label: "Массив дуба", desc: "Природная красота, долговечность", coef: 1.9 },
  { id: "walnut", label: "Массив ореха", desc: "Премиум уровень, эксклюзив", coef: 2.4 },
  { id: "veneer", label: "Натуральный шпон", desc: "Вид массива, цена ниже", coef: 1.6 },
];

const extras = [
  { id: "viz3d", label: "3D-визуализация", price: 8000, icon: "Eye" },
  { id: "measure", label: "Выезд замерщика", price: 0, icon: "Ruler" },
  { id: "install", label: "Монтаж и установка", price: 15000, icon: "Wrench" },
  { id: "handles", label: "Фурнитура премиум-класса", price: 12000, icon: "Star" },
  { id: "lighting", label: "Встроенная подсветка", price: 9000, icon: "Lightbulb" },
];

const sizeOptions = [
  { id: "s", label: "Маленький", desc: "до 6 м²", coef: 0.7 },
  { id: "m", label: "Средний", desc: "6–12 м²", coef: 1.0 },
  { id: "l", label: "Большой", desc: "12–20 м²", coef: 1.45 },
  { id: "xl", label: "Очень большой", desc: "свыше 20 м²", coef: 2.0 },
];

export default function Calculator() {
  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("ldsp");
  const [selectedSize, setSelectedSize] = useState<string>("m");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });
  const [sent, setSent] = useState(false);

  const typeObj = furnitureTypes.find((t) => t.id === selectedType);
  const materialObj = materials.find((m) => m.id === selectedMaterial);
  const sizeObj = sizeOptions.find((s) => s.id === selectedSize);
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const e = extras.find((ex) => ex.id === id);
    return sum + (e?.price ?? 0);
  }, 0);

  const basePrice = typeObj?.basePrice ?? 0;
  const materialCoef = materialObj?.coef ?? 1;
  const sizeCoef = sizeObj?.coef ?? 1;
  const total = Math.round(basePrice * materialCoef * sizeCoef + extrasTotal);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const steps = [
    { num: 1, label: "Тип мебели" },
    { num: 2, label: "Параметры" },
    { num: 3, label: "Опции" },
    { num: 4, label: "Контакты" },
  ];

  return (
    <Layout>
      {/* Header */}
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

            {/* Steps */}
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
                    <span className={`font-golos text-[10px] tracking-widest uppercase mt-2 hidden sm:block ${
                      step === s.num ? "text-[#c9a96e]" : "text-[#e8d5b0]/30"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-16 md:w-24 h-px mx-2 transition-colors duration-300 ${step > s.num ? "bg-[#c9a96e]/40" : "bg-[#e8d5b0]/10"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Panel */}
              <div className="lg:col-span-2">
                {!sent ? (
                  <>
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Выберите тип мебели
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {furnitureTypes.map(({ id, label, icon }) => (
                            <button
                              key={id}
                              onClick={() => setSelectedType(id)}
                              className={`p-4 border text-center transition-all duration-300 ${
                                selectedType === id
                                  ? "border-[#c9a96e] bg-[#c9a96e]/10"
                                  : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
                              }`}
                            >
                              <Icon
                                name={icon}
                                size={22}
                                className={`mx-auto mb-2 ${
                                  selectedType === id ? "text-[#c9a96e]" : "text-[#e8d5b0]/40"
                                }`}
                              />
                              <span className={`font-golos text-xs ${
                                selectedType === id ? "text-[#c9a96e]" : "text-[#e8d5b0]/55"
                              }`}>
                                {label}
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-end mt-8">
                          <button
                            disabled={!selectedType}
                            onClick={() => setStep(2)}
                            className={`btn-gold ${!selectedType ? "opacity-40 cursor-not-allowed" : ""}`}
                          >
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Размер и материал
                        </h2>

                        <div className="mb-8">
                          <h3 className="font-golos text-xs tracking-[0.2em] uppercase text-[#c9a96e]/70 mb-4">
                            Размер проекта
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {sizeOptions.map(({ id, label, desc }) => (
                              <button
                                key={id}
                                onClick={() => setSelectedSize(id)}
                                className={`p-4 border text-left transition-all duration-300 ${
                                  selectedSize === id
                                    ? "border-[#c9a96e] bg-[#c9a96e]/10"
                                    : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
                                }`}
                              >
                                <span className={`font-cormorant text-lg block mb-1 ${selectedSize === id ? "text-[#c9a96e]" : "text-[#e8d5b0]"}`}>
                                  {label}
                                </span>
                                <span className="font-golos text-[10px] text-[#e8d5b0]/40">{desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-8">
                          <h3 className="font-golos text-xs tracking-[0.2em] uppercase text-[#c9a96e]/70 mb-4">
                            Материал
                          </h3>
                          <div className="space-y-2">
                            {materials.map(({ id, label, desc, coef }) => (
                              <button
                                key={id}
                                onClick={() => setSelectedMaterial(id)}
                                className={`w-full p-4 border text-left flex items-center justify-between transition-all duration-300 ${
                                  selectedMaterial === id
                                    ? "border-[#c9a96e] bg-[#c9a96e]/10"
                                    : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
                                }`}
                              >
                                <div>
                                  <span className={`font-golos text-sm block ${selectedMaterial === id ? "text-[#c9a96e]" : "text-[#e8d5b0]/80"}`}>
                                    {label}
                                  </span>
                                  <span className="font-golos text-xs text-[#e8d5b0]/35">{desc}</span>
                                </div>
                                <span className="font-golos text-xs text-[#e8d5b0]/30">
                                  ×{coef.toFixed(1)}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between mt-6">
                          <button onClick={() => setStep(1)} className="btn-outline-gold">
                            Назад
                          </button>
                          <button onClick={() => setStep(3)} className="btn-gold">
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
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
                                <div className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                                  checked ? "border-[#c9a96e] bg-[#c9a96e]" : "border-[#c9a96e]/30"
                                }`}>
                                  {checked && <Icon name="Check" size={12} className="text-[#0e0a06]" />}
                                </div>
                                <Icon name={icon} size={16} className={checked ? "text-[#c9a96e]" : "text-[#e8d5b0]/40"} />
                                <span className={`font-golos text-sm flex-1 text-left ${checked ? "text-[#c9a96e]" : "text-[#e8d5b0]/70"}`}>
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
                          <button onClick={() => setStep(2)} className="btn-outline-gold">Назад</button>
                          <button onClick={() => setStep(4)} className="btn-gold">Далее</button>
                        </div>
                      </div>
                    )}

                    {/* Step 4 */}
                    {step === 4 && (
                      <div className="card-dark p-8">
                        <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-6">
                          Ваши контакты
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">Имя *</label>
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
                              <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">Телефон *</label>
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
                            <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">Email</label>
                            <input
                              type="email"
                              placeholder="your@email.ru"
                              className="input-dark"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">Пожелания</label>
                            <textarea
                              rows={3}
                              placeholder="Опишите ваш проект, размеры, пожелания..."
                              className="input-dark resize-none"
                              value={form.comment}
                              onChange={(e) => setForm({ ...form, comment: e.target.value })}
                            />
                          </div>
                          <div className="flex justify-between mt-2">
                            <button type="button" onClick={() => setStep(3)} className="btn-outline-gold">Назад</button>
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
                      <span className="font-golos text-xs text-[#e8d5b0]/50">Тип</span>
                      <span className="font-golos text-xs text-[#e8d5b0]/80">
                        {typeObj?.label ?? "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-golos text-xs text-[#e8d5b0]/50">Размер</span>
                      <span className="font-golos text-xs text-[#e8d5b0]/80">
                        {sizeObj?.label ?? "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-golos text-xs text-[#e8d5b0]/50">Материал</span>
                      <span className="font-golos text-xs text-[#e8d5b0]/80">
                        {materialObj?.label ?? "—"}
                      </span>
                    </div>
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
                      {selectedType
                        ? `от ${total.toLocaleString("ru-RU")} ₽`
                        : "—"}
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

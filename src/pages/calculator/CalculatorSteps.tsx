import Icon from "@/components/ui/icon";
import { formatPhone, isPhoneComplete } from "@/utils/phoneFormat";
import {
  CategoryId,
  CategoryParams,
  DoorParams,
  KitchenParams,
  StaircaseParams,
  WardrobeParams,
  categories,
  extras,
} from "./calculator.types";
import {
  DoorStep,
  KitchenStep,
  StaircaseStep,
  WardrobeStep,
} from "./CalculatorCategoryParams";

type StepsProps = {
  step: number;
  sent: boolean;
  sending: boolean;
  total: number;
  selectedCategory: CategoryId | "";
  setSelectedCategory: (id: CategoryId) => void;
  currentParams: CategoryParams | null;
  paramsComplete: boolean;
  updateParams: (p: CategoryParams) => void;
  selectedExtras: string[];
  toggleExtra: (id: string) => void;
  form: { name: string; phone: string; email: string; comment: string };
  setForm: (f: { name: string; phone: string; email: string; comment: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setStep: (s: number) => void;
  catObj: { label: string } | undefined;
};

export default function CalculatorSteps({
  step,
  sent,
  sending,
  total,
  selectedCategory,
  setSelectedCategory,
  currentParams,
  paramsComplete,
  updateParams,
  selectedExtras,
  toggleExtra,
  form,
  setForm,
  handleSubmit,
  setStep,
  catObj,
}: StepsProps) {
  if (sent) {
    return (
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
    );
  }

  return (
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
            <WardrobeStep params={currentParams as WardrobeParams} onChange={updateParams} />
          )}
          {selectedCategory === "kitchen" && (
            <KitchenStep params={currentParams as KitchenParams} onChange={updateParams} />
          )}
          {selectedCategory === "door" && (
            <DoorStep params={currentParams as DoorParams} onChange={updateParams} />
          )}
          {selectedCategory === "staircase" && (
            <StaircaseStep params={currentParams as StaircaseParams} onChange={updateParams} />
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
                <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-1">
                  Имя *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  autoComplete="name"
                  className="input-dark"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <p className="font-golos text-[10px] text-[#e8d5b0]/30 mt-1">Как к вам обращаться</p>
              </div>
              <div>
                <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  className="input-dark"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                  maxLength={18}
                />
                <p className="font-golos text-[10px] text-[#e8d5b0]/30 mt-1">Перезвоним в течение 30 минут</p>
              </div>
            </div>
            <div>
              <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.ru"
                autoComplete="email"
                className="input-dark"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <p className="font-golos text-[10px] text-[#e8d5b0]/30 mt-1">Необязательно</p>
            </div>
            <div>
              <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-1">
                Пожелания
              </label>
              <textarea
                rows={3}
                placeholder="Цвет, материал, особые требования к конструкции..."
                className="input-dark resize-none"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
            </div>
            <div className="flex justify-between mt-2">
              <button type="button" onClick={() => setStep(3)} className="btn-outline-gold">
                Назад
              </button>
              <button type="submit" disabled={sending || !form.name.trim() || !isPhoneComplete(form.phone)} className={`btn-gold ${sending || !form.name.trim() || !isPhoneComplete(form.phone) ? "opacity-40 cursor-not-allowed" : ""}`}>
                {sending ? "Отправка..." : "Отправить заявку"}
              </button>
            </div>
            <p className="font-golos text-[10px] text-[#e8d5b0]/25 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      )}
    </>
  );
}
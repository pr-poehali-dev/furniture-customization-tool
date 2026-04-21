import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";
import { isPhoneValid, isNameValid, canSubmit, checkHoneypot, startFormTimer, isHumanSpeed } from "@/utils/formGuard";
import func2url from "../../backend/func2url.json";
import {
  CategoryId,
  CategoryParams,
  Step,
  calcPrice,
  categories,
  defaultParams,
  extras,
  getParamsSummary,
  isParamsComplete,
} from "./calculator/calculator.types";
import CalculatorSteps from "./calculator/CalculatorSteps";
import CalculatorSummary from "./calculator/CalculatorSummary";

const steps = [
  { num: 1, label: "Категория" },
  { num: 2, label: "Параметры" },
  { num: 3, label: "Опции" },
  { num: 4, label: "Контакты" },
];

export default function Calculator() {
  const [step, setStep] = useState<Step>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "">("");
  const [categoryParams, setCategoryParams] = useState<Record<CategoryId, CategoryParams>>({ ...defaultParams });
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });
  const [honeypot, setHoneypot] = useState("");
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formId = "calculator";

  useEffect(() => { startFormTimer(formId); }, []);

  const catObj = categories.find((c) => c.id === selectedCategory);
  const categoryPrice = selectedCategory
    ? calcPrice(selectedCategory as CategoryId, categoryParams[selectedCategory])
    : 0;
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const e = extras.find((ex) => ex.id === id);
    return sum + (e?.price ?? 0);
  }, 0);
  const total = categoryPrice + extrasTotal;

  const currentParams = selectedCategory ? categoryParams[selectedCategory] : null;
  const paramsComplete = selectedCategory
    ? isParamsComplete(selectedCategory as CategoryId, categoryParams[selectedCategory])
    : false;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!checkHoneypot(honeypot)) return;
    if (!isHumanSpeed(formId)) { setFormError("Заполните форму чуть медленнее"); return; }

    const nameCheck = isNameValid(form.name);
    if (!nameCheck.ok) { setFormError(nameCheck.error!); return; }

    const phoneCheck = isPhoneValid(form.phone);
    if (!phoneCheck.ok) { setFormError(phoneCheck.error!); return; }

    const rateCheck = canSubmit();
    if (!rateCheck.ok) { setFormError(rateCheck.error!); return; }

    setSending(true);

    const paramsSummary = selectedCategory
      ? getParamsSummary(selectedCategory as CategoryId, categoryParams[selectedCategory])
          .reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {} as Record<string, string>)
      : {};

    const extraLabels = selectedExtras.map((id) => {
      const ex = extras.find((e) => e.id === id);
      return ex?.label ?? id;
    });

    await fetch(func2url["send-order"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        category: catObj?.label ?? "",
        params: paramsSummary,
        extras: extraLabels,
      }),
    }).catch(() => null);

    setSending(false);
    setSent(true);
  };

  const updateParams = (p: CategoryParams) => {
    if (!selectedCategory) return;
    setCategoryParams((prev) => ({ ...prev, [selectedCategory]: p }));
  };

  return (
    <Layout>
      <SEOHead
        title="Калькулятор стоимости мебели на заказ"
        description="Рассчитайте стоимость мебели онлайн: кухни, шкафы, лестницы, детские. Укажите параметры и получите точную оценку за 2 минуты. Мастерская ЭЛИУТ, Барнаул."
        canonical="/calculator"
        breadcrumbs={[{ name: "Калькулятор", path: "/calculator" }]}
      />
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
              <div className="lg:col-span-2">
                <CalculatorSteps
                  step={step}
                  sent={sent}
                  sending={sending}
                  total={total}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  currentParams={currentParams}
                  paramsComplete={paramsComplete}
                  updateParams={updateParams}
                  selectedExtras={selectedExtras}
                  toggleExtra={toggleExtra}
                  form={form}
                  setForm={setForm}
                  honeypot={honeypot}
                  setHoneypot={setHoneypot}
                  formError={formError}
                  setFormError={setFormError}
                  handleSubmit={handleSubmit}
                  setStep={setStep}
                  catObj={catObj}
                />
              </div>

              <div>
                <CalculatorSummary
                  selectedCategory={selectedCategory}
                  categoryLabel={catObj?.label}
                  categoryParams={categoryParams}
                  selectedExtras={selectedExtras}
                  total={total}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
import Icon from "@/components/ui/icon";
import { CategoryId, CategoryParams, extras, getParamsSummary } from "./calculator.types";

type SummaryProps = {
  selectedCategory: CategoryId | "";
  categoryLabel: string | undefined;
  categoryParams: Record<CategoryId, CategoryParams>;
  selectedExtras: string[];
  total: number;
};

export default function CalculatorSummary({
  selectedCategory,
  categoryLabel,
  categoryParams,
  selectedExtras,
  total,
}: SummaryProps) {
  return (
    <div className="card-dark p-6 sticky top-24">
      <h3 className="font-golos text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-6">
        Ваш расчёт
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="font-golos text-xs text-[#e8d5b0]/50">Категория</span>
          <span className="font-golos text-xs text-[#e8d5b0]/80">
            {categoryLabel ?? "—"}
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
  );
}

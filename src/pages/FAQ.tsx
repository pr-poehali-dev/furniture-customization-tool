import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";

const faqs = [
  {
    category: "Заказ и производство",
    questions: [
      {
        q: "Как начать работу с вами?",
        a: "Свяжитесь с нами любым удобным способом — позвоните, напишите или заполните форму на сайте. Наш менеджер проведёт консультацию, выедет на замер и поможет разработать проект.",
      },
      {
        q: "Сколько времени занимает изготовление мебели?",
        a: "Сроки зависят от сложности проекта: шкафы — 20–30 дней, кухни — 45–60 дней, лестницы — 40–55 дней. Точные сроки фиксируются в договоре и строго соблюдаются.",
      },
      {
        q: "Можно ли вносить изменения после подписания договора?",
        a: "Незначительные правки возможны на этапе до запуска в производство. После запуска серьёзные изменения могут повлечь дополнительные расходы и сдвиг сроков.",
      },
      {
        q: "Работаете ли вы по всей России?",
        a: "Да, доставляем и монтируем мебель по всей России. Стоимость логистики рассчитывается индивидуально в зависимости от региона.",
      },
    ],
  },
  {
    category: "Материалы и качество",
    questions: [
      {
        q: "Какие материалы вы используете?",
        a: "Работаем с МДФ, ЛДСП, массивом дуба/ясеня/ореха, акрилом, стеклом, натуральным шпоном. Все материалы имеют европейские сертификаты безопасности (E1 и выше).",
      },
      {
        q: "Какая гарантия на мебель?",
        a: "5 лет на все изделия собственного производства. Гарантия охватывает конструктивные элементы, фурнитуру и покрытия при соблюдении условий эксплуатации.",
      },
      {
        q: "Используете ли вы экологичные материалы?",
        a: "Да, это один из наших ключевых принципов. Применяем только сертифицированные материалы класса E1 (эмиссия формальдегида минимальна), экологичные лаки и масла на водной основе.",
      },
    ],
  },
  {
    category: "Стоимость и оплата",
    questions: [
      {
        q: "Как формируется цена?",
        a: "Цена зависит от размеров, выбранных материалов, сложности конструкции и фурнитуры. После замера и согласования проекта фиксируем итоговую стоимость в договоре — она не меняется.",
      },
      {
        q: "Какой порядок оплаты?",
        a: "50% предоплата при подписании договора, 50% после сборки и приёмки. Принимаем безналичный расчёт и наличные.",
      },
      {
        q: "Есть ли скидки?",
        a: "Да, действует система лояльности для постоянных клиентов. Также предоставляем скидки при комплексном заказе (например, кухня + шкафы + детская).",
      },
      {
        q: "Можно ли оформить рассрочку?",
        a: "Да, предлагаем рассрочку через банки-партнёры на срок от 6 до 24 месяцев без переплаты (при одобрении банком).",
      },
    ],
  },
  {
    category: "Доставка и монтаж",
    questions: [
      {
        q: "Входит ли монтаж в стоимость?",
        a: "Монтаж рассчитывается отдельно и зависит от объёма и сложности работ. Точная стоимость фиксируется в договоре.",
      },
      {
        q: "Что происходит после монтажа?",
        a: "Через 2–3 месяца после монтажа наш мастер приедет для регулировки фурнитуры и устранения возможных нюансов — бесплатно, в рамках гарантии.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.flatMap((section) =>
    section.questions.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    }))
  ),
};

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Частые вопросы — Мебель на заказ ЭЛИУТ"
        description="Ответы на частые вопросы о заказе мебели: сроки изготовления, материалы, цены, доставка и монтаж, гарантии. Мастерская ЭЛИУТ, Барнаул."
        canonical="/faq"
        schema={faqSchema}
        breadcrumbs={[{ name: "Частые вопросы", path: "/faq" }]}
      />
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Вопросы и ответы
          </span>
          <h1 className="section-title mb-4">Частые вопросы</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Собрали ответы на самые популярные вопросы наших клиентов
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6 max-w-3xl">
          {faqs.map(({ category, questions }) => (
            <div key={category} className="mb-12">
              <h2 className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 pb-3 border-b border-[#c9a96e]/20">
                {category}
              </h2>
              <div className="space-y-2">
                {questions.map(({ q, a }) => {
                  const key = `${category}-${q}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={q} className="card-dark overflow-hidden">
                      <button
                        className="w-full flex items-start justify-between gap-4 p-6 text-left"
                        onClick={() => setOpenItem(isOpen ? null : key)}
                      >
                        <span className="font-cormorant text-lg text-[#e8d5b0] leading-tight">{q}</span>
                        <Icon
                          name={isOpen ? "Minus" : "Plus"}
                          size={16}
                          className="text-[#c9a96e] shrink-0 mt-1"
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-0">
                          <div className="divider-gold mb-4" />
                          <p className="font-golos text-sm text-[#e8d5b0]/55 leading-relaxed">{a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080604] text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8d5b0] mb-4">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="font-golos text-sm text-[#e8d5b0]/45 mb-8">
            Свяжитесь с нами — ответим в течение 30 минут
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts" className="btn-gold">Задать вопрос</Link>
            <Link to="/calculator" className="btn-outline-gold">Рассчитать стоимость</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
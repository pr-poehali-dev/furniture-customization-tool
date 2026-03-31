import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";

const services = [
  {
    icon: "ChefHat",
    title: "Кухни на заказ",
    desc: "Разрабатываем кухонные гарнитуры любой сложности: угловые, прямые, П-образные, с островом. Работаем с МДФ, массивом, акрилом, эмалью.",
    features: ["Обмер и дизайн-проект", "3D-визуализация", "Производство и доставка", "Монтаж и подключение техники"],
    price: "от 290 000 ₽",
  },
  {
    icon: "DoorOpen",
    title: "Распашные шкафы",
    desc: "Встроенные и отдельно стоящие шкафы с системой умного хранения. Любые размеры, фасады и наполнение.",
    features: ["Встроенное хранение", "Система организации", "Мягкое закрывание", "Подсветка"],
    price: "от 75 000 ₽",
  },
  {
    icon: "Baby",
    title: "Детские комнаты",
    desc: "Безопасная мебель из экологичных материалов. Кровати-чердаки, трансформеры, учебные зоны, системы хранения.",
    features: ["Экологичные материалы", "Эргономика роста", "Безопасные кромки", "Встроенная подсветка"],
    price: "от 140 000 ₽",
  },
  {
    icon: "Briefcase",
    title: "Офисная мебель",
    desc: "Мебель для офисов, кабинетов руководителей, переговорных комнат и опенспейсов. Функциональный дизайн и долговечность.",
    features: ["Эргономика рабочих мест", "Управление кабелями", "Переговорные зоны", "Ресепшн"],
    price: "от 180 000 ₽",
  },
  {
    icon: "Hammer",
    title: "Столярные работы",
    desc: "Обеденные столы из слэба, деревянные панели, балки, подоконники и любые другие изделия из натурального дерева.",
    features: ["Слэбы грецкого ореха", "Сохранение природного края", "Масло-воск покрытие", "Любая форма столешницы"],
    price: "от 90 000 ₽",
  },
  {
    icon: "ArrowUpRight",
    title: "Интерьерные лестницы",
    desc: "Деревянные лестницы любой конфигурации: маршевые, винтовые, на больцах, с металлическим каркасом.",
    features: ["Конструктивный расчёт", "Дизайн-проект", "Металлокаркас", "Установка ограждений"],
    price: "от 300 000 ₽",
  },
  {
    icon: "SquareDashedBottom",
    title: "Двери из массива",
    desc: "Входные и межкомнатные двери из массива дуба, ясеня, ореха. Скрытые петли, замки высокого класса.",
    features: ["Массив дуба/ясеня/ореха", "Скрытые петли", "Замки Kale/Abloy", "Финишная обработка"],
    price: "от 60 000 ₽",
  },
  {
    icon: "Eye",
    title: "3D-визуализация",
    desc: "Детализированный рендер вашего будущего интерьера до начала производства — увидите результат заранее.",
    features: ["Фотореалистичный рендер", "Несколько ракурсов", "Варианты цветов", "Правки включены"],
    price: "от 8 000 ₽",
  },
];

export default function Services() {
  return (
    <Layout>
      <SEOHead
        title="Услуги — Кухни, шкафы, лестницы на заказ"
        description="Кухни от 290 000 ₽, шкафы от 75 000 ₽, лестницы от 300 000 ₽, двери из массива, столы из слэба, 3D-визуализация. Мебель на заказ в Барнауле — ЭЛИУТ."
        canonical="/services"
      />
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Услуги
          </span>
          <h1 className="section-title mb-4">Что мы делаем</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Полный цикл: от дизайн-концепции до монтажа и постгарантийного обслуживания
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ icon, title, desc, features, price }) => (
              <div key={title} className="card-dark p-8">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 border border-[#c9a96e]/30 flex items-center justify-center shrink-0">
                    <Icon name={icon} size={20} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-2xl text-[#e8d5b0] mb-2">{title}</h3>
                    <p className="font-golos text-sm text-[#e8d5b0]/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="divider-gold mb-6" />
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#c9a96e] rounded-full shrink-0" />
                      <span className="font-golos text-xs text-[#e8d5b0]/45">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-xl text-[#c9a96e]">{price}</span>
                  <Link to="/calculator" className="btn-outline-gold !py-2 !px-4 text-[10px]">
                    Рассчитать
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#080604]">
        <div className="container mx-auto px-6 text-center">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Гарантии
          </span>
          <h2 className="section-title mb-12">Наши обязательства</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "Shield", title: "Гарантия 5 лет", desc: "На всю мебель собственного производства" },
              { icon: "FileCheck", title: "Договор", desc: "Фиксированная цена без скрытых доплат" },
              { icon: "Headphones", title: "Сервис после монтажа", desc: "Подрегулировка фурнитуры через 3 месяца" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card-dark p-8 text-center">
                <Icon name={icon} size={28} className="text-[#c9a96e] mx-auto mb-4" />
                <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-2">{title}</h3>
                <p className="font-golos text-sm text-[#e8d5b0]/45">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0e0a06] text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8d5b0] mb-6">
            Нужна консультация по услуге?
          </h2>
          <Link to="/contacts" className="btn-gold">Написать нам</Link>
        </div>
      </section>
    </Layout>
  );
}
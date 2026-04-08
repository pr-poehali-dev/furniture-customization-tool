import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ЭЛИУТ",
  "description": "Мебельная мастерская. Корпусная мебель, кухни, шкафы, лестницы из массива и столы из слэба. Ручная работа.",
  "url": "https://eliut.ru",
  "telephone": "+79959080228",
  "email": "mebeleluit@yandex.ru",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Лесная поляна, 3з",
    "addressLocality": "Барнаул",
    "addressRegion": "Алтайский край",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "addressCountry": "RU"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "priceRange": "₽₽₽",
  "foundingDate": "2010",
  "numberOfEmployees": 60,
  "sameAs": []
};

const HERO_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7955e3dc-d27c-47ff-9e56-f4a2cd469bdc.jpg";
const KITCHEN_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg";
const WARDROBE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg";
const TABLE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg";
const STAIR_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/940a4c0c-4aeb-4178-88db-274dee12d818.jpg";
const KIDS_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/b0a9d7a1-b2fe-4cbc-bbf9-789b4270776a.jpg";

const categories = [
  { title: "Кухни", desc: "Индивидуальные кухонные гарнитуры", img: KITCHEN_IMG, path: "/portfolio" },
  { title: "Шкафы", desc: "Распашные и встроенные шкафы", img: WARDROBE_IMG, path: "/portfolio" },
  { title: "Детские", desc: "Безопасная мебель для детей", img: KIDS_IMG, path: "/portfolio" },
  { title: "Столы из слэба", desc: "Обеденные столы из массива дерева", img: TABLE_IMG, path: "/portfolio" },
  { title: "Лестницы", desc: "Интерьерные лестницы из дерева", img: STAIR_IMG, path: "/portfolio" },
];

const advantages = [
  { icon: "Ruler", title: "Индивидуальный проект", desc: "Каждый заказ разрабатывается под ваше пространство и пожелания" },
  { icon: "TreePine", title: "Натуральные материалы", desc: "Используем только сертифицированные породы дерева и экологичные материалы" },
  { icon: "Shield", title: "Гарантия 5 лет", desc: "Полная гарантия на все изделия и конструктивные элементы" },
  { icon: "Truck", title: "Доставка и монтаж", desc: "Профессиональный монтаж бригадой наших мастеров с выездом по России" },
  { icon: "Palette", title: "3D-визуализация", desc: "Утверждаете проект до производства — никаких сюрпризов" },
  { icon: "Clock", title: "Соблюдение сроков", desc: "Строго выдерживаем оговорённые сроки производства и установки" },
];

const stats = [
  { value: "14+", label: "лет на рынке" },
  { value: "2 400", label: "реализованных проектов" },
  { value: "98%", label: "довольных клиентов" },
  { value: "60+", label: "мастеров в команде" },
];

export default function Home() {
  return (
    <Layout>
      <SEOHead
        title="ЭЛИУТ — Мебель ручной работы в Барнауле"
        description="Мебельная мастерская ЭЛИУТ с 2010 года. Кухни на заказ, шкафы, лестницы из массива, столы из слэба. Более 2400 проектов, гарантия 5 лет. Барнаул."
        canonical="/"
        schema={localBusinessSchema}
      />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0a06]/95 via-[#0e0a06]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a06]/80 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <div className="w-12 h-px bg-[#c9a96e]" />
              <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e]">
                Премиальная мебельная мастерская
              </span>
            </div>

            <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 animate-fade-in animate-delay-100">
              Мебель,{" "}
              <span className="gold-gradient italic">созданная</span>
              <br />
              для вашей жизни
            </h1>

            <p className="font-golos text-lg text-[#e8d5b0]/65 leading-relaxed max-w-xl mb-12 animate-fade-in animate-delay-200">
              Разрабатываем и изготавливаем корпусную мебель, кухни, шкафы, детские, офисные интерьеры, лестницы и двери из массива — под ключ.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-300">
              <Link to="/portfolio" className="btn-gold">
                Смотреть работы
              </Link>
              <Link to="/calculator" className="btn-outline-gold">
                Рассчитать стоимость
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in animate-delay-400">
              {stats.map(({ value, label }) => (
                <div key={label} className="border-l border-[#c9a96e]/30 pl-4">
                  <div className="font-cormorant text-3xl md:text-4xl text-[#c9a96e]">{value}</div>
                  <div className="font-golos text-xs text-[#e8d5b0]/50 mt-1 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-[#c9a96e]/50" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
              Направления
            </span>
            <h2 className="section-title">Что мы создаём</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.title}
                to={cat.path}
                className={`group relative overflow-hidden ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                style={{ minHeight: i === 0 ? "480px" : "220px" }}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a06]/90 via-[#0e0a06]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-cormorant text-2xl md:text-3xl text-[#e8d5b0] mb-1">
                    {cat.title}
                  </h3>
                  <p className="font-golos text-xs text-[#e8d5b0]/60 tracking-wide">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-golos text-xs tracking-widest uppercase">Подробнее</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/portfolio" className="btn-outline-gold">
              Все работы
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-[#080604]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
              Почему выбирают нас
            </span>
            <h2 className="section-title">Наши преимущества</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map(({ icon, title, desc }) => (
              <div key={title} className="card-dark p-8">
                <div className="w-12 h-12 border border-[#c9a96e]/30 flex items-center justify-center mb-6">
                  <Icon name={icon} size={20} className="text-[#c9a96e]" />
                </div>
                <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-3">{title}</h3>
                <p className="font-golos text-sm text-[#e8d5b0]/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
              Как мы работаем
            </span>
            <h2 className="section-title">Этапы создания</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Консультация", desc: "Обсуждаем ваши пожелания, замеряем помещение" },
              { step: "02", title: "Дизайн-проект", desc: "Создаём 3D-визуализацию и согласовываем детали" },
              { step: "03", title: "Договор", desc: "Фиксируем стоимость, сроки и материалы" },
              { step: "04", title: "Производство", desc: "Изготавливаем в нашем цехе под контролем мастера" },
              { step: "05", title: "Монтаж", desc: "Доставляем и устанавливаем в вашем интерьере" },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < 4 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#c9a96e]/20 z-0" />
                )}
                <div className="relative z-10">
                  <div className="font-cormorant text-5xl font-light text-[#c9a96e]/20 mb-4">{step}</div>
                  <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-2">{title}</h3>
                  <p className="font-golos text-xs text-[#e8d5b0]/45 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#080604] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#c9a96e] blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#c9a96e] blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-6">
            Бесплатная консультация
          </span>
          <h2 className="section-title mb-6 max-w-3xl mx-auto">
            Готовы воплотить<br />вашу идею в жизнь?
          </h2>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-lg mx-auto mb-10">
            Рассчитайте стоимость проекта онлайн или свяжитесь с нашим дизайнером — консультация бесплатна.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculator" className="btn-gold">
              Рассчитать стоимость
            </Link>
            <Link to="/contacts" className="btn-outline-gold">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
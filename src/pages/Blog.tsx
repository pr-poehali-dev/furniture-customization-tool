import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import SEOHead from "@/components/SEOHead";

const KITCHEN_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg";
const WARDROBE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg";
const TABLE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg";
const STAIR_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/940a4c0c-4aeb-4178-88db-274dee12d818.jpg";

const categories = ["Все", "Дизайн", "Материалы", "Советы", "Тренды"];

const posts = [
  {
    id: 1,
    title: "Как выбрать материал для кухонного фасада: полный гид",
    excerpt: "МДФ, акрил, стекло или массив — разбираем плюсы и минусы каждого материала, сравниваем по цене и долговечности.",
    category: "Материалы",
    img: KITCHEN_IMG,
    date: "18 марта 2024",
    readTime: "8 мин",
    author: "Екатерина Лебедева",
  },
  {
    id: 2,
    title: "Тренды мебели 2024: что выбирают дизайнеры интерьера",
    excerpt: "Slabwood, арки, флютинг и тёплые натуральные тона — рассказываем о главных направлениях этого года.",
    category: "Тренды",
    img: TABLE_IMG,
    date: "10 марта 2024",
    readTime: "6 мин",
    author: "Александр Морозов",
  },
  {
    id: 3,
    title: "5 ошибок при заказе встроенного шкафа",
    excerpt: "Большинство клиентов допускают одни и те же ошибки. Рассказываем, как их избежать и сэкономить деньги.",
    category: "Советы",
    img: WARDROBE_IMG,
    date: "28 февраля 2024",
    readTime: "5 мин",
    author: "Ирина Соколова",
  },
  {
    id: 4,
    title: "Лестница в доме: как не ошибиться с дизайном",
    excerpt: "Выбор конструкции, материалов и стиля — все нюансы проектирования интерьерной лестницы.",
    category: "Дизайн",
    img: STAIR_IMG,
    date: "15 февраля 2024",
    readTime: "10 мин",
    author: "Дмитрий Захаров",
  },
  {
    id: 5,
    title: "Слэб: что это такое и почему это стоит дорого",
    excerpt: "Объясняем простыми словами: от выбора дерева на лесопилке до готового обеденного стола в вашем доме.",
    category: "Материалы",
    img: TABLE_IMG,
    date: "5 февраля 2024",
    readTime: "7 мин",
    author: "Александр Морозов",
  },
  {
    id: 6,
    title: "Детская мебель: что важнее — дизайн или безопасность?",
    excerpt: "Споiler: и то, и другое. Рассказываем, как совместить красоту и безопасность в детской комнате.",
    category: "Советы",
    img: WARDROBE_IMG,
    date: "20 января 2024",
    readTime: "6 мин",
    author: "Екатерина Лебедева",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <Layout>
      <SEOHead
        title="Блог — Советы по мебели и дизайну интерьера"
        description="Полезные статьи о выборе материалов для кухни, трендах мебели 2026, ошибках при заказе шкафов и дизайне лестниц. Блог мастерской ЭЛИУТ, Барнаул."
        canonical="/blog"
        breadcrumbs={[{ name: "Блог", path: "/blog" }]}
      />
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Блог
          </span>
          <h1 className="section-title mb-4">Мебель. Дизайн. Советы.</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Полезные статьи от наших дизайнеров и мастеров
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#0e0a06] sticky top-16 z-30 border-b border-[#c9a96e]/10">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-golos text-xs tracking-[0.15em] uppercase px-5 py-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#c9a96e] text-[#0e0a06]"
                    : "text-[#e8d5b0]/50 hover:text-[#c9a96e]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          {featured && (
            <div className="card-dark group overflow-hidden mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden" style={{ minHeight: "360px" }}>
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-golos text-[10px] tracking-widest uppercase bg-[#c9a96e] text-[#0e0a06] px-3 py-1.5">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-golos text-xs text-[#e8d5b0]/40">{featured.date}</span>
                    <span className="font-golos text-xs text-[#e8d5b0]/40">·</span>
                    <span className="font-golos text-xs text-[#e8d5b0]/40">{featured.readTime} чтения</span>
                  </div>
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8d5b0] mb-4 leading-tight">
                    {featured.title}
                  </h2>
                  <p className="font-golos text-sm text-[#e8d5b0]/50 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-golos text-xs text-[#c9a96e]/70">{featured.author}</span>
                    <button className="flex items-center gap-2 text-[#c9a96e] hover:text-[#e8d5b0] transition-colors">
                      <span className="font-golos text-xs tracking-widest uppercase">Читать</span>
                      <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article key={post.id} className="card-dark group overflow-hidden cursor-pointer">
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="font-golos text-[10px] tracking-widest uppercase bg-[#0e0a06]/80 text-[#c9a96e] px-2.5 py-1 border border-[#c9a96e]/30">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-golos text-xs text-[#e8d5b0]/35">{post.date}</span>
                    <span className="font-golos text-xs text-[#e8d5b0]/35">·</span>
                    <span className="font-golos text-xs text-[#e8d5b0]/35">{post.readTime}</span>
                  </div>
                  <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-2 leading-tight group-hover:text-[#c9a96e] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-golos text-xs text-[#e8d5b0]/45 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-golos text-[10px] text-[#c9a96e]/60">{post.author}</span>
                    <Icon name="ArrowRight" size={14} className="text-[#c9a96e]/50 group-hover:text-[#c9a96e] transition-colors" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#080604]">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Подписка
          </span>
          <h2 className="font-cormorant text-3xl text-[#e8d5b0] mb-4">Новые статьи на почту</h2>
          <p className="font-golos text-sm text-[#e8d5b0]/45 mb-8">
            Раз в месяц — полезные советы по дизайну интерьера и уходу за мебелью
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Ваш email"
              className="input-dark flex-1"
            />
            <button className="btn-gold shrink-0">Подписаться</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
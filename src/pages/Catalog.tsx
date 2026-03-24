import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const KITCHEN_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg";
const WARDROBE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg";
const TABLE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg";
const STAIR_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/940a4c0c-4aeb-4178-88db-274dee12d818.jpg";
const KIDS_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/b0a9d7a1-b2fe-4cbc-bbf9-789b4270776a.jpg";

const categories = ["Все", "Кухни", "Шкафы", "Детские", "Офисная мебель", "Столярные работы", "Лестницы", "Двери"];

const products = [
  { id: 1, title: "Кухня «Венеция»", category: "Кухни", img: KITCHEN_IMG, price: "от 380 000 ₽", material: "МДФ, массив дуба", time: "45–60 дней" },
  { id: 2, title: "Шкаф-купе «Лофт»", category: "Шкафы", img: WARDROBE_IMG, price: "от 95 000 ₽", material: "ЛДСП, зеркало", time: "20–30 дней" },
  { id: 3, title: "Детская «Арктика»", category: "Детские", img: KIDS_IMG, price: "от 145 000 ₽", material: "МДФ, эмаль", time: "30–40 дней" },
  { id: 4, title: "Стол из слэба «Дикий»", category: "Столярные работы", img: TABLE_IMG, price: "от 120 000 ₽", material: "Слэб грецкого ореха", time: "25–35 дней" },
  { id: 5, title: "Лестница «Модерн»", category: "Лестницы", img: STAIR_IMG, price: "от 320 000 ₽", material: "Массив дуба, металл", time: "40–55 дней" },
  { id: 6, title: "Кухня «Классика»", category: "Кухни", img: KITCHEN_IMG, price: "от 290 000 ₽", material: "МДФ, эмаль", time: "40–55 дней" },
  { id: 7, title: "Шкаф распашной «Неаполь»", category: "Шкафы", img: WARDROBE_IMG, price: "от 78 000 ₽", material: "МДФ, массив", time: "20–25 дней" },
  { id: 8, title: "Офис «Директор»", category: "Офисная мебель", img: WARDROBE_IMG, price: "от 210 000 ₽", material: "ЛДСП Premium, металл", time: "30–40 дней" },
  { id: 9, title: "Дверь «Брасс»", category: "Двери", img: TABLE_IMG, price: "от 65 000 ₽", material: "Массив дуба", time: "20–30 дней" },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06] relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#c9a96e] blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Каталог
          </span>
          <h1 className="section-title mb-4">Наши коллекции</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Индивидуальная мебель ручной работы — каждое изделие создаётся под ваш проект
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#0e0a06] sticky top-16 z-30 border-b border-[#c9a96e]/10">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-golos text-xs tracking-[0.15em] uppercase px-5 py-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#c9a96e] text-[#0e0a06]"
                    : "text-[#e8d5b0]/50 hover:text-[#c9a96e] border border-transparent hover:border-[#c9a96e]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="card-dark group overflow-hidden">
                <div className="relative overflow-hidden" style={{ height: "260px" }}>
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-golos text-[10px] tracking-widest uppercase bg-[#0e0a06]/80 text-[#c9a96e] px-3 py-1.5 border border-[#c9a96e]/30">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-3">{product.title}</h3>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2">
                      <Icon name="TreePine" size={13} className="text-[#c9a96e]/60" />
                      <span className="font-golos text-xs text-[#e8d5b0]/45">{product.material}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={13} className="text-[#c9a96e]/60" />
                      <span className="font-golos text-xs text-[#e8d5b0]/45">Срок: {product.time}</span>
                    </div>
                  </div>
                  <div className="divider-gold mb-5" />
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant text-xl text-[#c9a96e]">{product.price}</span>
                    <Link to="/calculator" className="btn-outline-gold !py-2 !px-4 text-[10px]">
                      Рассчитать
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-golos text-[#e8d5b0]/40">По данной категории товаров пока нет</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080604]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8d5b0] mb-4">
            Не нашли подходящий вариант?
          </h2>
          <p className="font-golos text-sm text-[#e8d5b0]/50 mb-8 max-w-md mx-auto">
            Создадим уникальный проект специально под вас
          </p>
          <Link to="/calculator" className="btn-gold">
            Обсудить индивидуальный проект
          </Link>
        </div>
      </section>
    </Layout>
  );
}

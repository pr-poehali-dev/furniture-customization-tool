import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const KITCHEN_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg";
const WARDROBE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg";
const TABLE_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg";
const STAIR_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/940a4c0c-4aeb-4178-88db-274dee12d818.jpg";
const KIDS_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/b0a9d7a1-b2fe-4cbc-bbf9-789b4270776a.jpg";

const filters = ["Все", "Кухни", "Шкафы", "Лестницы", "Детские", "Столы"];

const works = [
  { id: 1, title: "Кухня в стиле модерн", category: "Кухни", img: KITCHEN_IMG, location: "Москва, Рублёвское шоссе", year: "2024", area: "18 м²" },
  { id: 2, title: "Гардеробная-студия", category: "Шкафы", img: WARDROBE_IMG, location: "Санкт-Петербург", year: "2024", area: "12 м²" },
  { id: 3, title: "Детская для двойни", category: "Детские", img: KIDS_IMG, location: "Москва, Новая Рига", year: "2023", area: "22 м²" },
  { id: 4, title: "Стол из карагача", category: "Столы", img: TABLE_IMG, location: "Подмосковье", year: "2024", area: "Индивидуально" },
  { id: 5, title: "Лестница «Паук»", category: "Лестницы", img: STAIR_IMG, location: "Москва, Рублёво", year: "2023", area: "Высота 4.2 м" },
  { id: 6, title: "Кухня-остров", category: "Кухни", img: KITCHEN_IMG, location: "Красногорск", year: "2024", area: "24 м²" },
  { id: 7, title: "Офис руководителя", category: "Шкафы", img: WARDROBE_IMG, location: "Москва, ММДЦ", year: "2023", area: "35 м²" },
  { id: 8, title: "Детская-трансформер", category: "Детские", img: KIDS_IMG, location: "Одинцово", year: "2024", area: "16 м²" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [selected, setSelected] = useState<null | typeof works[0]>(null);

  const filtered = activeFilter === "Все" ? works : works.filter((w) => w.category === activeFilter);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Наши работы
          </span>
          <h1 className="section-title mb-4">Портфолио</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Более 2400 реализованных проектов — от небольших шкафов до полного интерьера
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#0e0a06] sticky top-16 z-30 border-b border-[#c9a96e]/10">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 font-golos text-xs tracking-[0.15em] uppercase px-5 py-2 transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-[#c9a96e] text-[#0e0a06]"
                    : "text-[#e8d5b0]/50 hover:text-[#c9a96e]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((work, i) => (
              <div
                key={work.id}
                className={`group relative overflow-hidden cursor-pointer ${
                  i % 5 === 0 ? "md:col-span-2" : ""
                }`}
                style={{ height: i % 5 === 0 ? "400px" : "300px" }}
                onClick={() => setSelected(work)}
              >
                <img
                  src={work.img}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a06]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e] block mb-2">
                    {work.category}
                  </span>
                  <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-1">{work.title}</h3>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1.5">
                      <Icon name="MapPin" size={11} className="text-[#c9a96e]/60" />
                      <span className="font-golos text-xs text-[#e8d5b0]/50">{work.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Maximize2" size={11} className="text-[#c9a96e]/60" />
                      <span className="font-golos text-xs text-[#e8d5b0]/50">{work.area}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#0e0a06]/60 border border-[#c9a96e]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="Expand" size={14} className="text-[#c9a96e]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-[#0e0a06]/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-[#e8d5b0]/50 hover:text-[#c9a96e] transition-colors"
              onClick={() => setSelected(null)}
            >
              <Icon name="X" size={24} />
            </button>
            <img src={selected.img} alt={selected.title} className="w-full max-h-[70vh] object-cover" />
            <div className="border border-[#c9a96e]/20 border-t-0 p-6 bg-[#0e0a06]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e] block mb-1">
                    {selected.category}
                  </span>
                  <h3 className="font-cormorant text-2xl text-[#e8d5b0]">{selected.title}</h3>
                </div>
                <div className="flex gap-6">
                  <div>
                    <div className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e]/60 mb-1">Локация</div>
                    <div className="font-golos text-sm text-[#e8d5b0]/70">{selected.location}</div>
                  </div>
                  <div>
                    <div className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e]/60 mb-1">Год</div>
                    <div className="font-golos text-sm text-[#e8d5b0]/70">{selected.year}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#080604] text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8d5b0] mb-6">
            Хотите такой же результат?
          </h2>
          <Link to="/calculator" className="btn-gold">
            Рассчитать проект
          </Link>
        </div>
      </section>
    </Layout>
  );
}

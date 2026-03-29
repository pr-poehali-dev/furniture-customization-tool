import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const IMG_KITCHEN_WALNUT = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/6b303acd-fdb4-4c7d-85f1-3b9a80af7c8d.jpg";
const IMG_KITCHEN_BEIGE_FLUTE = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/bucket/0e2b560d-1718-42eb-b022-b7e958a08722.jpg";
const IMG_KITCHEN_GRAY_WOOD = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/bucket/c3138424-3623-4349-8b5b-d570581669f4.jpg";
const IMG_KITCHEN_CREAM = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/bucket/8b2f2d09-3d93-4bd7-a996-35e785f89a8e.jpg";
const IMG_KITCHEN_WHITE_GLOSS = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/bucket/74b7bcad-ffc7-4e43-a3cf-08878d74fd11.jpg";
const IMG_WARDROBE_OAK = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/81ea9c87-b222-4c9e-851e-a677bee3768b.jpg";
const IMG_SHELVING = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/cafba108-ef00-4973-8d33-8aa9c06d7451.jpg";
const IMG_TABLE_OAK = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/f2cca7b2-9547-4032-bc01-c1c5db17a51c.jpg";
const IMG_OFFICE = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/3ea0243a-4604-4e7e-95d5-d38214c7bb5d.jpg";
const IMG_BATHROOM = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/b505ebea-ce7a-45e8-bd21-1d7d4093d944.jpg";

const filters = ["Все", "Кухни", "Шкафы", "Гостиные", "Кабинеты", "Столы", "Ванные"];

const works = [
  { id: 1, title: "Кухня из тёмного ореха", category: "Кухни", img: IMG_KITCHEN_WALNUT, location: "Рублёвское шоссе", year: "2024", area: "22 м²" },
  { id: 2, title: "Гардеробная в светлом дубе", category: "Шкафы", img: IMG_WARDROBE_OAK, location: "Санкт-Петербург", year: "2024", area: "12 м²" },
  { id: 3, title: "Стеллаж в гостиную", category: "Гостиные", img: IMG_SHELVING, location: "Пресня", year: "2024", area: "18 м²" },
  { id: 4, title: "Стол и стулья из дуба", category: "Столы", img: IMG_TABLE_OAK, location: "Подмосковье, Одинцово", year: "2024", area: "Индивидуально" },
  { id: 5, title: "Кабинет руководителя", category: "Кабинеты", img: IMG_OFFICE, location: "ММДЦ", year: "2023", area: "35 м²" },
  { id: 6, title: "Тумба в ванную White & Gold", category: "Ванные", img: IMG_BATHROOM, location: "Красная Поляна", year: "2024", area: "8 м²" },
  { id: 9, title: "Кухня бежевая с рифлёным фасадом", category: "Кухни", img: IMG_KITCHEN_BEIGE_FLUTE, location: "", year: "2025", area: "20 м²" },
  { id: 10, title: "Кухня серая с деревом", category: "Кухни", img: IMG_KITCHEN_GRAY_WOOD, location: "", year: "2025", area: "18 м²" },
  { id: 11, title: "Кухня кремовая с мраморным фартуком", category: "Кухни", img: IMG_KITCHEN_CREAM, location: "", year: "2025", area: "16 м²" },
  { id: 12, title: "Кухня белая глянцевая", category: "Кухни", img: IMG_KITCHEN_WHITE_GLOSS, location: "", year: "2025", area: "22 м²" },
  { id: 8, title: "Встроенный шкаф-купе", category: "Шкафы", img: IMG_WARDROBE_OAK, location: "Москва, Новая Рига", year: "2023", area: "16 м²" },
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
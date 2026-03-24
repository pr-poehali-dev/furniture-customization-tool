import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Furniture3DViewerProps {
  type?: string;
}

const furnitureScenes: Record<string, {
  title: string;
  views: { angle: string; label: string; img: string }[];
  colors: { id: string; label: string; hex: string; img: string }[];
}> = {
  kitchen: {
    title: "Кухонный гарнитур",
    views: [
      { angle: "front", label: "Спереди", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg" },
      { angle: "side", label: "Сбоку", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg" },
      { angle: "top", label: "Сверху", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg" },
    ],
    colors: [
      { id: "walnut", label: "Грецкий орех", hex: "#5C3D1E", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg" },
      { id: "white", label: "Белая эмаль", hex: "#F5F0EB", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg" },
      { id: "dark", label: "Тёмный дуб", hex: "#2A1A0E", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/940a4c0c-4aeb-4178-88db-274dee12d818.jpg" },
    ],
  },
  wardrobe: {
    title: "Шкаф-купе",
    views: [
      { angle: "front", label: "Спереди", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg" },
      { angle: "open", label: "Открытый", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg" },
    ],
    colors: [
      { id: "oak", label: "Натуральный дуб", hex: "#9B6B3A", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7cacd572-5b88-49ca-912c-3acf1474efcc.jpg" },
      { id: "mirror", label: "Зеркальный", hex: "#B8C4CC", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg" },
    ],
  },
  table: {
    title: "Стол из слэба",
    views: [
      { angle: "front", label: "Вид 1", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg" },
      { angle: "side", label: "Вид 2", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/86ec8339-1491-4b18-b054-ab0e77b7da6a.jpg" },
    ],
    colors: [
      { id: "walnut", label: "Грецкий орех", hex: "#5C3D1E", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/abca67fa-795b-4120-b5b2-4dd5c8ebf8e9.jpg" },
      { id: "elm", label: "Вяз", hex: "#8B6914", img: "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/940a4c0c-4aeb-4178-88db-274dee12d818.jpg" },
    ],
  },
};

const furnitureList = [
  { id: "kitchen", label: "Кухня", icon: "ChefHat" },
  { id: "wardrobe", label: "Шкаф", icon: "DoorOpen" },
  { id: "table", label: "Стол", icon: "Columns2" },
];

export default function Furniture3DViewer({ type }: Furniture3DViewerProps) {
  const [activeType, setActiveType] = useState(type ?? "kitchen");
  const [activeView, setActiveView] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [rotateAngle, setRotateAngle] = useState(0);

  const scene = furnitureScenes[activeType] ?? furnitureScenes["kitchen"];
  const currentView = scene.views[activeView];
  const currentColor = scene.colors[activeColor];

  const handleRotate = (dir: "left" | "right") => {
    setIsRotating(true);
    setRotateAngle((prev) => prev + (dir === "right" ? 90 : -90));
    const nextIdx = dir === "right"
      ? (activeView + 1) % scene.views.length
      : (activeView - 1 + scene.views.length) % scene.views.length;
    setTimeout(() => {
      setActiveView(nextIdx);
      setIsRotating(false);
    }, 400);
  };

  const handleTypeChange = (id: string) => {
    setActiveType(id);
    setActiveView(0);
    setActiveColor(0);
    setRotateAngle(0);
  };

  return (
    <div className="card-dark overflow-hidden">
      {/* Type selector */}
      <div className="flex border-b border-[#c9a96e]/15">
        {furnitureList.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => handleTypeChange(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 transition-all duration-300 ${
              activeType === id
                ? "bg-[#c9a96e]/10 border-b-2 border-[#c9a96e] text-[#c9a96e]"
                : "text-[#e8d5b0]/40 hover:text-[#e8d5b0]/70"
            }`}
          >
            <Icon name={icon} size={15} />
            <span className="font-golos text-xs tracking-widest uppercase">{label}</span>
          </button>
        ))}
      </div>

      {/* Viewer */}
      <div className="relative" style={{ height: "400px" }}>
        <img
          key={`${activeType}-${activeView}-${activeColor}`}
          src={currentColor.img}
          alt={scene.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isRotating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          style={{ transform: `perspective(800px) rotateY(${rotateAngle % 360 === 0 ? 0 : 2}deg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a06]/60 to-transparent" />

        {/* View label */}
        <div className="absolute top-4 left-4 bg-[#0e0a06]/70 border border-[#c9a96e]/25 px-3 py-1.5 backdrop-blur-sm">
          <span className="font-golos text-xs text-[#c9a96e]">{currentView?.label}</span>
        </div>

        {/* 3D badge */}
        <div className="absolute top-4 right-4 bg-[#c9a96e]/15 border border-[#c9a96e]/30 px-3 py-1.5">
          <span className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e]">3D Просмотр</span>
        </div>

        {/* Rotate buttons */}
        <button
          onClick={() => handleRotate("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0e0a06]/70 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/20 transition-all backdrop-blur-sm"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <button
          onClick={() => handleRotate("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0e0a06]/70 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e]/20 transition-all backdrop-blur-sm"
        >
          <Icon name="ChevronRight" size={18} />
        </button>

        {/* Rotate hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[#e8d5b0]/30">
          <Icon name="RotateCcw" size={11} />
          <span className="font-golos text-[10px]">Кликните стрелки для поворота</span>
        </div>
      </div>

      {/* Color selector */}
      <div className="p-6 border-t border-[#c9a96e]/15">
        <h4 className="font-golos text-[10px] tracking-[0.25em] uppercase text-[#c9a96e]/60 mb-4">
          Вариант отделки
        </h4>
        <div className="flex flex-wrap gap-3">
          {scene.colors.map(({ id, label, hex }, idx) => (
            <button
              key={id}
              onClick={() => setActiveColor(idx)}
              className={`flex items-center gap-2.5 px-3 py-2 border transition-all duration-300 ${
                activeColor === idx
                  ? "border-[#c9a96e] bg-[#c9a96e]/10"
                  : "border-[#c9a96e]/20 hover:border-[#c9a96e]/50"
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-white/10"
                style={{ backgroundColor: hex }}
              />
              <span className={`font-golos text-xs ${activeColor === idx ? "text-[#c9a96e]" : "text-[#e8d5b0]/50"}`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* View dots */}
        <div className="flex items-center gap-2 mt-5">
          <span className="font-golos text-[10px] text-[#e8d5b0]/30 mr-1">Ракурс:</span>
          {scene.views.map((v, idx) => (
            <button
              key={v.angle}
              onClick={() => setActiveView(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeView === idx ? "bg-[#c9a96e] w-6" : "bg-[#e8d5b0]/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

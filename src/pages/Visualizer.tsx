import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Furniture3DViewer from "@/components/Furniture3DViewer";
import Icon from "@/components/ui/icon";

export default function Visualizer() {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Визуализация
          </span>
          <h1 className="section-title mb-4">3D-просмотр мебели</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Рассмотрите мебель с разных сторон и выберите вариант отделки — до начала производства
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Furniture3DViewer />
            </div>
            <div className="space-y-6">
              <div className="card-dark p-6">
                <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-4">Как это работает</h3>
                <div className="space-y-4">
                  {[
                    { icon: "MousePointer", text: "Выберите тип мебели во вкладках сверху" },
                    { icon: "ChevronLeft", text: "Нажимайте стрелки для поворота модели" },
                    { icon: "Palette", text: "Меняйте варианты отделки и покрытий" },
                    { icon: "Eye", text: "Оцените результат перед заказом" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className="w-7 h-7 border border-[#c9a96e]/25 flex items-center justify-center shrink-0">
                        <Icon name={icon} size={13} className="text-[#c9a96e]" />
                      </div>
                      <p className="font-golos text-xs text-[#e8d5b0]/50 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-6">
                <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-3">
                  Нужна полная визуализация?
                </h3>
                <p className="font-golos text-sm text-[#e8d5b0]/45 mb-5 leading-relaxed">
                  Закажите фотореалистичный 3D-рендер вашего интерьера — увидите точный результат до производства
                </p>
                <div className="mb-4 p-3 bg-[#c9a96e]/5 border border-[#c9a96e]/15 flex items-center justify-between">
                  <span className="font-golos text-xs text-[#e8d5b0]/50">Стоимость рендера</span>
                  <span className="font-cormorant text-lg text-[#c9a96e]">от 8 000 ₽</span>
                </div>
                <Link to="/calculator" className="btn-gold w-full text-center block">
                  Заказать визуализацию
                </Link>
              </div>

              <div className="card-dark p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Phone" size={16} className="text-[#c9a96e]" />
                  <h3 className="font-cormorant text-lg text-[#e8d5b0]">Задать вопрос</h3>
                </div>
                <p className="font-golos text-xs text-[#e8d5b0]/45 mb-4">
                  Наш дизайнер поможет подобрать материалы и цвета под ваш интерьер
                </p>
                <Link to="/contacts" className="btn-outline-gold w-full text-center block">
                  Связаться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

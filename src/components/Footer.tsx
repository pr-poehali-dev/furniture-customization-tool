import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-[#080604] border-t border-[#c9a96e]/15">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex flex-col leading-none mb-6 inline-block">
              <span className="font-cormorant text-2xl font-light tracking-[0.15em] text-[#e8d5b0]">
                ARTES
              </span>
              <span className="font-golos text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mt-0.5">
                мебельная мастерская
              </span>
            </Link>
            <p className="text-sm text-[#e8d5b0]/50 leading-relaxed font-golos">
              Премиальная корпусная мебель ручной работы. Создаём пространство вашей мечты с 2010 года.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "Youtube", "Send"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/60 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
                >
                  <Icon name={icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-golos text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-6">
              Каталог
            </h4>
            <ul className="space-y-3">
              {[
                ["Кухни", "/catalog"],
                ["Шкафы-купе", "/catalog"],
                ["Детские комнаты", "/catalog"],
                ["Офисная мебель", "/catalog"],
                ["Обеденные столы", "/catalog"],
                ["Интерьерные лестницы", "/catalog"],
                ["Двери из массива", "/catalog"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm text-[#e8d5b0]/50 hover:text-[#c9a96e] transition-colors duration-300 font-golos"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-golos text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-6">
              Компания
            </h4>
            <ul className="space-y-3">
              {[
                ["О нас", "/about"],
                ["Портфолио", "/portfolio"],
                ["Услуги", "/services"],
                ["Блог", "/blog"],
                ["Вопросы и ответы", "/faq"],
                ["Калькулятор", "/calculator"],
                ["Контакты", "/contacts"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm text-[#e8d5b0]/50 hover:text-[#c9a96e] transition-colors duration-300 font-golos"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-golos text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-6">
              Контакты
            </h4>
            <ul className="space-y-4">
              {[
                { icon: "Phone", text: "+7 (995) 908-02-28" },
                { icon: "Mail", text: "info@artes-mebel.ru" },
                { icon: "MapPin", text: "Барнаул, ул. Мастеровая, 12" },
                { icon: "Clock", text: "Пн–Сб: 09:00–19:00" },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon name={icon} size={14} className="text-[#c9a96e] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#e8d5b0]/50 font-golos">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#e8d5b0]/30 font-golos tracking-widest">
            © 2024 ARTES. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#e8d5b0]/30 hover:text-[#c9a96e] transition-colors font-golos">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-xs text-[#e8d5b0]/30 hover:text-[#c9a96e] transition-colors font-golos">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
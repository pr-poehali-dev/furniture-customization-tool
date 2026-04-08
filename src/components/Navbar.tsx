import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "Портфолио", path: "/portfolio" },
  { label: "Услуги", path: "/services" },
  { label: "О компании", path: "/about" },
  { label: "Блог", path: "/blog" },
  { label: "Контакты", path: "/contacts" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0e0a06]/95 backdrop-blur-md border-b border-[#c9a96e]/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-cormorant text-2xl font-light tracking-[0.15em] text-[#e8d5b0] group-hover:text-[#c9a96e] transition-colors duration-300">
            ЭЛИУТ
          </span>
          <span className="font-golos text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mt-0.5">
            мебельная мастерская
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "!text-[#c9a96e]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/calculator" className="btn-gold text-xs py-2.5 px-6">
            Рассчитать стоимость
          </Link>
        </div>

        <button
          className="lg:hidden text-[#e8d5b0] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-[#0e0a06] border-l border-[#c9a96e]/20 z-50 flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c9a96e]/15">
          <span className="font-cormorant text-xl text-[#e8d5b0] tracking-widest">ЭЛИУТ</span>
          <button onClick={() => setMenuOpen(false)} className="text-[#e8d5b0]/60 hover:text-[#c9a96e] transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-golos text-sm tracking-widest uppercase px-3 py-3 transition-colors duration-200 border-b border-[#c9a96e]/10 ${
                location.pathname === item.path
                  ? "text-[#c9a96e]"
                  : "text-[#e8d5b0]/65 hover:text-[#c9a96e]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 pb-8">
          <Link to="/calculator" className="btn-gold text-center block" onClick={() => setMenuOpen(false)}>
            Рассчитать стоимость
          </Link>
        </div>
      </div>
    </header>
  );
}
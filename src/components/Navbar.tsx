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

      {menuOpen && (
        <div className="lg:hidden bg-[#0e0a06]/98 border-t border-[#c9a96e]/20 px-6 py-6">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link text-sm ${
                  location.pathname === item.path ? "!text-[#c9a96e]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/calculator" className="btn-gold text-center mt-2">
              Рассчитать стоимость
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
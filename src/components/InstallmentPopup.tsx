import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { formatPhone } from "@/utils/phoneFormat";

const InstallmentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem("installment_submitted");
    if (submitted) return;

    const firstTimer = setTimeout(() => setIsOpen(true), 4000);

    const interval = setInterval(() => {
      const alreadySubmitted = localStorage.getItem("installment_submitted");
      if (!alreadySubmitted) setIsOpen(true);
    }, 2 * 60 * 1000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await fetch("https://functions.poehali.dev/fdf20583-ac14-44a6-9474-c32a21b816a5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setSent(true);
    localStorage.setItem("installment_submitted", "1");
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button
        onClick={handleExpand}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#c9a96e] flex items-center justify-center shadow-2xl cursor-pointer group"
        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
      >
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(201,169,110,0.7), 0 4px 20px rgba(0,0,0,0.4); }
            50% { box-shadow: 0 0 0 10px rgba(201,169,110,0), 0 4px 20px rgba(0,0,0,0.4); }
          }
          @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.2) rotate(-10deg); }
            75% { transform: scale(0.9) rotate(10deg); }
          }
        `}</style>
        <Icon
          name="Percent"
          size={22}
          className="text-[#0e0a06]"
          style={{ animation: "sparkle 2s ease-in-out infinite" }}
        />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleMinimize}
      />
      <div className="relative z-10 w-full max-w-md rounded-sm bg-[#110d08] border border-[#c9a96e]/30 shadow-2xl overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, #c9a96e, #e8d5b0, #c9a96e)" }}
        />

        <div className="absolute top-4 right-4">
          <button
            onClick={handleMinimize}
            className="text-[#c9a96e]/60 hover:text-[#c9a96e] transition-colors"
            title="Свернуть"
          >
            <Icon name="Minus" size={18} />
          </button>
        </div>

        {!sent ? (
          <div className="p-8">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-full px-4 py-1.5 mb-4">
                <Icon name="Percent" size={14} className="text-[#c9a96e]" />
                <span className="text-[#c9a96e] text-xs font-golos tracking-widest uppercase">Специальное предложение</span>
              </div>
              <h2 className="font-cormorant text-3xl font-light text-[#e8d5b0] leading-tight mb-3">
                Вся мебель в рассрочку
              </h2>
              <div className="flex items-center justify-center gap-3 mb-3">
                {["0%", "0₽", "24 мес."].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="font-cormorant text-2xl font-semibold text-[#c9a96e]">{item}</div>
                    <div className="text-[10px] text-[#c9a96e]/60 uppercase tracking-wider">
                      {i === 0 ? "переплата" : i === 1 ? "первый взнос" : "срок"}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#e8d5b0]/60 text-sm font-golos">
                Оставьте контакты — менеджер свяжется и подберёт условия
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#1a1209] border border-[#c9a96e]/20 rounded-sm px-4 py-3 text-[#e8d5b0] placeholder-[#e8d5b0]/30 focus:outline-none focus:border-[#c9a96e]/60 text-sm font-golos transition-colors"
                />
                <p className="font-golos text-[10px] text-[#e8d5b0]/30 mt-1 px-1">Как к вам обращаться</p>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  maxLength={18}
                  required
                  className="w-full bg-[#1a1209] border border-[#c9a96e]/20 rounded-sm px-4 py-3 text-[#e8d5b0] placeholder-[#e8d5b0]/30 focus:outline-none focus:border-[#c9a96e]/60 text-sm font-golos transition-colors"
                />
                <p className="font-golos text-[10px] text-[#e8d5b0]/30 mt-1 px-1">Перезвоним и подберём условия</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-sm font-golos text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #c9a96e, #e8d5b0)", color: "#0e0a06" }}
              >
                {loading ? "Отправка..." : "Закрепить выгоду"}
              </button>
            </form>

            <p className="mt-3 text-center text-[#e8d5b0]/30 text-xs font-golos">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-[#c9a96e]" />
            </div>
            <h3 className="font-cormorant text-2xl text-[#e8d5b0] mb-2">Заявка принята!</h3>
            <p className="text-[#e8d5b0]/60 text-sm font-golos mb-6">
              Менеджер свяжется с вами в ближайшее время и расскажет об условиях рассрочки 0-0-24.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-2.5 border border-[#c9a96e]/30 rounded-sm text-[#c9a96e] text-sm font-golos tracking-wider hover:bg-[#c9a96e]/10 transition-colors"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallmentPopup;
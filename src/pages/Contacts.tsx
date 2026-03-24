import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 pb-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            Контакты
          </span>
          <h1 className="section-title mb-4">Свяжитесь с нами</h1>
          <p className="font-golos text-base text-[#e8d5b0]/55 max-w-xl">
            Консультация бесплатна — ответим в течение 30 минут в рабочее время
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <div className="space-y-8 mb-12">
                {[
                  { icon: "Phone", title: "Телефон", lines: ["+7 (999) 123-45-67", "+7 (999) 765-43-21"] },
                  { icon: "Mail", title: "Email", lines: ["info@artes-mebel.ru", "design@artes-mebel.ru"] },
                  { icon: "MapPin", title: "Адрес", lines: ["Москва, ул. Мастеровая, 12", "Пн–Сб: 09:00–19:00"] },
                  { icon: "Factory", title: "Производство", lines: ["Московская обл., Красногорск", "Ул. Промышленная, 5"] },
                ].map(({ icon, title, lines }) => (
                  <div key={title} className="flex gap-5">
                    <div className="w-11 h-11 border border-[#c9a96e]/30 flex items-center justify-center shrink-0">
                      <Icon name={icon} size={18} className="text-[#c9a96e]" />
                    </div>
                    <div>
                      <h3 className="font-golos text-xs tracking-[0.2em] uppercase text-[#c9a96e]/70 mb-1">{title}</h3>
                      {lines.map((l) => (
                        <p key={l} className="font-golos text-sm text-[#e8d5b0]/65">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider-gold mb-8" />

              <h3 className="font-golos text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-5">
                Социальные сети
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "Youtube", label: "YouTube" },
                  { icon: "Send", label: "Telegram" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center gap-2.5 px-4 py-3 border border-[#c9a96e]/25 hover:border-[#c9a96e] text-[#e8d5b0]/50 hover:text-[#c9a96e] transition-all duration-300"
                  >
                    <Icon name={icon} size={15} />
                    <span className="font-golos text-xs">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card-dark p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border border-[#c9a96e]/30 flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircle" size={28} className="text-[#c9a96e]" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-[#e8d5b0] mb-3">Сообщение отправлено</h3>
                  <p className="font-golos text-sm text-[#e8d5b0]/50">
                    Мы свяжемся с вами в течение 30 минут в рабочее время
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-cormorant text-2xl text-[#e8d5b0] mb-8">Напишите нам</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                          Имя *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Иван Иванов"
                          className="input-dark"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="input-dark"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.ru"
                        className="input-dark"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-golos text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]/60 block mb-2">
                        Сообщение
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Опишите ваш проект..."
                        className="input-dark resize-none"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full text-center">
                      Отправить сообщение
                    </button>
                    <p className="font-golos text-[10px] text-[#e8d5b0]/30 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-72 bg-[#080604] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon name="MapPin" size={40} className="text-[#c9a96e]/20 mx-auto mb-3" />
            <p className="font-golos text-sm text-[#e8d5b0]/20">Москва, ул. Мастеровая, 12</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwIiBzdHJva2U9InJnYmEoMjAxLDE2OSwxMTAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-50" />
      </section>
    </Layout>
  );
}

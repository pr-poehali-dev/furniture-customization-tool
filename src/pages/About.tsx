import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/878a09aa-723c-4f33-948a-4d8c22dcc672/files/7955e3dc-d27c-47ff-9e56-f4a2cd469bdc.jpg";

const team = [
  { name: "Александр Морозов", role: "Основатель & Главный дизайнер", exp: "18 лет опыта" },
  { name: "Екатерина Лебедева", role: "Ведущий дизайнер интерьеров", exp: "12 лет опыта" },
  { name: "Дмитрий Захаров", role: "Руководитель производства", exp: "15 лет опыта" },
  { name: "Ирина Соколова", role: "Менеджер проектов", exp: "9 лет опыта" },
];

const values = [
  { icon: "Gem", title: "Качество без компромиссов", desc: "Используем только проверенные материалы и применяем строгий контроль на каждом этапе производства" },
  { icon: "Heart", title: "Забота о клиенте", desc: "Слушаем, понимаем и воплощаем именно то, о чём вы мечтаете — без навязывания лишнего" },
  { icon: "Leaf", title: "Экологичность", desc: "Все материалы сертифицированы, мы заботимся о здоровье вашей семьи и природе" },
  { icon: "Handshake", title: "Честность", desc: "Фиксируем стоимость в договоре — никаких скрытых платежей и доплат" },
];

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0a06]/95 to-[#0e0a06]/70" />
        <div className="container mx-auto px-6 relative z-10">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
            О компании
          </span>
          <h1 className="section-title mb-6 max-w-2xl">
            14 лет создаём мебель, которую любят
          </h1>
          <p className="font-golos text-base text-[#e8d5b0]/65 max-w-xl leading-relaxed">
            ЭЛИУТ — мебельная мастерская премиум-класса. С 2010 года мы реализуем частные и коммерческие интерьеры по всей России, сохраняя ремесленный подход к каждому заказу.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
                Наша история
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl text-[#e8d5b0] font-light mb-6">
                От небольшой мастерской к лидеру рынка
              </h2>
              <div className="space-y-4 font-golos text-sm text-[#e8d5b0]/55 leading-relaxed">
                <p>
                  В 2010 году Александр Морозов открыл небольшую столярную мастерскую в Подмосковье. Начинали вдвоём, делали мебель на заказ для частных клиентов — строго по индивидуальным проектам, без готовых шаблонов.
                </p>
                <p>
                  Репутация росла быстро: клиенты рекомендовали нас друзьям. Сегодня ЭЛИУТ — это команда из 60+ мастеров, современный производственный цех площадью 2500 м² и более 2400 реализованных проектов.
                </p>
                <p>
                  Мы никогда не отходили от главного принципа: каждое изделие создаётся руками профессионала, с вниманием к деталям и уважением к материалу.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2010", label: "Год основания" },
                { value: "2 400+", label: "Проектов" },
                { value: "60+", label: "Мастеров" },
                { value: "2 500 м²", label: "Площадь цеха" },
              ].map(({ value, label }) => (
                <div key={label} className="card-dark p-8 text-center">
                  <div className="font-cormorant text-4xl text-[#c9a96e] mb-2">{value}</div>
                  <div className="font-golos text-xs text-[#e8d5b0]/45 tracking-wide uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#080604]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
              Наши принципы
            </span>
            <h2 className="section-title">Ценности компании</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="card-dark p-8 flex gap-6">
                <div className="w-12 h-12 border border-[#c9a96e]/30 flex items-center justify-center shrink-0">
                  <Icon name={icon} size={20} className="text-[#c9a96e]" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl text-[#e8d5b0] mb-2">{title}</h3>
                  <p className="font-golos text-sm text-[#e8d5b0]/50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#0e0a06]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-[#c9a96e] block mb-4">
              Команда
            </span>
            <h2 className="section-title">Люди за проектами</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, exp }) => (
              <div key={name} className="card-dark p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a96e]/20 to-[#c9a96e]/5 border border-[#c9a96e]/25 mx-auto mb-5 flex items-center justify-center">
                  <Icon name="User" size={28} className="text-[#c9a96e]/50" />
                </div>
                <h3 className="font-cormorant text-lg text-[#e8d5b0] mb-1">{name}</h3>
                <p className="font-golos text-xs text-[#e8d5b0]/45 mb-2">{role}</p>
                <span className="font-golos text-[10px] tracking-widest uppercase text-[#c9a96e]/60">{exp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080604] text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8d5b0] mb-6">
            Познакомимся лично?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts" className="btn-gold">Связаться с нами</Link>
            <Link to="/portfolio" className="btn-outline-gold">Смотреть работы</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
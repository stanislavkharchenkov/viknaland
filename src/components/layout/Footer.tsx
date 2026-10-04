import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container-vl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Колонка 1: Бренд у фірмовому стилі */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 select-none">
              <span className="text-2xl font-black tracking-wider text-[#FE5B36]">
                VIKNA<span className="text-white">LAND</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Провідний український завод-виробник металопластикових профільних систем, енергозберігаючих вікон та дверей європейського зразка.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#FE5B36] font-semibold">
              <span>Зроблено в Україні</span>
              <span className="text-slate-700">•</span>
              <span>ДСТУ Б В.2.6-15:2011</span>
              <span className="text-slate-700">•</span>
              <span>ISO 9001</span>
            </div>
          </div>

          {/* Колонка 2: Продукція */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Продукція
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#profiles" className="hover:text-white transition-colors">
                  Профіль Viknaland B58 (4 камери)
                </Link>
              </li>
              <li>
                <Link href="#profiles" className="hover:text-white transition-colors">
                  Профіль Viknaland B70 (6 камер)
                </Link>
              </li>
              <li>
                <Link href="#profiles" className="hover:text-white transition-colors">
                  Профіль Viknaland 85 (Passivhaus)
                </Link>
              </li>
              <li>
                <Link href="#configurator" className="hover:text-white transition-colors">
                  Балконні блоки та двері
                </Link>
              </li>
              <li>
                <Link href="#configurator" className="hover:text-white transition-colors">
                  Французьке скління лоджій
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Послуги */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Послуги заводу
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#evidnovlennya" className="text-[#FE5B36] font-semibold hover:text-[#ff6c47] transition-colors">
                  Програма «єВідновлення»
                </Link>
              </li>
              <li>
                <Link href="#advantages" className="hover:text-white transition-colors">
                  Безкоштовний лазерний замір
                </Link>
              </li>
              <li>
                <Link href="#advantages" className="hover:text-white transition-colors">
                  Теплий монтаж за ДСТУ
                </Link>
              </li>
              <li>
                <Link href="#advantages" className="hover:text-white transition-colors">
                  Доставка спецтранспортом
                </Link>
              </li>
              <li>
                <Link href="#configurator" className="hover:text-white transition-colors">
                  Розстрочка 0% без переплат
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакти */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Контакти заводу
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <a href="tel:0800303030" className="text-base font-black text-white hover:text-[#FE5B36] transition-colors block font-mono">
                  0 800 30 30 30
                </a>
                <span className="text-[10px] text-[#FE5B36] font-semibold">Безкоштовна гаряча лінія</span>
              </div>
              <div>
                <a href="mailto:info@viknaland-zavod.ua" className="hover:text-white transition-colors">
                  info@viknaland-zavod.ua
                </a>
              </div>
              <div className="text-slate-500 text-[11px] leading-relaxed">
                Київська обл., м. Бровари, вул. Незалежності, 24
              </div>
            </div>
          </div>
        </div>

        {/* Копірайт */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} VIKNALAND — Завод металопластикових віконних систем. Всі права захищено.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Політика конфіденційності</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Договір публічної оферти</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import { CheckIcon, ArrowRightIcon } from '@/components/ui/Icons';

export default function LeadCaptureSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [isEvidnovlennya, setIsEvidnovlennya] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          city,
          isEvidnovlennya,
          preferredContact: 'phone',
          configSummary: 'Заявка з нижньої форми сайту (Каталог + Замір)',
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-100/80 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="container-vl relative z-10">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto shadow-xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
                <span>(</span>
                <span>Заводська гарантія</span>
                <span>)</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900">
                Замовте безкоштовний замір та зафіксуйте знижку <span className="text-[#FE5B36]">-35%</span>
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Інженер приїде у зручний для вас час, проведе вимір високоточним лазером та запропонує 3 варіанти комплектації під ваш бюджет.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckIcon size={14} color="#FE5B36" />
                  <span>Виїзд безкоштовний по всій області</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckIcon size={14} color="#FE5B36" />
                  <span>Зразки профілів Viknaland та палітри Renolit з собою</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckIcon size={14} color="#FE5B36" />
                  <span>Робота за програмою «єВідновлення»</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {isSubmitted ? (
                <div className="p-8 bg-orange-50 border border-[#FE5B36]/30 rounded-2xl text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FE5B36]/15 flex items-center justify-center text-[#FE5B36] mb-3">
                    <CheckIcon size={24} color="#FE5B36" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Заявку прийнято!</h3>
                  <p className="text-xs text-slate-600">
                    Менеджер зателефонує вам протягом 5 хвилин для узгодження часу приїзду інженера.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ваше імʼя
                    </label>
                    <input
                      type="text"
                      placeholder="Олександр"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5B36] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Номер телефону *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (__) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5B36] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Населений пункт
                    </label>
                    <input
                      type="text"
                      placeholder="Київ / область"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5B36] text-sm"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={isEvidnovlennya}
                      onChange={(e) => setIsEvidnovlennya(e.target.checked)}
                      className="w-4 h-4 rounded text-[#FE5B36] focus:ring-[#FE5B36]"
                    />
                    <span className="text-xs text-slate-700">
                      Потрібна оплата за програмою «єВідновлення»
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#FE5B36] hover:bg-[#ff6c47] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FE5B36]/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Викликати замірника безкоштовно</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Натискаючи кнопку, ви даєте згоду на обробку персональних даних.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

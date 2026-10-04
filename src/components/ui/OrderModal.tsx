'use client';

import { useState } from 'react';
import { CalculatedPrice, CalculatorOptions } from '@/types/viknaland';
import { CheckIcon, CloseIcon, ArrowRightIcon } from '@/components/ui/Icons';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorState?: {
    options: CalculatorOptions;
    price: CalculatedPrice;
  };
  title?: string;
  subtitle?: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  calculatorState,
  title = 'Безкоштовний виїзд інженера-замірника',
  subtitle = 'Зафіксуйте заводську знижку -30% та отримайте точний кошторис у 3 варіантах бюджету',
}: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'telegram' | 'viber'>('phone');
  const [isEvidnovlennya, setIsEvidnovlennya] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name,
        phone,
        city,
        preferredContact,
        isEvidnovlennya,
        estimatedPrice: calculatorState?.price?.discountedPrice,
        configSummary: calculatorState
          ? `${calculatorState.options.windowType}, ${calculatorState.options.width}x${calculatorState.options.height}мм, Профіль: ${calculatorState.options.profile}, Скло: ${calculatorState.options.glass}, Колір: ${calculatorState.options.lamination}`
          : 'Пряма заявка з сайту',
      };

      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-slate-900">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Закрити"
        >
          <CloseIcon size={14} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-orange-50 text-[#FE5B36] border border-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon size={28} color="#FE5B36" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Дякуємо, заявку прийнято!
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              Менеджер заводу зателефонує вам протягом 5 хвилин для узгодження зручного часу заміру та фіксації знижки.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-3.5 bg-[#FE5B36] hover:bg-[#ff6c47] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-[#FE5B36]/25 cursor-pointer"
            >
              Зрозуміло
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#FE5B36] text-white text-[10px] font-black uppercase tracking-wider rounded-full mb-2">
                Заводська акція -30%
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {title}
              </h3>
              <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
            </div>

            {calculatorState && (
              <div className="bg-slate-50 rounded-2xl p-3.5 mb-5 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Конфігурація:</span>
                  <span className="font-semibold text-slate-900">
                    {calculatorState.options.width} × {calculatorState.options.height} мм
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-slate-500">Ціна зі знижкою:</span>
                  <span className="text-lg font-black text-[#FE5B36] font-mono">
                    {calculatorState.price.discountedPrice.toLocaleString('uk-UA')} грн
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ваше імʼя *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Олександр"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5B36] text-sm"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5B36] text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Місто / Населений пункт
                </label>
                <input
                  type="text"
                  placeholder="Київ та область"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5B36] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Зручний спосіб звʼязку:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'phone', label: 'Дзвінок' },
                    { id: 'telegram', label: 'Telegram' },
                    { id: 'viber', label: 'Viber' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferredContact(item.id as any)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        preferredContact === item.id
                          ? 'border-[#FE5B36] bg-orange-50 text-[#FE5B36] font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Працюємо за програмою єВідновлення */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEvidnovlennya}
                  onChange={(e) => setIsEvidnovlennya(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#FE5B36] focus:ring-[#FE5B36]"
                />
                <span className="text-xs text-slate-700 leading-tight">
                  <strong className="text-slate-900">Оплата карткою «єВідновлення»</strong>. 
                  Надаємо повний комплект фіскальних чеків та актів для державної компенсації.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FE5B36] hover:bg-[#ff6c47] active:scale-[0.99] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FE5B36]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Відправляємо...</span>
                ) : (
                  <>
                    <span>Викликати замірника безкоштовно</span>
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Ваші дані захищені. Замірник приїде з реальними зразками профілів Viknaland.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

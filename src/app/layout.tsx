import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Металопластикові вікна VIKNALAND від заводу | Онлайн-калькулятор | Знижка -35%',
  description:
    'Купити пластикові вікна VIKNALAND від виробника без націнок. Інтерактивний калькулятор цін, німецька фурнітура, безкоштовний замір, програма «єВідновлення», монтаж за ДСТУ з гарантією 10 років.',
  keywords: [
    'вікна viknaland',
    'пластикові вікна від заводу',
    'калькулятор вікон',
    'євідновлення вікна',
    'металопластикові вікна ціна',
    'купити вікна київ',
    'теплий монтаж вікон',
  ],
  openGraph: {
    title: 'Металопластикові вікна VIKNALAND від заводу-виробника',
    description: 'Енергоефективні вікна зі знижкою до -35% + теплий склопакет у подарунок. Безкоштовний замір по всій області.',
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-600 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

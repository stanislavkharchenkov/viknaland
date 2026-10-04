import HeroSection from '@/components/sections/HeroSection';
import WindowProfile3DViewer from '@/components/calculator/WindowProfile3DViewer';
import WindowConfigurator from '@/components/calculator/WindowConfigurator';
import TechHubSection from '@/components/sections/TechHubSection';
import ProfilesSection from '@/components/sections/ProfilesSection';
import BlogArticleSection from '@/components/sections/BlogArticleSection';
import EvidnovlennyaSection from '@/components/sections/EvidnovlennyaSection';
import AdvantageSection from '@/components/sections/AdvantageSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import FaqSection from '@/components/sections/FaqSection';
import LeadCaptureSection from '@/components/sections/LeadCaptureSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Головний екран у фірмовому стилі Aurocraft */}
      <HeroSection />

      {/* 2. Інтерактивний 3D-розріз кута профілю на Three.js */}
      <section id="view3d" className="py-16 sm:py-20 bg-slate-50 relative border-b border-slate-200/80">
        <div className="container-vl">
          <WindowProfile3DViewer />
        </div>
      </section>

      {/* 3. Інтерактивний Конструктор-Калькулятор вікон */}
      <WindowConfigurator />

      {/* 4. Інженерно-технологічний хаб: склопакети, фурнітура, ДСТУ монтаж, ПВХ */}
      <TechHubSection />

      {/* 5. Модельний ряд профілів VIKNALAND (B58, B70, 85) */}
      <ProfilesSection />

      {/* 6. Експертний блог: будова, склад та конструкція пластикових вікон */}
      <BlogArticleSection />

      {/* 7. Програма державної допомоги «єВідновлення» */}
      <EvidnovlennyaSection />

      {/* 8. Чому замовляють напряму у заводу (переваги) */}
      <AdvantageSection />

      {/* 7. Реалізовані обʼєкти та ціни під ключ */}
      <PortfolioSection />

      {/* 8. Схема роботи: від заміру до прибирання сміття */}
      <ProcessSection />

      {/* 9. Часті питання (FAQ) */}
      <FaqSection />

      {/* 10. Фінальний лід-магніт з викликом замірника */}
      <LeadCaptureSection />
    </>
  );
}

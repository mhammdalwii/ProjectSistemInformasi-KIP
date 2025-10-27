// Lokasi: app/page.tsx

// 2. ATOMIC DESIGN (Pages):
// Halaman ini adalah level "Pages".
// Tugasnya hanya mengimpor dan menyusun "Organisms".

import Header from "@/components/organisms/Header";
import HeroSection from "@/components/organisms/HeroSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection";
import CtaSection from "@/components/organisms/CtaSection";
import Footer from "@/components/organisms/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

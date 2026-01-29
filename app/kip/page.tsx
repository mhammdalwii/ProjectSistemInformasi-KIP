import LandingFeatures from "@/components/organisms/landing/LandingFeatures";
import LandingFooter from "@/components/organisms/landing/LandingFooter";
import LandingHeader from "@/components/organisms/landing/LandingHeader";
import LandingHero from "@/components/organisms/landing/LandingHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistem Pendataan KIP - SMP Negeri 2 Pamboang",
  description: "Platform pendaftaran mandiri dan verifikasi berkas KIP untuk siswa SMP Negeri 2 Pamboang.",
  keywords: ["KIP", "SMP Negeri 2 Pamboang", "Pendataan Siswa", "Daftar KIP", "Bantuan Pendidikan"],
  openGraph: {
    title: "Sistem Pendataan KIP - SMP Negeri 2 Pamboang",
    description: "Daftarkan akun Anda, lengkapi berkas, dan ajukan verifikasi KIP.",
    type: "website",
  },
};
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <LandingHeader />
      <main className="grow">
        <LandingHero />
        <LandingFeatures />
      </main>
      <LandingFooter />
    </div>
  );
}

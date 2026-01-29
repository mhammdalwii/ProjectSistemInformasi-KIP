import SchoolNavbar from "@/components/organisms/school/SchoolNavbar";
import SchoolHero from "@/components/organisms/school/SchoolHero";
import SchoolServices from "@/components/organisms/school/SchoolServices";
import LandingFooter from "@/components/organisms/landing/LandingFooter";
import { Metadata } from "next";
import SchoolVision from "@/components/organisms/school/SchoolVision";
import SchoolStats from "@/components/organisms/school/SchoolStats";
import SchoolContact from "@/components/organisms/school/SchoolContact";

export const metadata: Metadata = {
  title: "SMP Negeri 2 Pamboang - Website Resmi",
  description: "Mewujudkan generasi cerdas dan berakhlak mulia.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <SchoolNavbar />

      <main>
        <SchoolHero />
        <SchoolStats />
        <SchoolVision />
        <SchoolServices />
        <SchoolContact />
      </main>
      <LandingFooter />
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingHero() {
  return (
    <section
      className="py-20 text-center sm:py-32 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0,0,0,0.5)", // Warna gelap untuk overlay
      }}
    >
      {/* --- Overlay untuk teks agar mudah dibaca (opsional, tapi disarankan) --- */}
      {/* Jika Anda menambahkan `backgroundBlendMode` di `style`, Anda tidak perlu div overlay ini */}
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      {/* ------------------------------------------------------------------------- */}

      <div className="container mx-auto max-w-3xl px-4 relative z-10">
        {" "}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl"> Platform Pendaftaran KIP</h1>
        <p className="mt-6 text-lg leading-8 text-gray-200"> Daftarkan akun Anda, lengkapi berkas, dan ajukan verifikasi KIP untuk SMP Negeri 2 Pamboang secara mandiri dan online.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/register">Daftar Akun Siswa</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Login Pengguna</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function SchoolContact() {
  return (
    <section id="kontak" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">Hubungi Kami</h2>
          <p className="text-gray-500 dark:text-gray-400">Kami siap melayani pertanyaan dan kebutuhan informasi Anda.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* --- KOLOM KIRI: INFORMASI --- */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Alamat Sekolah</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Jl. Poros Majene - Mamuju Km. 12
                  <br />
                  Kecamatan Pamboang, Kabupaten Majene
                  <br />
                  Sulawesi Barat, 91451
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Telepon / WhatsApp</h3>
                <p className="text-gray-600 dark:text-gray-400">+62 812-3456-7890 (Tata Usaha)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Email Resmi</h3>
                <p className="text-gray-600 dark:text-gray-400">admin@smpn2pamboang.sch.id</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Jam Operasional</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Senin - Kamis: 07:00 - 14:00 WITA
                  <br />
                  Jumat - Sabtu: 07:00 - 11:30 WITA
                </p>
              </div>
            </div>
          </div>

          {/* --- KOLOM KANAN: GOOGLE MAPS --- */}
          <div className="overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 h-[400px]">
            {/* Ganti src di bawah dengan Embed Map asli dari Google Maps untuk SMPN 2 Pamboang */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.629342730623!2d118.94828357364653!3d-3.567825542846985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d93708a28e9327d%3A0x6a0c5c4e72392b45!2sSMP%20Negeri%202%20Pamboang!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

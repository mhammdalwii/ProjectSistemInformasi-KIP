import { Users, UserCheck, GraduationCap, Building2 } from "lucide-react";

const stats = [
  {
    label: "Total Siswa",
    value: "450+",
    icon: Users,
  },
  {
    label: "Guru Bersertifikasi",
    value: "32",
    icon: UserCheck,
  },
  {
    label: "Tenaga Kependidikan",
    value: "8",
    icon: Building2,
  },
  {
    label: "Alumni Sukses",
    value: "1000+",
    icon: GraduationCap,
  },
];

export default function SchoolStats() {
  return (
    <section className="bg-blue-400 py-16 dark:bg-blue-900 ">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-blue-100 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

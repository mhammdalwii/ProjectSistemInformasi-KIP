// Lokasi: app/dashboard/layout.tsx

import { headers } from "next/headers";
import ClientDashboardLayout from "./ClientLayout";

export const dynamic = "force-dynamic";

export default async function DashboardServerLayout({ children }: { children: React.ReactNode }) {
  await headers();

  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}

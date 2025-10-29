import { LoadingSpinner } from "./components/LoadingSpinner";
// saat 'page.tsx' (atau 'children' di layout) sedang mengambil data
export default function DashboardLoading() {
  return (
    <LoadingSpinner
      text="Sedang memuat halaman..."
      fullScreen={false} // 'false' agar tidak menutupi sidebar
    />
  );
}

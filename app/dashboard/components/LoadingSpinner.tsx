import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ text = "Memuat data...", fullScreen = true }: LoadingSpinnerProps) {
  const containerClasses = fullScreen ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm" : "flex flex-col items-center justify-center py-20";

  return (
    <div className={containerClasses}>
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-lg text-gray-700">{text}</p>
    </div>
  );
}

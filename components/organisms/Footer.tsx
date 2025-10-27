export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} SMP Negeri 2 Pamboang</p>
          <p className="mt-2 text-sm text-gray-500 sm:mt-0">Sistem Informasi Pendataan KIP</p>
        </div>
      </div>
    </footer>
  );
}

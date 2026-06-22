export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 md:flex-row lg:px-8">
        <p>&copy; {new Date().getFullYear()} Product Catalog</p>
        <p>Built with care</p>
      </div>
    </footer>
  );
}

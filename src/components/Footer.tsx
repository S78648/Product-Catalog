const socialItems = ['LinkedIn', 'GitHub', 'X'];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-gray-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} Product Catalog. All rights
          reserved.
        </p>

        <nav aria-label="Social media">
          <ul className="flex flex-wrap items-center gap-3">
            {socialItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="rounded-md px-2 py-1 font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-950"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

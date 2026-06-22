export function ContactPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Contact Us
      </h1>
      <p className="mt-1.5 text-sm text-gray-500">Get in touch with us</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Email
          </p>
          <p className="mt-2 text-sm font-medium text-gray-900">
            support@productcatalog.com
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Phone
          </p>
          <p className="mt-2 text-sm font-medium text-gray-900">
            +91 98765 43210
          </p>
        </div>
        <div className="card p-5 sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Address
          </p>
          <p className="mt-2 text-sm font-medium text-gray-900">
            123 Business Park, Main Street,
            <br />
            New Delhi - 110001, India
          </p>
        </div>
      </div>
    </section>
  );
}

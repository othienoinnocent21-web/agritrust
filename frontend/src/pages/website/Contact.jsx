import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-text mb-6">Contact Us</h1>
        <p className="text-muted">
          Have questions? Reach out to our support team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text">Talk to Support</h3>
              </div>
            </div>
            <p className="text-sm text-muted mt-3">
              Direct support phone line. Mon-Fri from 8am to 6pm.
            </p>
            <a
              href="tel:+256700000000"
              className="inline-block mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              +256 700 000 000
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text">Email Us</h3>
              </div>
            </div>
            <p className="text-sm text-muted mt-3">
              General Inquiries:{" "}
              <a
                href="mailto:support@agritrust.com"
                className="text-emerald-700 hover:underline"
              >
                support@agritrust.com
              </a>
              <br />
              Bulk Trading / Partnerships:{" "}
              <a
                href="mailto:trade@agritrust.com"
                className="text-emerald-700 hover:underline"
              >
                trade@agritrust.com
              </a>
            </p>
            <a
              href="mailto:support@agritrust.com"
              className="inline-block mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              Send an email
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text">Visit Our Main Hub</h3>
              </div>
            </div>
            <p className="text-sm text-muted mt-3">
              Plot 42, Jinja Road, Kampala, Uganda.
            </p>
            <a
              href="https://www.google.com/maps?q=Plot+42+Jinja+Road+Kampala+Uganda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
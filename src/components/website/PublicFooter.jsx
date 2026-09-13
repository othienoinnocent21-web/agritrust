import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import { ArrowRight, Globe, Mail, MessageCircle } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", to: ROUTES.ABOUT },
      { label: "How It Works", to: ROUTES.HOW_IT_WORKS },
      { label: "Marketplace", to: ROUTES.MARKETPLACE },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: ROUTES.CONTACT },
      { label: "FAQ", to: ROUTES.FAQ },
      { label: "Privacy", to: ROUTES.PRIVACY },
      { label: "Terms", to: ROUTES.TERMS },
    ],
  },
];

const PublicFooter = () => {
  return (
    <footer className="bg-slate-950 text-gray-200">
      <div className="container mx-auto px-4 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_0.7fr_0.7fr_1.4fr]">
          <div>
            <Link to={ROUTES.HOME} className="mb-5 flex items-center gap-3"><img src="/favicon.svg" alt="AgriTrust logo" className="h-10 w-10" /><span className="text-xl font-bold text-white">Agri<span className="text-emerald-400">Trust</span></span></Link>
            <p className="max-w-xs text-sm leading-6 text-gray-400">
              Connecting farmers and buyers through transparent, fair trade.
            </p>
            <div className="mt-6 flex gap-2"><a href="https://www.linkedin.com" aria-label="Professional network" className="rounded-full bg-white/10 p-2.5 text-gray-300 transition-colors hover:bg-emerald-500 hover:text-white"><Globe className="h-4 w-4" /></a><a href="https://www.instagram.com" aria-label="Community updates" className="rounded-full bg-white/10 p-2.5 text-gray-300 transition-colors hover:bg-emerald-500 hover:text-white"><MessageCircle className="h-4 w-4" /></a><a href="mailto:hello@agritrust.com" aria-label="Email AgriTrust" className="rounded-full bg-white/10 p-2.5 text-gray-300 transition-colors hover:bg-emerald-500 hover:text-white"><Mail className="h-4 w-4" /></a></div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition-colors hover:text-emerald-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Stay in the loop</h4>
            <p className="mb-4 text-sm leading-6 text-gray-400">Get market insights and fresh updates in your inbox.</p>
            <form className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5" onSubmit={(event) => event.preventDefault()}>
              <input type="email" required placeholder="Your email address" aria-label="Email address" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500" />
              <button type="submit" aria-label="Subscribe to newsletter" className="m-1 rounded-lg bg-emerald-500 px-3 text-white transition-colors hover:bg-emerald-400"><ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AgriTrust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

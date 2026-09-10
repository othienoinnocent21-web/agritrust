import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

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
    <footer className="bg-dark-green text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-light-gold mb-4">AgriTrust</h3>
            <p className="text-sm text-gray-400">
              Connecting farmers and buyers through transparent, fair trade.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AgriTrust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

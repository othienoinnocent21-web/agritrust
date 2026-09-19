import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../common/Button";
import { ROUTES } from "../../constants";

const navLinks = [
  { label: "Home", to: ROUTES.HOME },
  { label: "About", to: ROUTES.ABOUT },
  { label: "How It Works", to: ROUTES.HOW_IT_WORKS },
  { label: "Marketplace", to: ROUTES.MARKETPLACE },
  { label: "Contact", to: ROUTES.CONTACT },
];

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
            <img src="/favicon.svg" alt="AgriTrust logo" className="w-10 h-10 transition-transform group-hover:rotate-6" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Agri<span className="text-primary">Trust</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted hover:text-text"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" to={ROUTES.LOGIN}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" to={ROUTES.REGISTER}>
              Get Started
            </Button>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium ${
                    isActive ? "text-primary" : "text-muted hover:text-text"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;

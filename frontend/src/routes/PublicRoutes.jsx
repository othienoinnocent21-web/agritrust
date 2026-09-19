import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";

const Home = lazy(() => import("../pages/website/Home"));
const About = lazy(() => import("../pages/website/About"));
const HowItWorks = lazy(() => import("../pages/website/HowItWorks"));
const Marketplace = lazy(() => import("../pages/website/Marketplace"));
const Contact = lazy(() => import("../pages/website/Contact"));
const FAQ = lazy(() => import("../pages/website/FAQ"));
const Privacy = lazy(() => import("../pages/website/Privacy"));
const Terms = lazy(() => import("../pages/website/Terms"));

export const publicRoutes = [
  <Route key="home" index element={<Home />} />,
  <Route key="about" path={ROUTES.ABOUT} element={<About />} />,
  <Route key="how-it-works" path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />,
  <Route key="marketplace" path={ROUTES.MARKETPLACE} element={<Marketplace />} />,
  <Route key="contact" path={ROUTES.CONTACT} element={<Contact />} />,
  <Route key="faq" path={ROUTES.FAQ} element={<FAQ />} />,
  <Route key="privacy" path={ROUTES.PRIVACY} element={<Privacy />} />,
  <Route key="terms" path={ROUTES.TERMS} element={<Terms />} />,
];

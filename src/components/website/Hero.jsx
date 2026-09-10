import Button from "../common/Button";
import { ROUTES } from "../../constants";

const Hero = ({
  title = "Fair Prices for Farmers, Fresh Produce for Buyers",
  subtitle = "AgriTrust connects farmers directly with buyers, ensuring fair compensation and quality produce through escrow-based transactions.",
  primaryActionLabel = "Get Started",
  primaryActionPath = ROUTES.REGISTER,
  secondaryActionLabel = "Learn More",
  secondaryActionPath = ROUTES.HOW_IT_WORKS,
}) => {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-light-green py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
          {title}
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" to={primaryActionPath}>
            {primaryActionLabel}
          </Button>
          <Button variant="outline" size="lg" to={secondaryActionPath}>
            {secondaryActionLabel}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

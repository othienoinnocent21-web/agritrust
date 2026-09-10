import Hero from "../../components/website/Hero";
import FeatureCard from "../../components/website/FeatureCard";
import TestimonialCard from "../../components/website/TestimonialCard";
import { Shield, Truck, Users, BarChart2 } from "lucide-react";
import { mockProducts } from "../../data/mock/products";

const Home = () => {
  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text mb-2">
            Why Choose AgriTrust
          </h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            We connect farmers and buyers through a secure, transparent platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard
              title="Secure Escrow"
              description="Payments held safely until delivery confirmation."
              icon={Shield}
            />
            <FeatureCard
              title="Fast Delivery"
              description="Direct shipping from farm to table."
              icon={Truck}
            />
            <FeatureCard
              title="Trusted Network"
              description="Verified farmers and buyers only."
              icon={Users}
            />
            <FeatureCard
              title="Fair Prices"
              description="No middlemen, fair pricing for everyone."
              icon={BarChart2}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-text mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div key={product.id} className="text-center">
                <p className="font-medium text-text">{product.title}</p>
                <p className="text-sm text-muted">
                  ${product.price}/{product.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-text mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Johnson"
              role="Farmer"
              rating={5}
              comment="AgriTrust has transformed how I sell my produce."
            />
            <TestimonialCard
              name="Mikel Surname"
              role="Buyer"
              rating={4.5}
              comment="Finally, a marketplace I can trust for fresh produce."
            />
            <TestimonialCard
              name="Robert Wilson"
              role="Farmer"
              rating={5}
              comment="The escrow system gives me peace of mind."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

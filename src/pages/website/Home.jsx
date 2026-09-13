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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
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

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-text mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

      <section className="bg-gradient-to-b from-white to-emerald-50/40 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-text">
            What Our Users Say
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-muted">Real stories from the people building a fairer food system.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <TestimonialCard
              name="Sarah Johnson"
              role="Farmer"
              rating={5}
              comment="AgriTrust has transformed how I sell my produce."
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85"
            />
            <TestimonialCard
              name="Mikel Surname"
              role="Buyer"
              rating={4.5}
              comment="Finally, a marketplace I can trust for fresh produce."
              avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85"
            />
            <TestimonialCard
              name="Robert Wilson"
              role="Farmer"
              rating={5}
              comment="The escrow system gives me peace of mind."
              avatar="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=85"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

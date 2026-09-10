const About = () => {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-text mb-6">About AgriTrust</h1>
        <p className="text-muted mb-4">
          AgriTrust is a peer-to-peer agricultural marketplace connecting
          farmers directly with buyers.
        </p>
        <div className="prose max-w-3xl">
          <p>
            Our platform uses escrow-based transactions to ensure fair pricing
            and secure payments for all parties involved.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;

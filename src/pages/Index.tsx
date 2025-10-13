
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuoteForm } from "@/components/QuoteForm";
import { Services } from "@/components/Services";
import { Features } from "@/components/Features";
import { Testimonial } from "@/components/Testimonial";
import { Partners } from "@/components/Partners";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* QuoteForm para mobile */}
      <div className="block lg:hidden">
        <QuoteForm />
      </div>
      <Services />
      <Features />
      <Partners />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Index;

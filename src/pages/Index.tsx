
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Features } from "@/components/Features";
import { Routes } from "@/components/Routes";
import { Testimonial } from "@/components/Testimonial";
import { Partners } from "@/components/Partners";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Routes />
      <Testimonial />
      <Partners />
      <Footer />
    </div>
  );
};

export default Index;

import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Stake from "@/components/Stake";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Stake />
      <Footer />
    </div>
  );
}

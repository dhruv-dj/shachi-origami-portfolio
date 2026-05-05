import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ExhibitionCarousel from "./components/ExhibitionCarousel";
import PortfolioGrid from "./components/PortfolioGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* Gallery before shop so nav order matches scroll order */}
        <PortfolioGrid />
        <ExhibitionCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

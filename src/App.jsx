import { useState, useEffect } from "react";
import "./App.css";
import { ContentProvider } from "./context/ContentContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ExhibitionCarousel from "./components/ExhibitionCarousel";
import PortfolioGrid from "./components/PortfolioGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPanel from "./components/admin/AdminPanel";

function isAdminHash() {
  return window.location.hash === '#admin';
}

function MainSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioGrid />
        <ExhibitionCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('shachiAdminAuthed') === '1');

  function handleLogin() {
    sessionStorage.setItem('shachiAdminAuthed', '1');
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem('shachiAdminAuthed');
    setAuthed(false);
  }

  if (!authed) return <AdminLogin onSuccess={handleLogin} />;
  return <AdminPanel onLogout={handleLogout} />;
}

export default function App() {
  const [showAdmin, setShowAdmin] = useState(isAdminHash);

  useEffect(() => {
    function onHashChange() {
      setShowAdmin(isAdminHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <ContentProvider>
      {showAdmin ? <AdminApp /> : <MainSite />}
    </ContentProvider>
  );
}

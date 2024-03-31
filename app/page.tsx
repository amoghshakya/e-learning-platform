"use client";

import FeaturedCategories from "@/components/ui/landing/FeaturedCategories";
import Footer from "@/components/ui/landing/Footer";
import Hero from "@/components/ui/landing/Hero";
import NavBar from "@/components/ui/landing/Navbar";
import AboutSection from "@/components/ui/landing/about";

export default function Home() {
  return (
    <>
      <NavBar showLinks={true} />
      <Hero />
      <FeaturedCategories />
      <AboutSection />
      <Footer />
    </>
  );
}

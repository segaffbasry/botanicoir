import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { News } from "@/components/home/News";
import { Products } from "@/components/home/Products";
import { Stories } from "@/components/home/Stories";
import { Sustainable } from "@/components/home/Sustainable";
import { Years } from "@/components/home/Years";

/* botanicoir.com's homepage in a new skin, after farmminerals.com. Every live block is here: the slider (as the four
   stories), the introduction, 20 years with its film, Our Story, Our Products, contact, newsletter, certifications and
   footer. Inner pages add the milestones, the Beyond Sustainable figures and the newest news. Each section has one
   fixed ground (no scroll recolouring). Copy: lib/content.ts. Systems: README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <Preloader />
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Intro />
        <Stories />
        <Products />
        <Years />
        <Sustainable />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

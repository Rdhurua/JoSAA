'use client';

import  Contact  from './Components/Contact';
import About from './Components/About';
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import HowItWorks from './Components/HowItWorks';
import OurExpert from './Components/OurExper';
import FAQSection from './Components/Faq';


export default function Home() {
  return (<div>

    <main className="min-h-screen">
     <Banner/>
      <About />
       <HowItWorks/>
       <OurExpert/>
       <FAQSection/>
      <Contact/>
    </main>

    <Footer/>
  </div>
  );
}

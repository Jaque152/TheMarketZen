import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Plans } from "@/components/sections/plans";
import { WhyUs } from "@/components/sections/why-us";
import { Objectives } from "@/components/sections/objectives";
import { ContactInfo } from "@/components/sections/contact-info";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Plans />
      <WhyUs />
      <Objectives />
      <ContactInfo />
    </>
  );
}

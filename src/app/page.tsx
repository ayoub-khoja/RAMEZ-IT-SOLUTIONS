import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Technologies } from "@/components/sections/technologies";
import { CallToAction } from "@/components/sections/call-to-action";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Technologies />
      <CallToAction />
      <Contact />
    </>
  );
}

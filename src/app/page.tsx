import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { ClientsStrip } from "@/components/sections/clients-strip";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Technologies } from "@/components/sections/technologies";
import { CallToAction } from "@/components/sections/call-to-action";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <ClientsStrip />
      <Portfolio />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Technologies />
      <CallToAction />
      <Contact />
    </>
  );
}

import Menue from "@/components/Menues/Menue";
import Hero from "@/components/Hero/hero";
import Sideimg from "@/components/smallitems/Sideimg";
import About from "@/components/About/About";
import Contactus from "@/components/contact-us/Contactus";

export const metadata = {
  title: "HomePage|Food order App",
  description: "|Food order App",
};
export default function Home() {

  return (
   <>
    <Hero/>
    <Sideimg/>
    <Menue/>
    <About/>
    <Contactus/>
   </>
  );
}

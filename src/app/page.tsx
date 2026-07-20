import Banner from "@/components/Bannar";
import FeaturedServices from "@/components/FeaturedSection";
import HowItWorks from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategory";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <PopularCategories></PopularCategories>
      <HowItWorks></HowItWorks>
      <FeaturedServices></FeaturedServices>
    </div>
  );
}

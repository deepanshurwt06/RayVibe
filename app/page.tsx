
import BgGradient from "@/components/common/bg-gradient";
import { DemoSection } from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient children={undefined} />
     <div className="flex flex-col">
     <HeroSection />  
     <DemoSection /> 
     <HowItWorks />
     <PricingSection />
      </div>   
    
    </div>
  );
}

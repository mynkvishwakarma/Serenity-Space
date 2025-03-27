
import HeadingSection from "@/components/HeadingSection";
import HealthBlogCards from "@/components/HealthBlogCards";
import MovingCard from "@/components/MovingCard";





export default function Home() {
  return (

    
   <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] text-white">
      <HeadingSection/>
      <HealthBlogCards/>

      <MovingCard/>
   </main>
    
  );
}

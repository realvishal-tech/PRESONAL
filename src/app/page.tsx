import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { MarqueeText } from "@/components/shared/MarqueeText";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main className="relative space-y-6 pb-10">
        <HeroSection />
        <MarqueeText text="VISHAL🖤 VISHAL🖤 VISHAL🖤 VISHAL🖤 VISHAL🖤 VISHAL🖤 VISHAL🖤" />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <AchievementsSection />
        <BlogSection />
        <VisionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

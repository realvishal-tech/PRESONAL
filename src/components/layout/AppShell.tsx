"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AnalyticsBeacon } from "./AnalyticsBeacon";
import { BackgroundVisuals } from "./BackgroundVisuals";
import { CustomCursor } from "./CustomCursor";
import { EasterEgg } from "./EasterEgg";
import { LoadingScreen } from "./LoadingScreen";
import { MusicToggle } from "./MusicToggle";
import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";
import { ChatBot } from "../widgets/ChatBot";
import { VoiceAssistant } from "../widgets/VoiceAssistant";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className="relative min-h-screen bg-black text-white">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <BackgroundVisuals />
      <div className="relative z-10">{children}</div>
      <ThemeToggle />
      {!isAdmin && <MusicToggle />}
      {!isAdmin && <ChatBot />}
      {!isAdmin && <VoiceAssistant />}
      {!isAdmin && <AnalyticsBeacon />}
      <EasterEgg />
      <Toaster position="bottom-center" />
    </div>
  );
};

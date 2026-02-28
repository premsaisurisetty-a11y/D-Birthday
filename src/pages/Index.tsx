import HeroSection from "@/components/HeroSection";
import MemoriesGallery from "@/components/MemoriesGallery";
import LoveQuestion from "@/components/LoveQuestion";
import LoveLetter from "@/components/LoveLetter";
import BirthdaySurprise from "@/components/BirthdaySurprise";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import CountdownTimer from "@/components/CountdownTimer";
import BirthdayWishForm from "@/components/BirthdayWishForm";
import FinalMessage from "@/components/FinalMessage";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Show loading screen for 2.8 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-background min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <FloatingHearts />
          <MusicPlayer />
          <HeroSection />
          <BirthdaySurprise />
          <MemoriesGallery />
          <LoveQuestion />
          <LoveLetter />
          <ReasonsILoveYou />
          <CountdownTimer />
          <BirthdayWishForm />
          <FinalMessage />
        </>
      )}
    </div>
  );
};

export default Index;

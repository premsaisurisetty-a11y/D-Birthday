import HeroSection from "@/components/HeroSection";
import MemoriesGallery from "@/components/MemoriesGallery";
import LoveLetter from "@/components/LoveLetter";
import VideoSection from "@/components/VideoSection";
import BirthdaySurprise from "@/components/BirthdaySurprise";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import FriendsWishes from "@/components/FriendsWishes";
import MiniQuiz from "@/components/MiniQuiz";
import CountdownTimer from "@/components/CountdownTimer";
import FinalMessage from "@/components/FinalMessage";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="relative bg-background min-h-screen overflow-x-hidden">
      <FloatingHearts />
      <MusicPlayer />
      <HeroSection />
      <MemoriesGallery />
      <LoveLetter />
      <VideoSection />
      <BirthdaySurprise />
      <ReasonsILoveYou />
      <FriendsWishes />
      <MiniQuiz />
      <CountdownTimer />
      <FinalMessage />
    </div>
  );
};

export default Index;

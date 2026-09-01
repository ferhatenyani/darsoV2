import { HomeHeader } from "@/components/nav/home-header";
import { HomeHero } from "@/components/marketing/home-hero";

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="flex-1">
        <HomeHero />
      </main>
    </>
  );
}

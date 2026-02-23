import {
  HomeConversionHero,
  StatsStrip,
  HomeProgramsGrid,
  HomeHowItWorks,
  CoachingSection,
  HomeResultsPreview,
  CTASection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="page-home page-home-conversion">
      <HomeConversionHero />
      <StatsStrip />
      <HomeProgramsGrid />
      <HomeHowItWorks />
      <CoachingSection />
      <HomeResultsPreview />
      <CTASection />
    </div>
  );
}

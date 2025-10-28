import Hero from '@/components/sections/landing/hero';
import EmpireStats from '@/components/sections/landing/empire-stats';
import { Separator } from '@/components/ui/separator';
import PageWrapper from '@/components/page-wrapper';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <PageWrapper>
      <main className="flex flex-col items-center">
        <Hero />
        <div className="w-full max-w-7xl px-4 md:px-8">
          <Separator className="my-12 md:my-24" />
          <EmpireStats />
        </div>
        <div className="my-24">
          <ThemeToggle />
        </div>
      </main>
    </PageWrapper>
  );
}

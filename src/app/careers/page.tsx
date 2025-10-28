import PageWrapper from "@/components/page-wrapper";
import ApplicationForm from "@/components/sections/careers/application-form";

export default function CareersPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl tracking-wide">Join The Empire</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We are looking for the masterminds, the innovators, and the legends of tomorrow. If you have what it takes to build empires, we want you.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ApplicationForm />
        </div>
      </main>
    </PageWrapper>
  );
}

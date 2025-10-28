
import PageWrapper from "@/components/page-wrapper";
import SignupForm from "@/components/sections/auth/signup-form";

export default function SignupPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto py-12 md:py-24 min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl md:text-5xl tracking-wide">Join the Ranks</h1>
                <p className="text-muted-foreground mt-2">Create an account to begin your journey with EmityGate.</p>
            </div>
            <SignupForm />
        </div>
      </main>
    </PageWrapper>
  );
}

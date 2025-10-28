
import PageWrapper from "@/components/page-wrapper";
import LoginForm from "@/components/sections/auth/login-form";

export default function LoginPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto py-12 md:py-24 min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl md:text-5xl tracking-wide">Access Terminal</h1>
                <p className="text-muted-foreground mt-2">Enter your credentials to enter the EmityGate network.</p>
            </div>
            <LoginForm />
        </div>
      </main>
    </PageWrapper>
  );
}

import PageWrapper from "@/components/page-wrapper";
import AdminDashboard from "@/components/sections/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl tracking-wide">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor the EmityGate empire.</p>
        </div>
        <AdminDashboard />
      </main>
    </PageWrapper>
  );
}

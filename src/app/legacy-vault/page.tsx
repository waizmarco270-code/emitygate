import PageWrapper from "@/components/page-wrapper";
import VaultClient from "@/components/sections/vault/vault-client";

export default function LegacyVaultPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto py-12 md:py-24 min-h-[80vh] flex items-center justify-center">
        <VaultClient />
      </main>
    </PageWrapper>
  );
}

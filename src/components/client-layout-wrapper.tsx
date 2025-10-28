
'use client';

import ClientLayout from "./client-layout";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return <ClientLayout>{children}</ClientLayout>;
}

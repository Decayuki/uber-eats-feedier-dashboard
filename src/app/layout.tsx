import type { Metadata } from "next";
import "@/styles/globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { RadialGlossary } from "@/components/layout/RadialGlossary";

export const metadata: Metadata = {
  title: "Dashboard Uber Eats × Feedier",
  description: "Dashboard pédagogique CX pour étudiants M1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-shell text-zinc-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-4 p-4 md:flex-row md:p-5">
          <Sidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <RadialGlossary />
      </body>
    </html>
  );
}

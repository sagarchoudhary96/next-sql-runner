import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppContextProvider from "@/contexts/AppContext";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SQL Query Runner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased overflow-hidden flex flex-col h-[100dvh]`}
      >
        <AppContextProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <AppHeader />
              <main className="p-4 flex-1 flex flex-col overflow-hidden">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}

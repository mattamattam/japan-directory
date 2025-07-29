import { getNavigationData } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  // Fetch navigation data
  const navigationData = await getNavigationData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigationData={navigationData} />
      {children}
      <Footer />
    </div>
  );
}

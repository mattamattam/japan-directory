import {
  getNavigationData,
  getSectionPagesForNavigation,
} from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  // Fetch navigation data with error handling
  let navigationData;
  let sectionPages;

  try {
    [navigationData, sectionPages] = await Promise.all([
      getNavigationData(),
      getSectionPagesForNavigation(),
    ]);
  } catch (error) {
    console.error("Failed to fetch navigation data:", error);
    // Provide fallback data to prevent infinite loops
    navigationData = { destinations: [] };
    sectionPages = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigationData={navigationData} sectionPages={sectionPages} />
      {children}
      <Footer />
    </div>
  );
}

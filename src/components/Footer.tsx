import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getFooterDestinations } from "@/lib/sanity-queries";

interface FooterDestination {
  _id: string;
  name: string;
  slug: { current: string };
}

const navigation = {
  destinations: [
    { name: "Tokyo", href: "/destinations/tokyo" },
    { name: "Kyoto", href: "/destinations/kyoto" },
    { name: "Osaka", href: "/destinations/osaka" },
    { name: "Hiroshima", href: "/destinations/hiroshima" },
    { name: "Nara", href: "/destinations/nara" },
    { name: "Sapporo", href: "/destinations/sapporo" },
  ],
  services: [
    { name: "Experiences", href: "/experiences" },
    { name: "Lodging", href: "/lodging" },
    { name: "Food", href: "/food" },
    { name: "Essentials", href: "/essentials" },
    { name: "Itineraries", href: "/itineraries" },
  ],
  resources: [
    { name: "Travel Guide", href: "/guide" },
    { name: "Blog", href: "/blog" },
    { name: "Seasonal Events", href: "/events" },
    { name: "Language Guide", href: "/language" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  ],
};

export default async function Footer() {
  // Fetch footer destinations from Sanity
  const footerDestinations = await getFooterDestinations(5);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">訪</span>
              </div>
              <span className="ml-2 text-xl font-bold">Visit Japan HQ</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Your ultimate guide to Japan tourism. Discover the best hotels,
              attractions, restaurants, and travel tips for an unforgettable
              Japanese adventure.
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <p>
                <strong>Affiliate Disclosure:</strong> We may earn commissions
                from purchases made through links on this site.
              </p>
              <p>
                &copy; {new Date().getFullYear()} Visit Japan HQ. All rights
                reserved.
              </p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">
                  Destinations
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerDestinations.map((destination: FooterDestination) => (
                    <li key={destination._id}>
                      <Link
                        href={`/destinations/${destination.slug.current}`}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {destination.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/destinations"
                      className="text-sm leading-6 text-red-400 hover:text-red-300 font-medium"
                    >
                      See all destinations →
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

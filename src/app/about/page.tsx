import { Metadata } from "next";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us - Visit Japan HQ",
  description:
    "Learn about Visit Japan HQ, our mission to help travelers experience Japan authentically, and the story behind our Japan travel guides.",
};

export default function AboutUs() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "About Us",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About Visit Japan HQ
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              こんにちは, and welcome!
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                So here&apos;s the deal. After taking multiple family trips to
                Japan over the years—lugging backpacks through bustling train
                stations, getting gloriously lost in alleyways filled with ramen
                steam, and collecting more onsen towels than any sane person
                should—I decided it was time to do something with all this Japan
                travel intel rattling around in my brain.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                And thus, Visit Japan HQ was born. A labor of love. Or possibly
                obsession. Hard to say.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                Why This Exists
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Like many things in life (parenting, IKEA furniture, choosing a
                Tokyo hotel near a station that actually matters), traveling to
                Japan can be equal parts magical and maddening—especially the
                first time. The food? Divine. The people? Incredibly kind. The
                signage? Mostly a guessing game if you&apos;re off the tourist
                path.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                But after a few trips (and the occasional transit meltdown), I
                realized that having the right kind of information—the kind
                that&apos;s not buried six clicks deep or written by someone who
                clearly never set foot in Kyoto—makes all the difference.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                This site is my way of handing you the keys before you ever set
                foot on the tarmac. Not just the must-dos and must-sees, but
                also the &ldquo;don&apos;t waste your time here&rdquo; and
                &ldquo;this dish looks weird but trust me, you&apos;ll want
                seconds&rdquo; kind of stuff.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                Who Am I?
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Good question. I&apos;m not a full-time travel influencer
                (though if someone wants to pay me to go back to Hokkaido and
                &ldquo;document the snow,&rdquo; I&apos;m all ears). I&apos;m a
                software engineer by trade, a researcher by compulsion, and a
                Japan enthusiast by way of multiple family trips that escalated
                into carefully color-coded itineraries and arguments about which
                onsen had the better view.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                I&apos;ve explored Japan from the neon-lit frenzy of Tokyo to
                the hushed temples of Nara, with kids in tow and yen in hand.
                I&apos;ve dealt with jet lag, train strikes (rare, but
                thrilling!), and the eternal mystery of Japanese vending
                machines that sell hot corn soup in a can.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                So no, I&apos;m not a tour company or a government-backed travel
                board. I&apos;m just someone who&apos;s been there—more than
                once—and wanted to share what actually works.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                What You&apos;ll Find Here
              </h2>
              <ul className="list-disc list-inside space-y-3 mb-8 text-lg leading-relaxed">
                <li>
                  <strong>Curated destination guides:</strong> Tokyo, Kyoto,
                  Osaka, and beyond—written like you&apos;d explain it to a
                  friend, not like a brochure.
                </li>
                <li>
                  <strong>Planning resources:</strong> Rail Pass tips, WiFi
                  choices, budgeting hacks, and packing lists with actual sanity
                  in mind.
                </li>
                <li>
                  <strong>Itineraries that make sense:</strong> For
                  first-timers, foodies, families, cherry blossom chasers—you
                  name it.
                </li>
                <li>
                  <strong>Affiliate links (with integrity):</strong> Yes, I may
                  earn a small commission if you book through certain links, but
                  only if I actually recommend the thing. No &ldquo;sponsored
                  sushi experiences&rdquo; that turned out to be microwaved fish
                  on rice, I promise.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                Why Trust Me?
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Because I&apos;ve already made the mistakes so you don&apos;t
                have to. Like that time I booked a hotel in Kyoto that looked
                &ldquo;walkable&rdquo; from the station but turned out to
                involve a 25-minute hike up a hill... with luggage... and two
                hangry kids. (Good times.)
              </p>

              <p className="text-lg leading-relaxed mb-8">
                Everything on this site is here because I believe it helps. If
                it doesn&apos;t, or if you think it could be better, email me. I
                won&apos;t take it personally unless you insult my ramen
                rankings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                The (Possibly Overly Idealistic) Mission
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Travel should be exciting, not exhausting. Japan is one of the
                most incredible countries you&apos;ll ever visit—and it deserves
                more than a rushed checklist or a vague blog post from someone
                who spent 36 hours in Shibuya and declared themselves an expert.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                I want you to feel like a local faster, avoid the usual travel
                traps, and come home with more than blurry photos of a torii
                gate from behind a hundred umbrellas. I want you to eat things
                you can&apos;t pronounce, bow awkwardly but respectfully, and
                come back already dreaming of your next trip.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                A Final Word (Because You&apos;re Still Reading?)
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Look, there are plenty of Japan travel sites out there. Some are
                great. Some are... well, let&apos;s just say they could use a
                little less AI and a little more reality. My goal here
                isn&apos;t to be the biggest site. It&apos;s to be the most
                helpful one. The one you bookmark, come back to, and maybe even
                tell your friends about—preferably over sake.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                Thanks for being here. Now go plan something amazing.
              </p>

              <div className="border-t border-gray-200 pt-8 mt-12">
                <p className="text-lg leading-relaxed mb-2">
                  <strong>– Anata no Nihon Ryokō Gaido</strong>
                </p>
                <p className="text-gray-600 italic">
                  Editor-in-Chief, Reluctant Luggage Porter, and Supreme Ramen
                  Tester at Visit Japan HQ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

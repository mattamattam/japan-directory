// app/page.tsx
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable caching

export default async function Home() {
  const { data: places, error } = await supabase.from("places").select("*");

  if (error) {
    console.error("Supabase error:", error.message);
    return <div>Error loading places: {error.message}</div>;
  }

  return (
    <div>
      <h1>Japan Travel Directory Test1</h1>
      <ul>
        {places?.map((place) => (
          <li key={place.id}>
            {place.name} - {place.region}
          </li>
        ))}
      </ul>
    </div>
  );
}

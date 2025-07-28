export async function generateStaticParams() {
  const params: Array<{ slug: string; district: string }> = [];
  ["shibuya", "shinjuku", "harajuku", "akihabara", "asakusa"].forEach(
    (district) => {
      params.push({ slug: "tokyo", district });
    }
  );
  ["gion", "arashiyama", "higashiyama"].forEach((district) => {
    params.push({ slug: "kyoto", district });
  });
  ["dotonbori", "namba", "umeda"].forEach((district) => {
    params.push({ slug: "osaka", district });
  });
  ["miyajima", "peace-memorial-park"].forEach((district) => {
    params.push({ slug: "hiroshima", district });
  });
  return params;
}

export default async function DistrictShoppingPage() {
  return (
    <div>
      <h1>Shopping in District</h1>
      <p>This page is under construction.</p>
    </div>
  );
}

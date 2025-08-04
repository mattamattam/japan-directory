import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Forward the request to the external API server
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const externalUrl = `${apiBaseUrl}/api/newsletter`;
    const body = await request.json();

    const response = await fetch(externalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Newsletter proxy error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}

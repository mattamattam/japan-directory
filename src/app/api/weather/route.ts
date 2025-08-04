import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Forward the request to the external API server
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const externalUrl = `${apiBaseUrl}/api/weather`;

    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

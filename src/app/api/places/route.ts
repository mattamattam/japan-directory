import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Environment-aware API configuration
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    const API_KEY =
      process.env.BUILD_API_KEY ||
      process.env.API_KEY ||
      "japan-dir-api-key-2024-secure";

    console.log(
      `Proxying request to API: ${API_BASE_URL}/api/places?query=${query}`
    );
    console.log(`Using API key: ${API_KEY ? "***configured***" : "missing"}`);

    // Make request to the external API with proper authentication
    const response = await fetch(
      `${API_BASE_URL}/api/places?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!response.ok) {
      console.error(
        `API request failed: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: "API request failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in places API proxy:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

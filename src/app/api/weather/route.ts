import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Weather proxy called"); // Debug

    // Forward the request to the external API server
    const externalUrl = "http://localhost:3002/api/weather";
    console.log("Calling external API:", externalUrl); // Debug

    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("External API response status:", response.status); // Debug

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("External API data:", data); // Debug
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Forward the request to the external API server
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get("currency") || "USD";

    const externalUrl = `http://localhost:3002/api/exchange-rate?currency=${currency}`;
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
    console.error("Exchange rate proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exchange rate data" },
      { status: 500 }
    );
  }
}

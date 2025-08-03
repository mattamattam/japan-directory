import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized (you can add additional validation here)
    const authHeader = request.headers.get("authorization");

    // Simple token validation (you can make this more sophisticated)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    // Validate against your secret token
    if (token !== process.env.WEBHOOK_SECRET_TOKEN) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Trigger GitHub Actions workflow
    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "manual-trigger",
          client_payload: {
            source: "webhook",
            timestamp: new Date().toISOString(),
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", errorText);
      return NextResponse.json(
        { error: "Failed to trigger workflow" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Workflow triggered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error triggering dispatch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

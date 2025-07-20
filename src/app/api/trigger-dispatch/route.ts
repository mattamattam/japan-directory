// src/app/api/trigger-dispatch/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const githubToken = process.env.NEXT_PUBLIC_GH_TOKEN;

  if (!githubToken) {
    return NextResponse.json(
      { error: "Missing GitHub token" },
      { status: 500 }
    );
  }

  const githubResponse = await fetch(
    "https://api.github.com/repos/mattamattam/japan-directory/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.everest-preview+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "sanity-publish",
      }),
    }
  );

  if (!githubResponse.ok) {
    const errorText = await githubResponse.text();
    return NextResponse.json(
      { error: `GitHub dispatch failed: ${errorText}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

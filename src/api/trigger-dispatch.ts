// pages/api/trigger-dispatch.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const githubToken = process.env.GH_TOKEN;

  const response = await fetch(
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

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    const error = await response.text();
    res.status(500).json({ error });
  }
}

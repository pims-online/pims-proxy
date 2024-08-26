import type { VercelRequest, VercelResponse } from "@vercel/node";

// Deploy a serverless function to handle CORS issues
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const url = `https://www.radiofrance.com/frequences_ajax/${latitude}/${longitude}/SP`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const text = await response.text();

      // Set CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(200).send(text);
    } else {
      res
        .status(response.status)
        .json({ error: `HTTP error: ${response.status}` });
    }
  } catch (error) {
    // Type the error
    res
      .status(500)
      .json({ error: `Request error: ${(error as Error).message}` });
  }
}

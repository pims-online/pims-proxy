import type { VercelRequest, VercelResponse } from "@vercel/node";

// Deploy a serverless function to handle CORS issues
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { queryParams } = req.query;

  if (!queryParams) {
    return res.status(400).json({ error: "Missing query params" });
  }

  const url = `https://georisques.gouv.fr/api/v1/resultats_rapport_risque?${queryParams}`;

  try {
    const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

    if (response.ok) {
      const data = await response.json();

      // Set CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(200).send(data);
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

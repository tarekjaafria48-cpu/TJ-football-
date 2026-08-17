export default async function handler(request, response) {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;

    if (!apiKey) {
      return response.status(500).json({
        error: true,
        message: "API_FOOTBALL_KEY is not configured"
      });
    }

    const url = new URL(
      "https://v3.football.api-sports.io/fixtures"
    );

    const type = request.query?.type || "all";

    if (type === "live") {
      url.searchParams.set("live", "all");
    } else {
      const today = new Date().toISOString().slice(0, 10);
      url.searchParams.set("date", today);
      url.searchParams.set("timezone", "Africa/Tunis");
    }

    const apiResponse = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
        "Accept": "application/json"
      }
    });

    const data = await apiResponse.json();

    return response.status(apiResponse.status).json(data);

  } catch (error) {
    return response.status(500).json({
      error: true,
      message: "Failed to fetch football data",
      details: error.message
    });
  }
}

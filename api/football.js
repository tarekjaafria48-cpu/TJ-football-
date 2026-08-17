export default async function handler(request, response) {
  try {
    const type = request.query?.type || "all";

    let url;

    if (type === "live") {
      url = "https://v3.football.api-sports.io/fixtures?live=all";
    } else {
      const date = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Tunis",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());

      url =
        "https://v3.football.api-sports.io/fixtures?date=" +
        date +
        "&timezone=Africa/Tunis";
    }

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY
      },
      cache: "no-store"
    });

    const data = await apiResponse.json();

    response.setHeader("Cache-Control", "no-store");

    return response.status(apiResponse.status).json(data);

  } catch (error) {
    return response.status(500).json({
      get: "fixtures",
      errors: [error.message],
      results: 0,
      response: []
    });
  }
}

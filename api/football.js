export default async function handler(request, response) {
  try {
    const apiResponse = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY
        }
      }
    );

    const data = await apiResponse.json();

    response.status(apiResponse.status).json(data);
  } catch (error) {
    response.status(500).json({
      error: "Failed to fetch football data"
    });
  }
}

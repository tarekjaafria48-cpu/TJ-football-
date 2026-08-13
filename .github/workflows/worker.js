export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const target =
      "https://v3.football.api-sports.io" +
      url.pathname +
      url.search;

    const response = await fetch(target, {
      headers: {
        "x-apisports-key": env.API_FOOTBALL_KEY
      }
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};

import ejs from "ejs";
import axios from "axios";

const template = `
<!DOCTYPE html>
  
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=<%= game.url %>" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="<%= game.name %> on Game Lab" />
    <meta property="og:description" content="Play <%= game.name %> on Game Lab, the web-based game editor by Hack Club." />
    <meta property="og:url" content="<%= url %>" />
    <meta property="og:image" content="<%= imageUrl %>" />

    <title><%= game.name %> on Game Lab</title>
  </head>

  <body>
    <a href="<%= game.url %>">Redirecting to Game Lab...</a>
  </body>
</html>
`;

/** @type {import("@vercel/node").VercelApiHandler} */
export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const { data: game } = await axios(
      `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${id}.json`
    );

    const imageUrlParams = new URLSearchParams({ id });

    res.send(
      ejs.render(template, {
        game: {
          url: `/?id=${id}`,
          name: game.name,
        },
        url: `https://${req.headers.host}/share/${id}`,
        imageUrl: `https://${req.headers.host}/api/preview?${imageUrlParams}`,
      })
    );
  } catch (e) {
    res.redirect("/");
  }
}

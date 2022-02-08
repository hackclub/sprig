import ejs from "ejs";

export default function handler(req, res) {
  res.send(
    ejs.render(
      `<!DOCTYPE html>
  
  <html>
    <head>
      <meta http-equiv="refresh" content="0; url=<%= url %>" />
    </head>
  </html>`,
      { url: `https://gamelab.hackclub.com/?id=${req.query.id}` }
    )
  );
}

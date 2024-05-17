const express = require("express");
const cors = require("cors");
const request = require("request");
const bodyParser = require("body-parser")
const querystring = require("querystring");
const SpotifyWebApi = require("spotify-web-api-node");

var client_id = "533d6a5cfa884e42ae4ee458898c72a8";
var client_secret = "9d33d756f725492ea16c7de70caad81e";
var redirect_uri = "http://localhost:3000";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/login", function (req, res) {
  var scope =
    "ugc-image-upload user-read-private user-read-email user-library-read user-read-recently-played user-top-read playlist-read-collaborative user-read-currently-playing";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
});

app.post("/callback", function (req, res) {
  var code = req.body.code
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    console.log(body);
    res.json(body);
  });
});

app.listen(8888);

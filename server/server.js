const express = require("express");
const cors = require("cors");
const request = require("request");
const bodyParser = require("body-parser")
const querystring = require("querystring");
const SpotifyWebApi = require("spotify-web-api-node");

var client_id = "a47f95d6dc7843ec80318ddaa562cbff";
var client_secret = "1eac879cd8dd43dca9bc8156ef0c3b9a";
var redirect_uri = "http://localhost:3000";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/login", function (req, res) {
  var scope =
    "user-read-private user-top-read user-library-read user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-currently-playing";
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

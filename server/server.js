require('dotenv').config()
const express = require("express");
const cors = require("cors");
const request = require("request");
const axios = require("axios");
const bodyParser = require("body-parser")
const querystring = require("querystring");


var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/login", function (req, res) {
  var scope =
    "user-read-private user-top-read user-library-read user-library-modify user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-currently-playing";
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
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const token_url = 'https://accounts.spotify.com/api/token';

    try {
        const response = await axios.post(token_url, querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
            client_id: client_id,
            client_secret: client_secret
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;
        res.redirect(
            "http://localhost:3000?" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
                expires_in: expires_in
              })
          );
    } catch (error) {
        console.log(error);
    }
});

app.listen(8888);

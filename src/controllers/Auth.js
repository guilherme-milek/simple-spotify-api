const request = require("request");

class Auth {
  static client_id = "67bec0d98e7740f5adfee46fbaea3d79";
  static client_secret = "b0a156a176c644e2938b36895e2aa07d";

  static async generateToken() {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(Auth.client_id + ":" + Auth.client_secret).toString(
            "base64"
          ),
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };

    return new Promise((resolve, reject) => {
      request.post(authOptions, async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(await body.access_token);
        } else {
          reject("Token error");
        }
      });
    });
  }
}

module.exports = Auth;

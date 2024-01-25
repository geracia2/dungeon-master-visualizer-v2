const jwt = require("jsonwebtoken");

async function authorize(req, res, next) {
  console.log(`Authorizing`);
  try {
    //  1 check if the request has a token (from authorization header)
    let token = req.header("Authorization");
    if (!token) {
      // if we return here we never get to user information
      return res.status(400).json({ error: "No token provided" });
    }
    console.log(token); // "Bearer a5s64df6asdf4"
    //   so we need to modify string, replacing the front
    token = token.replace("Bearer ", ""); // "a5s64df6asdf4"

    // 2 check if that token is valid && not expired
    //   compare the token, use secret string to check, returns a payload object
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.error) {
      return res.status(400).json({ error: payload.error });
    }

    // 3 attach payload from token to req obj,
    // since this is middleware we attach here and give it to the route method
    // there is no ID yet inside the req so we make one using the payload id
    req.id = payload.id;
    req.username = payload.username;

    // 4 move onto the requested route (next)
    next();

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { authorize }

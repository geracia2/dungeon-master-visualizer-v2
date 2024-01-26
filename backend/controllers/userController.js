const User = require("../models/userModel");

module.exports.show = async (req, res) => {
  console.log("GET /api/users");
  try {
    // show only if we have a token available
    // it is req.id findByID from middleware payload transforming payload.id to req.id
    const foundUser = await User.findById(req.id);

    console.log('Sending username and email in json')

    res.status(200).json({
      username: foundUser.username,
      email: foundUser.email,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}

// module.exports = {
//   show,
// };

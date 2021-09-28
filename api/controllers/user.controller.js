const models = require("../models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, password2 } = req.body;

    if (!email || !password || !password2) {
      return res.status(409).json({ error: "Required fields missing" });
    }
    if (password !== password2) {
      return res.status(409).json({ error: "Passwords do not match" });
    }

    const userExist = await models.user.findOne({ email });
    if (userExist) {
      return res.json({ message: "Email already in use" });
    }

    const hash = await models.user.encrypt(password);
    const newUser = new models.user({
      email,
      password: hash,
    });

    await newUser.save();
    return res.json(newUser);
  } catch (_) {
    return res
      .status(409)
      .json({ error: "There was an error creating the user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).json({ error: "Required fields missing" });
    }

    const user = await models.user.findOne({ email });
    if (!user) {
      return res.status(409).json({ error: "User does not exist" });
    }

    const isValid = await models.user.compare(password, user.password);
    if (!isValid) {
      return res.status(409).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ user }, "chat-cice");
    return res.status(200).json({ token, userId: user._id, admin: user.admin });

  } catch (_) {
    return res.status(409).json({ error: "There was an error validating the user" });
  }
};

const deleteUser = async (req, res) => {
  try{
    const {id} = req.params;
    await models.user.findByIdAndRemove(id); 
		return res.json(true);
  }catch(_){
    return res.status(409).json(false);
  }
};

const all = async (req, res) => {
  try {
    const data = jwt.verify(req.headers.token, 'chat-cice');
    const users = await models.user.find({_id: { $ne: data.user._id }});
    return res.status(200).json(users);
  } catch (_) {
    return res.status(409).json({ err: "There was an error" });
  }
};
module.exports = {
  register,
  login,
  all,
  deleteUser
};

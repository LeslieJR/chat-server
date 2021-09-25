const models = require("../models");

const create = async (req, res) => {
  try {
    const { user_one_id, user_two_id, user_owner_id, message } = req.body;
    const user_one = await models.user.findById(user_one_id);
    if (!user_one) {
      return res.json({ err: "User1 does not exist" });
    }

    const user_two = await models.user.findById(user_two_id);
    if (!user_two) {
      return res.json({ err: "User2 does not exist" });
    }

    const user_owner = await models.user.findById(user_owner_id);
    if (!user_owner) {
      return res.json({ err: "User owner does not exist" });
    }

    if (!message) {
      return res.json({ err: "Message empty" });
    }

    let textMessage = null;

    const messages = await models.message.find({
      user_one: user_two,
      user_two: user_one,
    });

    if (messages.length === 0) {
      textMessage = await models.message.create({
        user_one,
        user_two,
        user_owner,
        message,
      });
    } else {
      textMessage = await models.message.create({
        user_one: user_two,
        user_two: user_one,
        user_owner,
        message,
      });
    }

    return res.json(textMessage);
  } catch (_) {
    return res.json({ error: "There was an error" });
  }
};

const chat = async (req, res) => {
  try {
    const { user_one_id, user_two_id } = req.body;
    
    const user_one = await models.user.findById(user_one_id);
    if (!user_one) {
      return res.json({ err: "User 1 does not exist" });
    }

    const user_two = await models.user.findById(user_two_id);
    if (!user_two) {
      return res.json({ err: "User 2 does not exist" });
    }

    let messages = [];

    const messages1 = await models.message.find({
      user_one,
      user_two
    });

    if (messages1.length === 0) {
      const messages2 = await models.message.find({
        user_one: user_two,
        user_two: user_one,
      });
      if(messages2.length !== 0){
          messages = messages2
      }
    }else{
        messages = messages1
    }
    return res.json(messages)
  } catch (_) {
    return res.json({ error: "There was an error" });
  }
};

module.exports = {
  create,
  chat,
};

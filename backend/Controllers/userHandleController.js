import Conversation from "../Models/conversationModel.js";
import User from "../Models/userModels.js";

export const getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user._id;
    const user = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: ".*" + search + ".*", $options: "i" } },
            { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
          ],
        },
        {
          _id: { $ne: currentUserId },
        },
      ],
    })
      .select("-password")
      .select("email");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log("error");
  }
};

export const getCurrentChatters = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentChatters = await Conversation.find({
      participants: currentUserId,
    }).sort({ updatedAt: -1 });
    if (!currentChatters || currentChatters.length === 0)
      return res.status(200).send([]);

    const participantsId = currentChatters.reduce((ids, conversations) => {
      const otherParticipants = conversations.participants.filter(
        (id) => id !== currentUserId
      );
      return [...ids, ...otherParticipants];
    }, []);

    const otherParticipantsId = participantsId.filter(
      (id) => id.toString() !== currentUserId.toString()
    );

    const user = await User.find({ _id: { $in: otherParticipantsId } })
      .select("-password")
      .select("-email");

    const users = otherParticipantsId.map((id) =>
      user.find((user) => user._id.toString() === id.toString())
    );
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log("error");
  }
};

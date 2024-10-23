import Conversation from "../Models/conversationModel";
import Message from "../Models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let chats = await Conversation.findOne({
      participants: { $all: [sendId, receiverId] },
    });
    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessages = new Message({
      senderId,
      receiverId,
      message,
      conversationId: chats._id,
    });

    if (newMessages) {
      chats.message.push(newMessages._id);
    }

    // TODO SOCKET.IO FUNCTION

    await Promise.all([chats.save(), newMessages.save()]);

    res.status(201).send(newMessages);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!chats) return res.status(200).send([]);
    const message = chats.messages;
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

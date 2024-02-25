import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  // await conversation.save();
  // await newMessage.save();

  await Promise.all([conversation.save(), newMessage.save()]);

  // Socket IO
  const recieverSocketId = getReceiverSocketId(receiverId);

  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

  if (!conversation) return res.status(200).json([]);

  const messages = conversation.messages;

  res.status(200).json(messages);
});

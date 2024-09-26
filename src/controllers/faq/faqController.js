const Question = require("../../models/Question");

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json({ questions, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const newQuestion = await Question.create({ question, answer });

    res.status(201).json({ question: newQuestion, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedQuestion = await Question.findByPk(id);
    if (!updatedQuestion) {
      return res
        .status(404)
        .json({ message: "Question not found", success: false });
    }

    updatedQuestion.question = question;
    updatedQuestion.answer = answer;

    await updatedQuestion.save();

    res.status(200).json({ question: updatedQuestion, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", success: false });
    }

    await question.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", success: false });
    }

    res.status(200).json({ question, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

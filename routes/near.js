import { Router } from "express";
import { OpenAI } from "openai";
const nearRouter = Router();

const openai = new OpenAI({
  apiKey: "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",
  models: {
    "text-davinci-003":
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
  },
});

const adviseGet = async (req, res) => {
  const { location } = req.body;

  const prompt =
    "Give me 5 tourist spot near " +
    location +
    " give it in the form of heading as location and a paragraph each location seperated by ||";
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log("completion:", completion.choices[0].message.content);
    return res.json(completion.choices[0].message.content);
  } catch (err) {
    if (err.message.includes("API key")) {
      return res.status(500).json({ error: "Invalid OpenAI API key" });
    } else {
      console.error("Error:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
nearRouter.post("/getData", adviseGet);
export default nearRouter;

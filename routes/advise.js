import { Router, json } from "express";
import OpenAI from "openai";
import adviseSchema from "../models/adviseSchema.js";
const adviseRouter = Router();

const route = `[["Phewa Lake","Barahi Temple","Sarangkot","Gupteshwor Cave","Devi's Fall","International Mountain Museum","Bindhyabasini Temple","Seti River Gorge","Tal Barahi Temple","Mahendra Cave","Shanti Stupa","Pokhara Old Bazaar"],["Sarangkot"," Shanti Stupa","Phewa Lake","Bindhyabasini Temple","Mahendra Cave","Barahi Temple","Tal Barahi Temple","Devi's Fall","International Mountain Museum","Seti River Gorge","Gupteshwor Cave","Pokhara Old Bazaar"]]`;

const openai = new OpenAI({
  apiKey: "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", // replace with your actual API key
  models: {
    "text-davinci-003":
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
  },
});

const adviseGet = async (req, res) => {
  const { location } = req.body;
  console.log("location: ", req.body);
  let score = 0;

  const prompt =
    "route to visit in" +
    location +
    " show it in Route1: [destination1->destination2->destination3] form show 4 different routes show with minimum 4 different destinations the route should be enclosed in box bracket";
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    const data = completion.choices[0].message.content.split("[");
    var routeMatches = data.match(/Route \d+: \[.*?\]/g);

    // Parse routes into arrays
    var routes = routeMatches.map((route) => {
      return route.match(/\[([\w\s'’]+ -> [\w\s'’]+)+\]/)[1].split(" -> ");
    });

    return res.json(completion.choices[0].message.content);
  } catch (err) {
    // if (err.message.includes('API key')) {
    //     return res.status(500).json({ error: 'Invalid OpenAI API key' });
    // } else {
    //     console.error('Error:', err.message);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    // }
    const foundData = await adviseSchema.findOne({
      location,
    });
    if (foundData) {
      // console.log("route",JSON.parse(route))
      // console.log("visit ", JSON.parse())
      return res.json(JSON.parse(foundData.trip));
    } else {
      return 0;
    }
  }
};
adviseRouter.post("/get", adviseGet);

const addAdvise = async (req, res) => {
  const { location, trip } = req.body;
  const recommendation = await adviseSchema.findOne({
    location,
  });
  if (recommendation) {
    return res.json("Place already registered");
  }
  try {
    const response = await adviseSchema.create({
      location,
      trip,
    });
    res.json(JSON.parse(response));
  } catch (err) {
    console.log(err);
  }
  res.json("");
};
adviseRouter.post("/add", addAdvise);

export default adviseRouter;

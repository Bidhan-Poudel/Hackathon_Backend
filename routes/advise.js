import { Router } from "express";
import OpenAI from "openai";
const adviseRouter=Router();

const route=[["Phewa Lake","Barahi Temple","Sarangkot","Gupteshwor Cave","Devi's Fall","International Mountain Museum","Bindhyabasini Temple","Seti River Gorge","Tal Barahi Temple","Mahendra Cave","Shanti Stupa","Pokhara Old Bazaar"],["Sarangkot"," Shanti Stupa","Phewa Lake","Bindhyabasini Temple","Mahendra Cave","Barahi Temple","Tal Barahi Temple","Devi's Fall","International Mountain Museum","Seti River Gorge","Gupteshwor Cave","Pokhara Old Bazaar"]]

const openai = new OpenAI({
  apiKey: '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', // replace with your actual API key
  models: {
    'text-davinci-003': 'https://api.openai.com/v1/engines/text-davinci-003/completions',
  },
});

const adviseGet = async (req, res) => {
    const { details } = req.body;
    let score=0
    // console.log(details)
    // const userAns=details.Summary.split(" ")
    // console.log(userAns)
    // userAns.map(n=>{
    //   if(n==='renewable' || n==='energy' || n==='refers' || n==='to'|| n==='that'){
    //     score++;
    //   }
    // })
    // // const {Paragraph}=details
    
    // return res.json(response)
    
    // const question=await questionSchema.findOne({Qno:1})
    const prompt='route to visit in'+details+' show it in Route1: [destination1->destination2->destination3] form show 4 different routes show with minimum 4 different destinations the route should be enclosed in box bracket'
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        const data=completion.choices[0].message.content.split('[')
        const data2=data.split(']')
        console.log("completion:",data2);
      
        return res.json( completion.choices[0].message.content );
    } catch (err) {
        // if (err.message.includes('API key')) {
        //     return res.status(500).json({ error: 'Invalid OpenAI API key' });
        // } else {
        //     console.error('Error:', err.message);
        //     return res.status(500).json({ error: 'Internal Server Error' });
        // }
        return res.json(route)
    }
};
adviseRouter.post('/get',adviseGet)

export default adviseRouter
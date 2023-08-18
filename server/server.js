import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
//console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (request, res) => {
    res.status(200).send({
        message: 'Hello',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
            {
                "role": "user",
                "content": `${prompt}`
            }
            ],
            temperature: 0.8,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].message.content
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(5001, () => console.log('Server is running on port 5001, http://localhost:5001'))
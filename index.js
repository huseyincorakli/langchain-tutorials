
import { ChatOpenAI } from "@langchain/openai"
import * as dotenv from "dotenv";

dotenv.config();

const chat = new ChatOpenAI({
    modelName: "google/gemini-2.0-flash-lite-preview-02-05:free",
    temperature: 0,
    configuration:{
        baseURL:"https://openrouter.ai/api/v1"
    },
    maxTokens: 1000,
});

let response = await chat.stream("Hello, how are you?");

for await (const message of response) {
    console.log(message.content);
    
}

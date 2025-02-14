import { ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
    modelName: "google/gemini-2.0-flash-lite-preview-02-05:free",
    temperature: 0,
    configuration:{
        baseURL:"https://openrouter.ai/api/v1"
    },
    maxTokens: 1000,
});

// //#region from template
// const prompt = ChatPromptTemplate.fromTemplate(
//     "Sen bir komedyensin ve sana verilen kelime ile şaka yapıyorsun, işte kelime : {input}",
// );

// const chain = prompt.pipe(model);

// let response =  await chain.invoke({
//     input: "cacık"
// })
// console.log(response.content);

// //#endregion

//#region from message
const prompt = ChatPromptTemplate.fromMessages([
    ["system" ,"Sen bir komedyensin ve sana verilen kelime ile şaka yapıyorsun"],
    ["human","{input}"]
])

const chain = prompt.pipe(model);
const response = await chain.invoke({
    input:"cacık"
})
console.log(response);
//#endregion
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod"
import { v4 as uuidv4 } from "uuid";
import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
} from "@langchain/langgraph";

dotenv.config();
const config = { configurable: { thread_id: uuidv4() } };
const config2 = { configurable: { thread_id: uuidv4() } };

const chat = new ChatOpenAI({
    modelName: "deepseek/deepseek-chat:free",
    temperature: 0,
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
    },
    maxTokens: 1000,
});
const callModel = async (state) => {
    const response = await chat.invoke(state.messages);
    return { messages: response };
};

const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

const input = [
    {
        role: "user",
        content: "Hi! I'm Bob.",
    },
];
const input2 = [
    {
        role: "user",
        content: "What's my name?",
    },
];
const input3 = [
    {
        role: "user",
        content: "What's my name?",
    },
];
const output = await app.invoke({ messages: input }, config);
// The output contains all messages in the state.
// This will long the last message in the conversation.
console.log(output.messages[output.messages.length - 1]);
console.log("***************************************************");

setTimeout(async () => {
    console.log("***************************************************");

    const output2 = await app.invoke({ messages: input2 }, config);
    console.log(output2.messages[output2.messages.length - 1]);
}, 5000);

setTimeout(async () => {
    console.log("***************************************************");
    const output3 = await app.invoke({ messages: input3 }, config2);
    console.log(output3.messages[output3.messages.length - 1]);
}, 5000);
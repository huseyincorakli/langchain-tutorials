import { ChatOpenAI } from "@langchain/openai";
import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
} from "@langchain/langgraph";
import * as dotenv from "dotenv";
dotenv.config();

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
export default app;
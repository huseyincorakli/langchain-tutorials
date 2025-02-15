import { ChatOpenAI } from "@langchain/openai";
import {
    START,
    END,
    StateGraph,
    MemorySaver,
    MessagesAnnotation,
} from "@langchain/langgraph";
import * as dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const llm = new ChatOpenAI({
    modelName: "deepseek/deepseek-chat:free",
    temperature: 0,
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
    },
    maxTokens: 1000,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
    ],
    ["placeholder", "{messages}"],
]);

// GraphState'i basit bir obje olarak tanımlıyoruz
const graphState = {
    messages: MessagesAnnotation,
    language: "string"
};

const callModel = async (state) => {
    const prompt = await promptTemplate.invoke(state);
    const response = await llm.invoke(prompt);
    return { messages: [response] };
};

const workflow = new StateGraph({
    channels: graphState
})
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

const app = workflow.compile({ checkpointer: new MemorySaver() });

export default app;
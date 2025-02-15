import { ChatOpenAI } from "@langchain/openai";
import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
} from "@langchain/langgraph";
import * as dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";



dotenv.config();

const chat = new ChatOpenAI({
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
      "You talk like a pirate. Answer all questions to the best of your ability.",
    ],
    ["placeholder", "{messages}"],
  ]);

  const callModel2 = async (state) => {
    const prompt = await promptTemplate.invoke(state);
    const response = await chat.invoke(prompt);
    return { messages: [response] };
  };

  const workflow2 = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel2)
  .addEdge(START, "model")
  .addEdge("model", END);

  const app2 = workflow2.compile({ checkpointer: new MemorySaver() });
  
  export default app2;
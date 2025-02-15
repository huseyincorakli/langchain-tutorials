import app2 from "./app.js";
import { v4 as uuidv4 } from "uuid";


const config3 = { configurable: { thread_id: '0bb4eae9-e41a-4d9e-a180-a93f05789bf8' } };
const config4 = { configurable: { thread_id: '0bb4eae9-e41a-4d9e-a180-a93f05789bd8' } };

const input4 = [
    {
      role: "user",
      content: "Hi! I'm Jim.",
    },
  ];

  const input5 = [
    {
      role: "user",
      content: "What is my name?",
    },
  ];
const output5 = await app2.invoke({ messages: input4 }, config3);

console.log(output5.messages[output5.messages.length - 1]);
console.log("******");
const output6 = await app2.invoke({ messages: input5 }, config3);
console.log(output6.messages[output6.messages.length - 1]);
console.log("******");
const output7 = await app2.invoke({ messages: input5 }, config4);
console.log(output7.messages[output7.messages.length - 1]);
import { v4 as uuidv4 } from "uuid";
import app from "./app.js";
const config1= { configurable: { thread_id:'f98ca207-3d82-4527-b3e3-363ce7040c59'  } };
const config2= { configurable: { thread_id:'bede09dc-79bb-4db9-914b-ea3099f770f0'  } };


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

/// ilk durumda modele aynı thread id ile sorduk ve adımızı bildi.
// const output1 = await app.invoke({ messages: input }, config1);
// const output2 = await app.invoke({ messages: input3 }, config1);

// console.log(output1);
// console.log("******************");
// console.log(output2);

/// ikinci durumda modele farklı thread id ler ile önce adımızı söyleyip sonra adımız
/// sorduğumuzda bilemeyecektir.

const output3 = await app.invoke({ messages: input }, config1);
const output4 = await app.invoke({ messages: input3 }, config2);

console.log(output3);
console.log("******************");
console.log(output4);

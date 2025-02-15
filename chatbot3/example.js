import app from "./app.ts";

const config = { configurable: { thread_id: 'unique-conversation-id' } };

// İlk mesaj (dil belirtiliyor)
const input1 = {
    messages: [
        {
            role: "user",
            content: "Merhaba, benim adım Ali",
        }
    ],
    language: "Turkish"
};

// İkinci mesaj (dil belirtmeye gerek yok, hatırlanıyor)
const input2 = {
    messages: [
        {
            role: "user",
            content: "Benim adım neydi?",
        }
    ]
};

const output1 = await app.invoke(input1, config);
console.log(output1.messages[output1.messages.length - 1]);

const output2 = await app.invoke(input2, config);
console.log(output2.messages[output2.messages.length - 1]);
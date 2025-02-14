import { ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";
import * as dotenv from "dotenv";
import {
    BaseOutputParser,
    CommaSeparatedListOutputParser,
    StringOutputParser,
  } from "@langchain/core/output_parsers";
import { StructuredOutputParser } from "langchain/output_parsers";
import {z} from "zod"

dotenv.config();

const model = new ChatOpenAI({
    modelName: "google/gemini-2.0-flash-lite-preview-02-05:free",
    temperature: 0,
    configuration:{
        baseURL:"https://openrouter.ai/api/v1"
    },
    maxTokens: 1000,
    verbose:true
});

////region comma separated list output parser
// const  callOutputParser = async(word)=>{
//     const prompt = ChatPromptTemplate.fromMessages([
//         ["system" ,"Kullanıcının sağlayacağı bir kelime için virgülle ayrılmış 5 eşanlamlı kelime sağlayın "],
//         ["human","{input}"]
//     ])  
    
//     const output_parser = new CommaSeparatedListOutputParser();
//     const chain = prompt.pipe(model).pipe(output_parser);
    
//      return await chain.invoke({
//         input:word
//     });
// }
// const response = await callOutputParser("mutlu");
// console.log(response);
////endregion

//#region  structured output parser
// const prompt = ChatPromptTemplate.fromTemplate(
//     "Verilen ifadededen formata uygun bilgi ayıklayın. \n {format} \n {phares}",
// )
// const output_parser = StructuredOutputParser.fromNamesAndDescriptions({
//     name:"kişinin adı",
//     age:"kişinin yaşı"
// })

// const chain = prompt.pipe(model).pipe(output_parser);

// const response = await chain.invoke({
//     phares:"Ela ile lale kardeştir. Lale 23 yaşında. Ela ise 24 yaşındadır",
//     format:output_parser.getFormatInstructions()
// })

// console.log(response);
//#endregion

//#region zod scheme
 const prompt = ChatPromptTemplate.fromTemplate(
     "Verilen ifadeden formata uygun bilgi ayıklayın.\n {format} \ {phares}"
 )
 const output_parser = StructuredOutputParser.fromZodSchema(
     z.object({
         recipe:z.string().describe("tarifin adı"),
         ingredients:z.array(z.string()).describe("tarifin içeridiği malzemeler")
     })
 )
 const chain = prompt.pipe(model).pipe(output_parser);
 
 

 const response = await chain.invoke({
     format:output_parser.getFormatInstructions(),
     phares:"Tarhana Çorbası Tarifi İçin Malzemeler : 3 yemek kaşığı ev tarhanası 1 yemek kaşığı nane 2 yemek kaşığı sıvı yağ 1 yemek kaşığı salça 6 su bardağı suKırmızı pul biber Karabiber Tuz"
 })
 
 console.log(response);
//#endregion


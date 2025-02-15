import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OllamaEmbeddings } from "@langchain/ollama";
import { QdrantVectorStore } from "@langchain/qdrant";

const embeddings = new OllamaEmbeddings({
  model: "all-minilm", // 
  baseUrl: "", // 
});
const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: "", 
});

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
const loader = new PDFLoader("./resume.pdf");
const docs = await loader.load();

const allSplits = await textSplitter.splitDocuments(docs);
// try {
//     await vectorStore.addDocuments(allSplits);
// } catch (error) {
//     console.log("error",error);
    
// }

const retriever = vectorStore.asRetriever({
  searchType:'mmr',
  searchKwargs:{
    fetchK:1
  }
})

const response = await retriever.batch([
  "hüseyin çoraklı",
  ".net core"
])


console.log(response);



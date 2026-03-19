import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./"));

const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
});

app.post("/summarize", async (req,res)=>{

 const text = req.body.text;

 const response = await client.chat.completions.create({

  model: "gpt-4.1-mini",

  messages: [
   {
    role:"system",
    content:"회의 내용을 요약하고 핵심 bullet point로 정리해줘"
   },
   {
    role:"user",
    content:text
   }
  ]

 });

 res.json({
  summary: response.choices[0].message.content
 });

});

app.post("/todo", async (req,res)=>{

 const text = req.body.text;

 const response = await client.chat.completions.create({

  model:"gpt-4.1-mini",

  messages:[
   {
    role:"system",
    content:"회의 내용을 보고 해야할 일을 TODO 리스트로 작성해줘"
   },
   {
    role:"user",
    content:text
   }
  ]

 });

 res.json({
  todo: response.choices[0].message.content
 });

});

app.listen(3001,()=>{
 console.log("server running");
});
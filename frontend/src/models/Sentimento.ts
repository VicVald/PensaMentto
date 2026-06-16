
import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { z } from "zod";


const groq_api_key = new Groq({
    apiKey:process.env.GROQ_API_KEY
});

const model = "openai/gpt-oss-20b";



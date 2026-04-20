import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/process', async (req, res) => {
  const { content, userId, type = 'text' } = req.body;

  if (!content || !userId) {
    return res.status(400).json({ error: 'Content and userId are required' });
  }

  try {
    // 1. Save input to Supabase
    const { data: inputData, error: inputError } = await supabase
      .from('saas_user_inputs')
      .insert([{ 
        user_id: userId, 
        content, 
        input_type: type 
      }])
      .select()
      .single();

    if (inputError) throw inputError;

    // 2. Process with Gemini AI
    const prompt = `Analyze the following input and provide insights, recommendations, or a summary: \n\n${content}`;
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // 3. Save result to Supabase
    const { data: resultData, error: resultError } = await supabase
      .from('saas_results')
      .insert([{
        input_id: inputData.id,
        user_id: userId,
        result_text: aiResponse,
        ai_model: 'gemini-1.5-flash'
      }])
      .select()
      .single();

    if (resultError) throw resultError;

    res.json({
      success: true,
      data: {
        input: inputData,
        result: resultData
      }
    });

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

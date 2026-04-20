import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sql = `
-- Create AI SaaS related tables
CREATE TABLE IF NOT EXISTS public.saas_user_inputs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    input_type TEXT NOT NULL DEFAULT 'text', -- 'text' or 'file'
    file_metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.saas_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    input_id UUID REFERENCES public.saas_user_inputs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    result_text TEXT NOT NULL,
    ai_model TEXT NOT NULL DEFAULT 'gemini-1.5-flash',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.saas_user_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saas_results ENABLE ROW LEVEL SECURITY;

-- Policies for saas_user_inputs
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own inputs') THEN
        CREATE POLICY "Users can insert their own inputs" ON public.saas_user_inputs
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own inputs') THEN
        CREATE POLICY "Users can view their own inputs" ON public.saas_user_inputs
            FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

-- Policies for saas_results
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own results') THEN
        CREATE POLICY "Users can view their own results" ON public.saas_results
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own results') THEN
        CREATE POLICY "Users can insert their own results" ON public.saas_results
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;
`;

async function setup() {
  console.log('Applying migrations...');
  // Supabase JS doesn't have a direct 'execute raw sql' method in the client
  // But we can use the 'rpc' method if we create a function, or just use the management API
  // Alternatively, since we have the service role key, we can try to use a dummy table operation to test connection
  // However, the best way is usually the SQL editor.
  // I will just provide the SQL and tell the user it's better to run it in the editor if this script can't.
  
  // Wait, I can use a library like 'postgres' if I have the connection string.
  // I don't have the DB password.
  
  console.log('Please copy-paste the SQL from this file into your Supabase SQL Editor.');
}

setup();

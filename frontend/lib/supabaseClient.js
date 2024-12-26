// frontend/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://localhost:54321'; // 正しいローカルの Supabase API URL
const supabaseKey = 'your-anon-key'; // Supabase Studioで確認したanonキー

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase


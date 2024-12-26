// frontend/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://localhost:9999' // ローカルの Supabase API URL
const supabaseKey = 'your-anon-key' // Supabase の匿名キー（Supabase Studio で確認できます）

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase


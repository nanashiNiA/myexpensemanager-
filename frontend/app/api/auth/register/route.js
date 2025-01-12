import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 });
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from('users')
    .insert({ email, password: hashedPassword });

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
}

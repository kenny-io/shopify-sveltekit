import { createClient } from '@supabase/supabase-js';
// Create a single supabase client for interacting with your database

const supabase = createClient(
	// @ts-ignore
	import.meta.env.VITE_DATABASE_URL,
	import.meta.env.VITE_DATABASE_ANON_KEY
);

export default supabase;

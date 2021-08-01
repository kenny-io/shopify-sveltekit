import { createClient } from '@supabase/supabase-js';
// Create a single supabase client for interacting with your database

// const options = {
// 	access_token: localStorage.getItem('access_token'),
// 	user_id: localStorage.getItem('user_id')
// };
const supabase = createClient(
	// @ts-ignore
	import.meta.env.VITE_DATABASE_URL,
	import.meta.env.VITE_DATABASE_ANON_KEY
	// options
);

export default supabase;

export const addCartToDatabase = async ({ cart }) => {
	const addCartToSupabase = await fetch('/api/post-to-supabase', cart);
	const supabaseresponse = await addCartToSupabase.json();
	console.log(supabaseresponse);
	return supabaseresponse;
};

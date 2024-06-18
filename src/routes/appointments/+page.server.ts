import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: hospitals } = await supabase.from('hospitals').select('*');
	const { data: userID } = await supabase.auth.getUser();
	const { data: appointments } = await supabase.from('appointments').select('*');
	const { data: doctors } = await supabase.from('doctors').select('*');
	return {
		hospitals: hospitals ?? [],
		userID: userID ?? [],
		appointments: appointments ?? [],
		doctors: doctors ?? []
	};
};

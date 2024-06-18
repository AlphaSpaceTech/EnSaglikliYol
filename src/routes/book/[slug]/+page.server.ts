import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: hospitals } = await supabase.from('hospitals').select('*');
	const { data: doctors } = await supabase.from('doctors').select('*');
	const { data: userID } = await supabase.auth.getUser();
	return {
		hospitals: hospitals ?? [],
		userID: userID ?? [],
		doctors: doctors ?? []
	};
};

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: doctors } = await supabase.from('doctors').select('name').limit(5).order('id');
	return { doctors: doctors ?? [] };
};

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: cities } = await supabase.from('cities').select('*');
	const { data: provinces } = await supabase.from('provinces').select('*');
	const { data: hospitals } = await supabase.from('hospitals').select('*').limit(13244);

	return {
		cities: cities ?? [],
		provinces: provinces ?? [],
		hospitals: hospitals ?? []
	};
};

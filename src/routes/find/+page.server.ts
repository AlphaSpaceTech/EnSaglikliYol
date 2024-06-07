import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: cities } = await supabase.from('cities').select('name').limit(81);
	// city id
	const { data: cityId } = await supabase.from('cities').select('id').limit(81);
	const { data: provinces } = await supabase.from('provinces').select('*');
	const { data: hospitals } = await supabase.from('hospitals').select('*').limit(13244);

	return {
		cities: cities ?? [],
		cityId: cityId ?? [],
		provinces: provinces ?? [],
		hospitals: hospitals ?? []
	};
};

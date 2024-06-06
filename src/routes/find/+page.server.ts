import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: cities } = await supabase.from('cities').select('name').limit(81);
	// city id
	const { data: cityId } = await supabase.from('cities').select('id').limit(81);
	const { data: provinces } = await supabase.from('provinces').select('*');

	return {
		cities: cities ?? [],
		cityId: cityId ?? [],
		provinces: provinces ?? []
	};
};
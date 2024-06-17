import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: cities } = await supabase.from('cities').select('*');
	const { data: provinces } = await supabase.from('provinces').select('*');
	const { data: hospitals } = await supabase.from('hospitals').select('*');
	const { data: reviews } = await supabase.from('user_reviews').select('*');
	const { data: doctors } = await supabase.from('doctors').select('*');
	const { data: attractions } = await supabase.from('attractions').select('*').limit(5);
	const { data: userID } = await supabase.auth.getUser();

	return {
		cities: cities ?? [],
		provinces: provinces ?? [],
		hospitals: hospitals ?? [],
		userID: userID ?? [],
		reviews: reviews ?? [],
		doctors: doctors ?? [],
		attractions: attractions ?? []
	};
};

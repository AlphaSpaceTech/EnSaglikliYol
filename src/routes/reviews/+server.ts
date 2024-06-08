import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export function GET() {
	let reviews;
	const load = async ({ locals: { supabase } }) => {
		reviews = supabase.from('user_reviews').select('*');
	};
	console.log(reviews);
	return json('1');
}

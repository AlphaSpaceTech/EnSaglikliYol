export type User = {
	email: string;
	name: string;
};

export type PageData = {
	notes: any;
	supabase: any;
	user: User;
};

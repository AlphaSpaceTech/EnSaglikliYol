// In your $types.ts file
export type User = {
	email: string;
	name: string; // Add this line
	// Add any other properties you need
};

export type PageData = {
	notes: any;
	supabase: any;
	user: User;
};

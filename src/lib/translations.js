import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import(`$lib/translations/en/common.json`)).default
		},
		{
			locale: 'en',
			key: 'appointments',
			loader: async () => (await import(`$lib/translations/en/appointments.json`)).default
		},
		{
			locale: 'en',
			key: 'auth',
			loader: async () => (await import(`$lib/translations/en/auth.json`)).default
		},
		{
			locale: 'en',
			key: 'book',
			loader: async () => (await import(`$lib/translations/en/book.json`)).default
		},
		{
			locale: 'en',
			key: 'find',
			loader: async () => (await import(`$lib/translations/en/find.json`)).default
		},
		{
			locale: 'en',
			key: 'review',
			loader: async () => (await import(`$lib/translations/en/review.json`)).default
		},
		{
			locale: 'en',
			key: 'hospital',
			loader: async () => (await import(`$lib/translations/en/hospital.json`)).default
		},
		{
			locale: 'en',
			key: 'refresh',
			loader: async () => (await import(`$lib/translations/en/refresh.json`)).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);

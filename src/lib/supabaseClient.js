import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://purxbenidnpawcrjbxbj.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1cnhiZW5pZG5wYXdjcmpieGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNzk5NjQsImV4cCI6MjAzMDg1NTk2NH0.3RSCjinejQuD3nsD4mxyumISEOdubL8ZfVxKpKKJ_GA'
);

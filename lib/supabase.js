import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jsyjwaykeuntnlrdzxkxb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeWp3YXlrZXVudG1scmR6a3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMDc4NDgsImV4cCI6MjEwOTc4Mzg0OH0.RdkavYikBswLH7Pqxv0P8hReTDB0XO5JIBRLayMJNyY'
export const supabase = createClient(supabaseUrl, supabaseKey)

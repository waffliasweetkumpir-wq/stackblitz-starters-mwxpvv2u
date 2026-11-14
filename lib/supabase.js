import { createClient } from '@supabase/supabase-js'
const supabaseUrl = typeof window !== 'undefined' ? window.location.origin + '/api/supabase' : 'https://www.waffliasweetkumpir.com/api/supabase'
const supabaseKey = 'sb_publishable_EhxH_5RpvP5jOTZwjQjpmw_thFKsArV'
export const supabase = createClient(supabaseUrl, supabaseKey)

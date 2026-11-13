import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jsyjwaykeuntnlrdzxkxb.supabase.co'
const supabaseKey = 'sb_publishable_EhxH_5RpvP5jOTZwjQjpmw_thFKsArV'
export const supabase = createClient(supabaseUrl, supabaseKey)

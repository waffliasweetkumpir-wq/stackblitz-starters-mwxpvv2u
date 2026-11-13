import { createClient } from '@supabase/supabase-js'
// Türkiye'de supabase.co DNS engeli var, o yüzden site kendi üzerinden (Vercel proxy) Supabase'e bağlanıyor
// Tarayıcı hiç supabase.co'ya dokunmuyor, waffliasweetkumpir.com/api/supabase üzerinden gidiyor
const supabaseUrl = 'https://waffliasweetkumpir.com/api/supabase'
const supabaseKey = 'sb_publishable_EhxH_5RpvP5jOTZwjQjpmw_thFKsArV'
export const supabase = createClient(supabaseUrl, supabaseKey)

export const runtime = 'nodejs';

const SUPABASE_URL = 'https://jsyjwaykeuntmlrdzkxb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EhxH_5RpvP5jOTZwjQjpmw_thFKsArV';

async function proxy(req: Request, ctx: any) {
  try {
    const p = await ctx.params;
    const path = (p?.path || []).join('/');
    const url = new URL(req.url);
    const target = SUPABASE_URL + '/' + path + url.search;

    const headers = new Headers();
    const apikey = req.headers.get('apikey');
    const auth = req.headers.get('authorization');
    const contentType = req.headers.get('content-type');
    const clientInfo = req.headers.get('x-client-info');
    if (apikey) headers.set('apikey', apikey);
    else headers.set('apikey', SUPABASE_KEY);
    if (auth) headers.set('authorization', auth);
    else headers.set('authorization', 'Bearer ' + SUPABASE_KEY);
    if (contentType) headers.set('content-type', contentType);
    if (clientInfo) headers.set('x-client-info', clientInfo);

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const body = hasBody ? await req.text() : undefined;

    const res = await fetch(target, { method: req.method, headers, body });
    const text = await res.text();
    return new Response(text, { status: res.status, headers: { 'content-type': res.headers.get('content-type') || 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'proxy_error', message: e?.message || 'fetch failed' }), { status: 502, headers: { 'content-type': 'application/json' } });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS };

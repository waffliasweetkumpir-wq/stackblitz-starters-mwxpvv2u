export const runtime = 'nodejs';

const SUPABASE_URL = 'https://jsyjwaykeuntnlrdzxkxb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EhxH_5RpvP5jOTZwjQjpmw_thFKsArV';

async function proxy(req: Request, ctx: any) {
  try {
    const p = await ctx.params;
    const path = (p?.path || []).join('/');
    const url = new URL(req.url);
    const target = SUPABASE_URL + '/' + path + url.search;

    const headers: Record<string, string> = {};
    const apikey = req.headers.get('apikey') || SUPABASE_KEY;
    const auth = req.headers.get('authorization') || 'Bearer ' + SUPABASE_KEY;
    headers['apikey'] = apikey;
    headers['authorization'] = auth;
    const ct = req.headers.get('content-type');
    if (ct) headers['content-type'] = ct;
    const ci = req.headers.get('x-client-info');
    if (ci) headers['x-client-info'] = ci;

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const body = hasBody ? await req.arrayBuffer() : undefined;

    const res = await fetch(target, { method: req.method, headers, body });
    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'proxy_error', message: String(e?.message || e) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS };

export const runtime = 'nodejs';

const SUPABASE_URL = 'https://jsyjwaykeuntnlrdzxkxb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EhxH_5RpvP5jOTZwjQjpmw_thFKsArV';

async function proxy(req: Request, ctx: any) {
  const p = await ctx.params;
  const path = (p?.path || []).join('/');
  const url = new URL(req.url);
  const target = SUPABASE_URL + '/' + path + url.search;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('connection');
  headers.delete('content-length');
  if (!headers.get('apikey')) headers.set('apikey', SUPABASE_KEY);
  if (!headers.get('authorization')) headers.set('authorization', 'Bearer ' + SUPABASE_KEY);

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const res = await fetch(target, { method: req.method, headers, body });

  return new Response(res.body, { status: res.status, headers: res.headers });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS };

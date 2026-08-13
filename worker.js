// Optional Cloudflare Worker proxy if browser CORS blocks either public API.
// Deploy this Worker, then change kalshiBase / coinbaseBase in index.html to:
//   https://YOUR-WORKER.workers.dev/kalshi
//   https://YOUR-WORKER.workers.dev/coinbase
export default {
  async fetch(request) {
    const url = new URL(request.url);
    let upstream;
    if (url.pathname.startsWith("/kalshi/")) {
      upstream = "https://external-api.kalshi.com/trade-api/v2/" + url.pathname.slice(8) + url.search;
    } else if (url.pathname.startsWith("/coinbase/")) {
      upstream = "https://api.exchange.coinbase.com/" + url.pathname.slice(10) + url.search;
    } else {
      return new Response("Use /kalshi/... or /coinbase/...", {status:404});
    }
    const r = await fetch(upstream, {headers: {"Accept":"application/json","User-Agent":"KalshiCryptoEdge/1.0"}});
    const h = new Headers(r.headers);
    h.set("Access-Control-Allow-Origin","*");
    h.set("Cache-Control","no-store");
    return new Response(r.body,{status:r.status,headers:h});
  }
}

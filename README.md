# Kalshi Crypto Edge — installable phone app

This is a read-only Progressive Web App (PWA). It:
- pulls BTC / ETH / SOL / XRP spot and 1-minute candles from Coinbase Exchange;
- calculates the same transparent momentum/volatility model used in the phone Python prototype;
- searches open Kalshi markets and tries to auto-detect the nearest matching crypto market;
- reads Kalshi YES/NO executable ask prices;
- calculates model edge;
- returns BUY YES, BUY NO, or PASS only when the configured minimum edge is reached.

It DOES NOT place orders and contains no Kalshi credentials.

## Fastest way to use it on iPhone

1. Put these files on any HTTPS static host (GitHub Pages, Cloudflare Pages, Netlify, etc.).
2. Open the hosted URL in Safari.
3. Tap Share → Add to Home Screen.
4. Launch "Kalshi Edge" like a normal app.

## If the page says CORS/data error

Some browsers/hosts may block direct cross-origin API requests. `worker.js` is an optional Cloudflare Worker proxy:
1. Create a free Cloudflare Worker.
2. Paste `worker.js`.
3. Deploy it.
4. In `index.html`, change:
   kalshiBase: "https://external-api.kalshi.com/trade-api/v2"
   coinbaseBase: "https://api.exchange.coinbase.com"
   to:
   kalshiBase: "https://YOUR-WORKER.workers.dev/kalshi"
   coinbaseBase: "https://YOUR-WORKER.workers.dev/coinbase"

## Important

The model probability is heuristic, not statistically calibrated. "Edge" is model probability minus the current ask and does not include fees/slippage. Verify the Kalshi contract rules and settlement condition before acting on a signal.

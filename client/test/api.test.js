const API = process.env.API_URL;

if (!API) {
console.error("API_URL is not defined");
process.exit(1);
}

(async () => {
try {
console.log("🔗 Hitting API:", API);
const res = await fetch(API);

console.log("Status:", res.status);

if (!res.ok) {
  throw new Error(`Request failed with status ${res.status}`);
}

console.log("✅ API is reachable");
} catch (err) {
console.error("❌ API test failed:", err.message);
process.exit(1);
}
})();
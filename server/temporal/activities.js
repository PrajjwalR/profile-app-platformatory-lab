const fetch = require("node-fetch");

async function sendToCrudCrud(profile) {
  const crudCrudUrl = "https://crudcrud.com/api/YOUR_API_KEY/profile"; // Replace with your API key
  const res = await fetch(crudCrudUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to send to crudcrud");
  return await res.json();
}

module.exports = { sendToCrudCrud };

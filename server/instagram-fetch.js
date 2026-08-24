#!/usr/bin/env node
// server/instagram-fetch.js
// Simple Express server that serves static site and a lightweight /api/instagram endpoint
// Configure via environment variables: INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;

app.use(express.static(path.join(__dirname, '..')));

async function fetchInstagramData() {
  if (!ACCESS_TOKEN || !USER_ID) return null;
  try {
    const fields = 'id,caption,media_url,media_type,permalink,timestamp';
    const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&access_token=${ACCESS_TOKEN}&limit=12`;
    const r = await fetch(url);
    if (!r.ok) {
      const txt = await r.text();
      throw new Error(txt);
    }
    const mediaJson = await r.json();

    let profile = { username: 'draps_et_douceurs' };
    try {
      const profileUrl = `https://graph.instagram.com/me?fields=username,media_count&access_token=${ACCESS_TOKEN}`;
      const p = await fetch(profileUrl);
      if (p.ok) profile = await p.json();
    } catch (e) {
      // ignore profile errors
    }

    return { profile, media: mediaJson.data || [] };
  } catch (err) {
    throw err;
  }
}

app.get('/api/instagram', async (req, res) => {
  try {
    const data = await fetchInstagramData();
    if (!data) return res.status(400).json({ error: 'INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID not set' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
  console.log(`Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to enable /api/instagram`);
});

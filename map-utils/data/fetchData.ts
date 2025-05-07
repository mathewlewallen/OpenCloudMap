import "dotenv/config";      

import fetch from "node-fetch";                        // HTTP client
import { promises as fs } from "fs";                  // write JSON files
import path from "path";

const ENDPOINTS = {
  airports: "airports",
  airspaces: "airspaces",
  navaids: "navaids",
} as const;

type Endpoint = keyof typeof ENDPOINTS;

interface ApiResponse<T> {
  limit: number;
  totalCount: number;
  totalPages: number;
  nextPage: number | null;
  page: number;
  items: T[];
}

const API_HOST = "https://api.core.openaip.net/api";
const API_KEY = "06b7aeb6ce482ffe3fd8110690a93637";
if (!API_KEY) throw new Error("Please set OPENAIP_API in your .env");
const LIMIT = 1000;

/** Fetch one page of data from the given endpoint */
async function fetchPage<T>(endpoint: Endpoint, page: number): Promise<ApiResponse<T>> {
  const url = `${API_HOST}/${endpoint}?limit=${LIMIT}&page=${page}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-openaip-api-key": API_KEY,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to fetch ${endpoint} page ${page}: ${res.status} – ${body}`);
  }
  return res.json() as Promise<ApiResponse<T>>;
}

/** Fetch _all_ pages and return a flat array */
async function fetchAll<T>(endpoint: Endpoint): Promise<T[]> {
  const all: T[] = [];
  let resp = await fetchPage<T>(endpoint, 1);
  all.push(...resp.items);

  while (resp.nextPage) {
    resp = await fetchPage<T>(endpoint, resp.nextPage);
    all.push(...resp.items);
  }

  console.log(`✅ Fetched ${all.length} items from ${endpoint}`);
  return all;
}

async function writeJsonFile<T>(endpoint: Endpoint, items: T[]) {
  const outDir = path.resolve(__dirname);
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${endpoint}.json`);
  await fs.writeFile(outFile, JSON.stringify(items, null, 2), "utf-8");
  console.log(`💾 Written ${items.length} records to ${outFile}`);
}

async function main() {
  try {
    for (const endpoint of Object.keys(ENDPOINTS) as Endpoint[]) {
      // 1) Fetch everything
      const items = await fetchAll<any>(endpoint);
      // 2) Dump to JSON file
      await writeJsonFile(endpoint, items);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();

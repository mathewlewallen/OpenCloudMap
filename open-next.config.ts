import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/kv-cache";
import d1TagCache from "@opennextjs/cloudflare/d1-tag-cache";
import memoryQueue from "@opennextjs/cloudflare/memory-queue";

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  tagCache: d1TagCache,
  queue: memoryQueue,
});

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/kv-cache";
import D1NextModeTagCache from "@opennextjs/cloudflare/d1-tag-cache";
import memoryQueue from "@opennextjs/cloudflare/memory-queue";

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  tagCache: D1NextModeTagCache,
  queue: memoryQueue,
});

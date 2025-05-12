"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export type ReactionType = "like" | "heart" | "celebrate" | "insightful";

const VALID: ReactionType[] = [
  "like",
  "heart",
  "celebrate",
  "insightful",
];

type CreateContactResponse = {
  success: boolean;
  error?: string;
};

// 1️⃣ incrementViewCount
export async function incrementViewCount(slug: string) {
  const db = await createClient();
  const { data: existing } = await db
    .from("article_views")
    .select("view_count")
    .eq("slug", slug)
    .single();

  if (existing) {
    await db
      .from("article_views")
      .update({
        view_count: existing.view_count + 1,
        last_viewed_at: new Date().toISOString(),
      })
      .eq("slug", slug);
    revalidatePath(`/docs/${slug}`);
    return existing.view_count + 1;
  }

  await db.from("article_views").insert({
    slug,
    view_count: 1,
    last_viewed_at: new Date().toISOString(),
  });
  revalidatePath(`/docs/${slug}`);
  return 1;
}

// 2️⃣ getArticleReactions
export async function getArticleReactions(slug: string) {
  const db = await createClient();
  const { data } = await db
    .from("article_reactions")
    .select("reaction_type, count")
    .eq("article_slug", slug);

  const counts: Record<ReactionType, number> = {
    like: 0,
    heart: 0,
    celebrate: 0,
    insightful: 0,
  };
  data?.forEach((row) => {
    if (VALID.includes(row.reaction_type))
      counts[row.reaction_type as ReactionType] = row.count;
  });
  return counts;
}

// 3️⃣ getUserReactions
export async function getUserReactions(slug: string) {
  const store = await cookies();
  const val = store.get(`article_reactions_${slug}`)?.value;
  if (!val) return [] as ReactionType[];
  try {
    return JSON.parse(val) as ReactionType[];
  } catch {
    return [];
  }
}

// 4️⃣ toggleReaction
export async function toggleReaction(
  slug: string,
  reactionType: ReactionType
) {
  const db = await createClient();
  const store = await cookies();

  // ensure valid
  if (!VALID.includes(reactionType)) {
    return { success: false, error: "Invalid reaction type" };
  }

  // visitor_id cookie
  let visitor = store.get("visitor_id")?.value;
  if (!visitor) {
    visitor = uuidv4();
    store.set("visitor_id", visitor, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 365 * 24 * 3600 * 1000),
    });
  }

  const key = `article_reactions_${slug}`;
  const raw = store.get(key)?.value;
  let userReacts: ReactionType[] = raw ? JSON.parse(raw) : [];

  const has = userReacts.includes(reactionType);

  // upsert in DB
  if (has) {
    // remove
    userReacts = userReacts.filter((r) => r !== reactionType);
    const { data: existing } = await db
      .from("article_reactions")
      .select("count")
      .eq("article_slug", slug)
      .eq("reaction_type", reactionType)
      .single();

    if (existing && existing.count > 1) {
      await db
        .from("article_reactions")
        .update({
          count: existing.count - 1,
          updated_at: new Date().toISOString(),
        })
        .eq("article_slug", slug)
        .eq("reaction_type", reactionType);
    } else {
      await db
        .from("article_reactions")
        .delete()
        .eq("article_slug", slug)
        .eq("reaction_type", reactionType);
    }
  } else {
    // add
    userReacts.push(reactionType);
    const { data: existing } = await db
      .from("article_reactions")
      .select("count")
      .eq("article_slug", slug)
      .eq("reaction_type", reactionType)
      .single();

    if (existing) {
      await db
        .from("article_reactions")
        .update({
          count: existing.count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("article_slug", slug)
        .eq("reaction_type", reactionType);
    } else {
      await db.from("article_reactions").insert({
        article_slug: slug,
        reaction_type: reactionType,
        count: 1,
      });
    }
  }

  // write updated cookie
  store.set(key, JSON.stringify(userReacts), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  });

  // revalidate the page
  revalidatePath(`/blog/${slug}`);

  return {
    success: true,
    added: !has,
    removed: has,
    userReactions: userReacts,
  };
}

export async function createContact(email: string): Promise<CreateContactResponse> {
  try {
    const response = await fetch(
      "https://app.loops.so/api/v1/contacts/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        },
        body: JSON.stringify({ email, userGroup: "Blogfolio" }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create contact");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create contact" };
  }
}
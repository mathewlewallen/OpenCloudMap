"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleReaction, type ReactionType } from "@/lib/actions";
import { motion } from "motion/react";

interface Props {
  slug: string;
  initialReactions: Record<ReactionType, number>;
  initialUserReactions: ReactionType[];
}

export default function ArticleReactions({
  slug,
  initialReactions,
  initialUserReactions,
}: Props) {
  const router = useRouter();
  const [counts, setCounts] = useState(initialReactions);
  const [userReacts, setUserReacts] = useState(initialUserReactions);
  const [loading, setLoading] = useState<ReactionType | null>(null);

  const handle = async (r: ReactionType) => {
    if (loading) return;
    setLoading(r);

    // optimistic
    const had = userReacts.includes(r);
    setUserReacts((u) => (had ? u.filter((x) => x !== r) : [...u, r]));
    setCounts((c) => ({
      ...c,
      [r]: had ? Math.max(0, c[r] - 1) : c[r] + 1,
    }));

    const res = await toggleReaction(slug, r);
    setLoading(null);

    if (!res.success) {
      // revert on error
      if (had) {
        setUserReacts((u) => [...u, r]);
        setCounts((c) => ({ ...c, [r]: c[r] + 1 }));
      } else {
        setUserReacts((u) => u.filter((x) => x !== r));
        setCounts((c) => ({ ...c, [r]: Math.max(0, c[r] - 1) }));
      }
      console.error(res.error);
    } else {
      // refresh to pick up any other changes
      router.refresh();
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {Object.entries(counts).map(([type, num]) => {
        const active = userReacts.includes(type as ReactionType);
        return (
          <motion.button
            key={type}
            onClick={() => handle(type as ReactionType)}
            disabled={!!loading}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
              active
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {/* you can swap these placeholders for your SVGs */}
            <span>{type}</span>
            {num > 0 && <span>{num}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}

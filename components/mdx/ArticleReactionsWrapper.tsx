import ArticleReactions from "@/components/mdx/ArticleReactions";
import {
  getArticleReactions,
  getUserReactions,
} from "@/lib/actions";

export default async function ArticleReactionWrapper({
  slug,
}: {
  slug: string;
}) {
  const initialReactions = await getArticleReactions(slug);
  const initialUserReactions = await getUserReactions(slug);

  return (
    <ArticleReactions
      slug={slug}
      initialReactions={initialReactions}
      initialUserReactions={initialUserReactions}
    />
  );
}

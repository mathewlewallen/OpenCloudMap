"use client";

import React, { useState, useEffect, Fragment } from "react";
import { MDXProvider } from "@mdx-js/react";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

import {
  Table,
  CustomLink,
  RoundedImage,
  Callout,
  ProsCard,
  ConsCard,
  Code,
  Pre,
  OrderedList,
  UnorderedList,
  ListItem,
  IdeaQuote,
  InfoQuote,
  ThoughtQuote,
  WarningQuote,
  createHeading,
} from "@/components/mdx/mdx";

// your sharedComponents map
const sharedComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  a: CustomLink,
  img: RoundedImage,
  Image: RoundedImage,
  Table,
  Callout,
  ProsCard,
  ConsCard,
  code: Code,
  pre: Pre,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  Ideaquote: IdeaQuote,
  Infoquote: InfoQuote,
  Thoughtquote: ThoughtQuote,
  Warningquote: WarningQuote,
};

interface MDXProps {
  code: string; // the `function-body` string you got from `compile()`
  components?: Record<string, React.ComponentType>;
}

export default function MDXContent({ code, components }: MDXProps) {
  const [mod, setMod] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 1) Strip any top‐level `import`/`export` lines
      const sanitized = code
        .split("\n")
        .filter((line) => !/^\s*(import|export)\s/.test(line))
        .join("\n");

      // 2) Run the MDX
      const result = await run(sanitized, {
        ...runtime,
        baseUrl: window.location.href,
      });

      if (!cancelled) setMod(result);
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  const Content = mod?.default || Fragment;

  return (
    <MDXProvider components={{ ...sharedComponents, ...(components || {}) }}>
      <Content />
    </MDXProvider>
  );
}

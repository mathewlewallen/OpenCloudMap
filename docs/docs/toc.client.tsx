'use client';
import React from "react";
import Link from "next/link";

export type TocItem = { level: number; text: string; href: string };

interface Props {
  items: TocItem[];
}

export default function TocClient({ items }: Props) {
  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href} style={{ marginLeft: (item.level - 2) * 8 }}>
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-primary"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

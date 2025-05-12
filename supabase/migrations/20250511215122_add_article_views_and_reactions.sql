create type public.reaction_type_enum as enum (
  'like', 'heart', 'celebrate', 'insightful'
);

create table public.article_views (
  slug           text                    primary key,
  view_count     integer   not null      default 0,
  last_viewed_at timestamptz not null     default now()
);

create table public.article_reactions (
  article_slug   text                         not null,
  reaction_type  public.reaction_type_enum    not null,
  count          integer      not null       default 0,
  created_at     timestamptz  not null       default now(),
  updated_at     timestamptz  not null       default now(),
  primary key (article_slug, reaction_type),
  constraint fk_article_views
    foreign key (article_slug)
    references public.article_views (slug)
    on delete cascade
);

create index idx_article_reactions_article_slug
  on public.article_reactions (article_slug);

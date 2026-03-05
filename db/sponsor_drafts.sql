create table if not exists public.sponsor_drafts (
  id bigserial primary key,
  draft_id text not null unique,
  data jsonb not null default '{}'::jsonb,
  submitted jsonb not null default '{}'::jsonb,
  active_index integer not null default 0,
  query text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists sponsor_drafts_updated_at_idx on public.sponsor_drafts (updated_at desc);

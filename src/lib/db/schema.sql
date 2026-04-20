create table if not exists newsletter_subscriptions (
  id bigserial primary key,
  email text not null unique,
  source text not null default 'website',
  recaptcha_score numeric(4, 3),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_requests (
  id bigserial primary key,
  full_name text not null,
  work_email text not null,
  company_name text not null,
  phone text not null,
  company_size text not null,
  industry text not null,
  use_case text not null,
  source text not null default 'website',
  recaptcha_score numeric(4, 3),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists demo_requests_created_at_idx
  on demo_requests (created_at desc);

create index if not exists newsletter_subscriptions_created_at_idx
  on newsletter_subscriptions (created_at desc);

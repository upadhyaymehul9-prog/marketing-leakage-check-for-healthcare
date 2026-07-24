-- Leads captured by the marketing/brand self-audit email gate.
create table if not exists public.marketing_audit_leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  hospital_name    text not null,
  email            text not null,
  phone            text,
  overall_health   text,
  marketing_health text,
  brand_health     text,
  answered_count   integer,
  total_count      integer,
  completion       numeric
);

-- RLS on. The public (anon) client may INSERT leads but may NOT read,
-- update, or delete them. Reads happen from the dashboard / a service-role backend.
alter table public.marketing_audit_leads enable row level security;

create policy "public can insert audit leads"
  on public.marketing_audit_leads
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT/UPDATE/DELETE policy is defined, so RLS denies those to anon by default.

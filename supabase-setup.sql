-- Run this in Supabase SQL Editor
-- This creates the tables and storage bucket needed by the academy site.

create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.student_resources (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('video', 'pdf')),
  title text not null,
  description text not null default '',
  url text not null,
  batch text not null default 'General',
  updated_at timestamptz not null default now()
);

-- Safe to run on an existing project created before batch-specific resources.
alter table public.student_resources
  add column if not exists batch text not null default 'General';

create table if not exists public.student_access (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text not null,
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.student_resources enable row level security;
alter table public.student_access enable row level security;

create policy "site_content_all_access"
  on public.site_content
  for all
  using (true)
  with check (true);

create policy "student_resources_all_access"
  on public.student_resources
  for all
  using (true)
  with check (true);

create policy "student_access_all_access"
  on public.student_access
  for all
  using (true)
  with check (true);

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "site_media_public_read"
  on storage.objects for select
  using (bucket_id = 'site-media');

create policy "site_media_public_write"
  on storage.objects for insert
  with check (bucket_id = 'site-media');

create policy "site_media_public_update"
  on storage.objects for update
  using (bucket_id = 'site-media')
  with check (bucket_id = 'site-media');

create policy "site_media_public_delete"
  on storage.objects for delete
  using (bucket_id = 'site-media');

-- Create Profiles table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  phone text,
  role text check (role in ('passenger', 'driver')) default 'passenger',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create Vehicles table
create table public.vehicles (
  id uuid default uuid_generate_v4() primary key,
  driver_id uuid references public.profiles(id) not null,
  model text not null,
  plate text not null,
  color text,
  year integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Vehicles
alter table public.vehicles enable row level security;

create policy "Vehicles are viewable by everyone."
  on vehicles for select
  using ( true );

create policy "Drivers can insert their own vehicles."
  on vehicles for insert
  with check ( auth.uid() = driver_id );

create policy "Drivers can update their own vehicles."
  on vehicles for update
  using ( auth.uid() = driver_id );


-- Create Rides table
create table public.rides (
  id uuid default uuid_generate_v4() primary key,
  passenger_id uuid references public.profiles(id) not null,
  driver_id uuid references public.profiles(id),
  pickup_lat float not null,
  pickup_lng float not null,
  pickup_address text,
  dropoff_lat float not null,
  dropoff_lng float not null,
  dropoff_address text,
  status text check (status in ('requested', 'accepted', 'in_progress', 'completed', 'canceled')) default 'requested',
  price decimal(10, 2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Rides
alter table public.rides enable row level security;

create policy "Users can view their own rides (as passenger or driver)"
  on rides for select
  using ( auth.uid() = passenger_id or auth.uid() = driver_id );

create policy "Passengers can create rides"
  on rides for insert
  with check ( auth.uid() = passenger_id );

create policy "Participants can update rides"
  on rides for update
  using ( auth.uid() = passenger_id or auth.uid() = driver_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

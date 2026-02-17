-- Profile Automation
-- This script should be run in the Supabase SQL Editor

-- 1. Create Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT
);

-- 2. Create Trigger Function for New User
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach Trigger to auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Delete-on-Read Trigger (Assumes a 'snaps' table exists, creating it if not for completeness)
CREATE TABLE IF NOT EXISTS public.snaps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES auth.users(id),
    receiver_id UUID REFERENCES auth.users(id),
    media_url TEXT,
    is_viewed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION delete_snap_on_view() RETURNS TRIGGER AS $$
BEGIN
    -- Delete the snap record
    DELETE FROM public.snaps WHERE id = NEW.id;
    -- Note: You would also typically trigger a Storage deletion here or via an Edge Function
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_delete_on_read
AFTER UPDATE ON public.snaps
FOR EACH ROW
WHEN (NEW.is_viewed = TRUE)
EXECUTE FUNCTION delete_snap_on_view();

-- 5. Game High Scores Table (for 'Neon Head-Dodge')
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS high_score INTEGER DEFAULT 0;

-- Update handle_new_user to check for admin email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  -- Create default subscription (inactive)
  INSERT INTO public.subscriptions (user_id, status)
  VALUES (NEW.id, 'inactive');
  
  -- Check if this email should be admin (founder email)
  IF NEW.email = 'jolletkubayi@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    -- Create default role (student)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Add RLS policy for admins to view all subscriptions
CREATE POLICY "Admins can view all subscriptions"
ON public.subscriptions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add RLS policy for admins to update all subscriptions
CREATE POLICY "Admins can update all subscriptions"
ON public.subscriptions
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add RLS policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
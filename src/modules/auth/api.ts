import { createClient } from '@/lib/supabase/client';

export async function sendOtp(phone: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({ phone });
  return { error: error?.message ?? null };
}

export async function verifyOtp(
  phone: string,
  token: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  });
  return { error: error?.message ?? null };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

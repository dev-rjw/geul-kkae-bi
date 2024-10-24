import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_API_URL!, process.env.NEXT_PUBLIC_SUPABASE_API_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
};
export const getIsLogin = async () => {
  const serverClient = await createClient();
  const {
    data: { session },
  } = await serverClient.auth.getSession();
  return !!session;
};

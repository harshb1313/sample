import { initTRPC, TRPCError } from '@trpc/server';
import { auth0 } from '@/lib/auth0';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createContext() {
  let session = null;
  try {
    session = await auth0.getSession(); // App Router: no req/res needed
  } catch {
    console.log('No session found');
  }

  return {
    user: session?.user || null,
    supabase,
  };
}

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

// Middleware for protected routes
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in',
    });
  }
  return next({ ctx });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

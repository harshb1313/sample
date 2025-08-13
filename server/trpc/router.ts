import { router, publicProcedure, protectedProcedure } from './context';
import { z } from 'zod';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => ({ greeting: `Hello ${input.name ?? 'Vox'}! TRPC is working.` })),

  getMessages: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data } = await ctx.supabase
        .from('messages')
        .select('*')
        .eq('user_id', input.userId)
        .order('created_at', { ascending: true });
      return data;
    }),

  addMessage: protectedProcedure
    .input(z.object({ userId: z.string(), content: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { data } = await ctx.supabase
        .from('messages')
        .insert([{ ...input }])
        .select();
      return data;
    }),
});

export type AppRouter = typeof appRouter;

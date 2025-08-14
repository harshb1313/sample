import { router, protectedProcedure } from "./context";
import { z } from "zod";

export const appRouter = router({
  askLLM: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Call Gemini API with correct endpoint and format
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: input.prompt
                }]
              }],
              generationConfig: {
                maxOutputTokens: 256,
                temperature: 0.7,
              }
            }),
          }
        );

        if (!res.ok) {
          throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        
        // Extract generated text with proper error handling
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";

        // Save to Supabase
        const { error } = await ctx.supabase.from("messages").insert([
          {
            user_id: ctx.user!.sub,
            content: reply,
            role: "assistant",
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          console.error("Supabase error:", error);
          throw new Error("Failed to save message to database");
        }

        return { reply };
      } catch (error) {
        console.error("askLLM error:", error);
        throw new Error(`Failed to process request: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),
});

export type AppRouter = typeof appRouter;
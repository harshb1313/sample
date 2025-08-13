import { appRouter } from '@/server/trpc/router';
import { createContext } from '@/server/trpc/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const GET = (req: Request) => {
  return fetchRequestHandler({
    req,
    router: appRouter,
    createContext,
    endpoint: '/api/trpc', // required for TRPC v11 fetch adapter
  });
};

export const POST = (req: Request) => {
  return fetchRequestHandler({
    req,
    router: appRouter,
    createContext,
    endpoint: '/api/trpc', // required for TRPC v11 fetch adapter
  });
}
import {
  createRouter as createTanStackRouter,
  Link,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Button } from "./components/ui/button";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-sans">
        <h1 className="text-9xl font-bold tracking-tighter">404</h1>
        <p className="text-xl font-medium mt-4 text-muted-foreground">
          Page not found
        </p>
        <Link to="/">
          <Button size="lg" className="mt-8">
            Go back home
          </Button>
        </Link>
      </div>
    ),
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

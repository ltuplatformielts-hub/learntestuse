import wpPostsApi from "#/api/wp-posts.api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test/")({
  staticData: {
    hideLayout: true,
  },
  component: RouteComponent,
  loader: async () => {
    const res = await wpPostsApi.getPosts(2);
    return res.data;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  console.log("Posts data:", data);
  return (
    <div>
      <ul>
        {data.data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

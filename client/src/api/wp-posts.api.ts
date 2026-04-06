import baseApiClient from "./base.api";

const wpPostsApi = {
  getPosts: (page: number = 1) =>
    baseApiClient.get("/wp-posts", { params: { page } }),
};

export default wpPostsApi;

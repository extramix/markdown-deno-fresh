import { Handlers } from "$fresh/server.ts";
import { parse } from "@std/yaml";

interface PostSummary {
  slug: string;
  title: string;
  date: string;
}

export const handler: Handlers<PostSummary[]> = {
  async GET(_req, ctx) {
    const posts: PostSummary[] = [];
    for await (const entry of Deno.readDir("./content")) {
      if (entry.isFile && entry.name.endsWith(".md")) {
        const slug = entry.name.replace(".md", "");
        const content = await Deno.readTextFile(`./content/${entry.name}`);
        const parts = content.split("---");
        const frontMatter = parse(parts[1]) as { title: string; date: string };
        posts.push({
          slug,
          title: frontMatter.title,
          date: frontMatter.date,
        });
      }
    }
    return ctx.render(posts);
  },
};

export default function BlogIndex({ data }: { data: PostSummary[] }) {
  return (
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Blog</h1>
      <ul>
        {data.map((post) => (
          <li key={post.slug} class="mb-2">
            <a
              class="text-blue-600 hover:underline"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </a>
            <span class="text-gray-500 ml-2">{post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

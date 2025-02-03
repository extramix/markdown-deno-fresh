import { Handlers, PageProps } from "$fresh/server.ts";
import { marked } from "marked";
import { parse } from "@std/yaml";

interface Post {
  title: string;
  date: string;
  content: string;
}

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;

    try {
      const fileContent = await Deno.readTextFile(
        `./content/${slug}.md`,
      );
      const parts = fileContent.split("---");

      if (parts.length < 3) {
        throw new Error("Invalid frontmatter");
      }

      const [, frontmatter, content] = parts;
      frontmatter.trim();
      const metadata = parse(frontmatter) as { title: string; date: string };
      const html = await marked(content);
      const data = { ...metadata, content: html };
      return ctx.render(data);
    } catch (error) {
      console.log(error, "error");
      return ctx.renderNotFound();
    }
  },
};

export default function BlogPost({ data }: PageProps<Post>) {
  console.log(data, "data");
  return (
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">{data.title}</h1>
      <p class="text-gray-500 mb-4">{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}

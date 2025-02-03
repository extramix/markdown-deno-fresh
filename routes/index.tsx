const data = [
  {
    title: "Hello, World!",
    date: "2025-02-03",
    slug: "hello-world",
  },
  {
    title: "Welcome to Fresh!",
    date: "2025-02-03",
    slug: "welcome-to-fresh",
  },
];

export default function Home() {
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

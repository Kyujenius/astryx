export default function BlogPostHeader() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight leading-tight">
        The Future of Design Systems in a Post-AI World
      </h1>
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/48?u=author"
          alt="Sarah Chen"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">Sarah Chen</span>
          <span className="text-xs text-muted-foreground">August 15, 2026</span>
        </div>
      </div>
      <hr className="border-border" />
    </div>
  );
}

export function ContentBar({ items }: { items: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item, index) => (
        <span key={item} className="pill">
          {index > 0 ? "· " : ""}
          {item}
        </span>
      ))}
    </div>
  );
}

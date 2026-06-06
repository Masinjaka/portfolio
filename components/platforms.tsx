import { platforms } from "@/content/data";

export function Platforms() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noreferrer"
          className="muted-link text-sm"
        >
          {platform.name}
        </a>
      ))}
    </div>
  );
}

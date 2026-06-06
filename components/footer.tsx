import { profile } from "@/content/data";
import { Platforms } from "./platforms";

export function Footer() {
  return (
    <footer className="container border-t border-zinc-200 py-8 dark:border-zinc-800">
      <div className="flex flex-col gap-4">
        <Platforms />
        <p className="text-sm leading-6 text-black dark:text-zinc-400">
          © {new Date().getFullYear()} {profile.name}.
        </p>
      </div>
    </footer>
  );
}

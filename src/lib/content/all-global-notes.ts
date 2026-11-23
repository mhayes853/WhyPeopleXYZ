// Eagerly imports every global note. Only import this from places that need
// all of them at once (the `/global-notes` page and server-side code), so that
// other pages don't pull every note into their bundles.
import { slugFromPath, type GlobalNoteModule } from "./global-notes";

export const allGlobalNotes: Record<string, GlobalNoteModule> =
  Object.fromEntries(
    Object.entries(
      import.meta.glob<GlobalNoteModule>("./global-notes/*.svelte", {
        eager: true,
      }),
    ).map(([path, module]) => [slugFromPath(path), module]),
  );

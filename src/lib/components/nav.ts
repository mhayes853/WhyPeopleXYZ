export type NavLink = { href: string; label: string };

export const NAV_LINKS = {
  home: { href: "/", label: "Home" },
  about: { href: "/about", label: "About" },
  now: { href: "/now", label: "Now" },
  globalNotes: { href: "/global-notes", label: "Global Notes" },
} satisfies Record<string, NavLink>;

export type NavLinkName = keyof typeof NAV_LINKS;

export const navLinks = (names: NavLinkName[]): NavLink[] =>
  names.map((name) => NAV_LINKS[name]);

# WhyPeopleXYZ
My personal site for writing mostly.

## Technical Notes
- SvelteKit + Tailwind, previously Vanilla.
  - Idc much about the stack, as this is trivially migratable with agents.
  - Some WASM components may be introduced in the future.
- Each article is a UI component.
  - I write articles externally in a markdown editor, and then tell an agent to convert them into Svelte components directly.
  - There is no server-side step where an article is converted from markdown.
  - This gives maximum flexibility, and makes it easy to add interactivity or JS into an article.
- Hosted on Netlify.

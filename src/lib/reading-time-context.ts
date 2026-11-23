import { getContext, setContext } from "svelte";

const KEY = Symbol("reading-minutes");

/** Provides the reading time (in minutes) of the page being rendered. */
export const setReadingMinutes = (minutes: () => number | undefined) =>
  setContext(KEY, minutes);

/** Reads the reading time provided by the surrounding page, if any. */
export const getReadingMinutes = (): number | undefined =>
  getContext<(() => number | undefined) | undefined>(KEY)?.();

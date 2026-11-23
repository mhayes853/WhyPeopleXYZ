import { describe, expect, it } from "vitest";
import { estimateReadingTime } from "./reading-time";

describe("estimateReadingTime", () => {
  it("returns 0 when the text has no readable words", () => {
    expect(estimateReadingTime("")).toBe(0);
    expect(estimateReadingTime("   \n   ")).toBe(0);
  });

  it("returns 1 minute for short text fragments", () => {
    const shortText = "word ".repeat(50).trim();
    expect(estimateReadingTime(shortText)).toBe(1);
  });

  it("rounds up fractional minute estimates", () => {
    const threeHundredWords = "word ".repeat(300).trim();
    expect(estimateReadingTime(threeHundredWords)).toBe(2);
  });
});

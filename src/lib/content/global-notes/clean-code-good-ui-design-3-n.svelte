<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Clean Code == Good UI Design (3/N)",
    date: "12/11/25",
    anchor: "clean-code-good-ui-design-3-n-",
  };
</script>

<p>
  I’ve been rumaging around through the 2nd edition of the Clean Code
  book (the first 2 parts of this series were written prior to me having
  knowledge of the 2nd edition), and made it to the first code example
  in the book which has to do with roman numerals.
</p>
<p>This is the “unclean” version.</p>
<CodeBlock language="java" code={`

package fromRoman;

import java.util.Arrays;

public class FromRoman {
  public static int convert(String roman) {
    if (roman.contains("VIV") ||
      roman.contains("IVI") ||
      roman.contains("IXI") ||
      roman.contains ("LXL") ||
      roman.contains ("XLX") ||
      roman.contains("XCX") ||
      roman.contains ("DCD") ||
      roman.contains ("CDC") ||
      roman.contains ("MCM")) {
      throw new InvalidRomanNumeralException(roman);
    }
    roman = roman.replace ("IV", "4");
    roman = roman.replace ("IX", "9");
    roman = roman.replace ("XL", "F");
    roman = roman.replace ("XC", "N");
    roman = roman.replace ("CD", "G");
    roman = roman.replace ("CM", "0");
    if (roman.contains "IIII") ||
      roman.contains ("VV") ||
      roman.contains ("XXXX") ||
      roman.contains ("LL") ||
      roman.contains ("CCCC") ||
      roman.contains ("DD") ||
      roman.contains ("MMMM")) {
      throw new InvalidRomanNumeralException(roman);
    }
    int[] numbers = new int [roman.length()];
    int i = 0;
    for (char digit : roman.toCharArray ()) {
      switch (digit) {
        case 'I' -> numbers [i] = 1;
        case 'V' -> numbers [i] = 5;
        case 'X' -> numbers[il = 10;
        case 'L' -> numbers [i] = 50;
        case 'C' -> numbers [i] = 100;
        case 'D' -> numbers [i] = 500;
        case 'M' -> numbers[i] = 1000;
        case '9' -> numbers[i] = 9;
        case 'F' -> numbers[il = 40;
        case 'N' -> numbers[i] = 90;
        case 'G' -> numbers[il = 400;
        case 'O' -> numbers|i] = 900;
        case '4' -> numbers|i] = 4;
        default -> throw new InvalidRomanNumeralException(roman);
      }
      i++;
    }
    int lastDigit = 1000;
    for (int number: numbers) {
      if (number > lastDigit) {
        throw new InvalidRomanNumeralException(roman);
      }
      lastDigit = number;
    }
    return Arrays.stream(numbers).sum();
  }
}
`} />
<p>This is the “clean” version.</p>
<CodeBlock language="java" code={`

package fromRoman;
import java.util.Arraylist;
import java.util.List;
import java.util.Map;

public class FromRoman {
  private String roman;
  private List<Integer> numbers = new Arraylist<>();
  private int charIx;
  private char nextChar;
  private Integer nextValue;
  private Integer value;
  private int nchars;
  Map<Character, Integer> values = Map.of(
    'I', 1,
    'V', 5,
    'X', 10,
    'L', 50,
    'C', 100,
    'D', 500,
    'M', 1000
  );

  public FromRoman(String roman) {
    this.roman = roman;
  }

  public static int convert(String roman) {
    return new FromRoman(roman).doConversion();
  }

  private int doConversion() {
    checkInitialSyntax();
    convertLettersToNumbers();
    checkNumbersInDecreasingOrder();
    return numbers.stream().reduce(0, Integer:: sum);
  }

  private void checkInitialSyntax() {
    checkForIllegalPrefixCombinations();
    checkForImproperRepetitions();
  }

  private void checkForIllegalPrefixCombinations() {
    checkForIllegalPatterns (
      new String[]{"VIV", "IVI", "IXI", "IXV", "IXI", "XIX", "XCX", "XCL", "DCD", "CDC", "CMC", "CMD"}
    );
  }

  private void checkForImproperRepetitions() {
    checkForIllegalPatterns(
      new String[]{"IIII", "VV", "XXXX", "LL", "CCCC", "DD", "MMMM"}
    )
  }

  private void checkForIllegalPatterns(String[] patterns) {
    for (String badstring : patterns)
      if (roman.contains (badstring))
        throw new InvalidRomanNumeralException (roman);
  }

  private void convertlettersToNumbers() {
    char[] chars = roman.toCharArray();
    nchars = chars. length;
    for (charIx = 0; charIx < nchars; charIx++) {
      nextChar = isLastChar() ? 0: chars[charIx + 1];
      nextValue = values.get(nextChar);
      char thisChar = chars[charIx];
      value = values.get(thisChar);
      switch (thisChar) {
        case 'I' -> addvalueConsideringPrefix('V', 'X');
        case 'X' -> addValueConsideringPrefix('L', 'C');
        case 'C' -> addValueConsideringPrefix('D', 'M');
        case 'V', 'I', 'D', 'M' -> numbers.add(value);
        default -> throw new InvalidRomanNumeralException(roman);
      }
    }
  }

  private boolean islastChar() {
    return charIx + 1 == nchars;
  }

  private void addValueConsideringPrefix(char pl, char p2) {
    if (nextChar == pl || nextChar == p2) {
      numbers.add(nextValue - value);
      charIx++;
    } else numbers.add (value);
  }

  private void checkNumbersInDecreasingOrder() {
    for (int i = 0; i < numbers.size() - 1; i++)
      if (numbers.get(i) < numbers.get(i + 1))
        throw new InvalidRomanNumeralException(roman);
  }
}
`} />
<p>And this is “Future Bob’s” comments on the “clean” version.</p>
<blockquote>
  <p>
    Two months later I'm torn. The first version, ugly as it was,
    was not as chopped up as this one. It's true that the names and
    the ordering of the extracted functions read like a story and are a
    big help in understanding the intent; but there were several times
    that I had to scroll back up to the top to assure myself about the
    types of instance variables. I found the choppiness, and the
    scrolling, to be annoying. However, and this is critical, I am
    reading this cleaned code after having first read the ugly version
    and having gone through the work of understanding it. So now, as I
    read this version, I am annoyed because I already understand it and
    find the chopped-up functions and the instance variables redundant.
  </p>
  <p>
    Don't get me wrong, I still think the cleaner version is better.
    I just wasn't expecting the annoyance. When I first cleaned it,
    I thought it was going to be annoyance free.
  </p>
  <p>
    I suppose the question you should ask yourself is which of these two
    pieces of code you would rather have read first. Which tells you
    more about the intent? Which obscures the intent?
  </p>
  <p>Certainly the latter is better in that regard.</p>
  <p>
    This annoyance is an issue that John Ousterhout and I have debated.
    When you understand an algorithm, the artifacts intended to help you
    understand it become annoying. Worse, if you understand an
    algorithm, the names or comments you write to help others will be
    biased by that understanding and may not help the reader as much as
    you think they will. A good example of that, in this code, is the
    <code>addValueConsideringPrefix</code> function. That name made
    perfect sense to me when I understood the algorithm. But it was a
    bit jarring two months later. Perhaps not as jarring as
    <code>49FNGO</code>, but still not quite as obvious as I had hoped
    when I wrote it. It might have been better written as
    <code>numbers.add (decrementValueIfThisCharIsaPrefix);</code> ,
    since that would be symmetrical with the
    <code>numbers.add(value);</code> in the nonprefixed case.
  </p>
  <p>
    The bottom line is that your own understanding of what you are
    cleaning will work against your ability to communicate with the next
    person to come along. And this will be true whether you are
    extracting well-named methods, or adding descriptive comments.
    Therefore, take special care when choosing names and writing
    comments; and don't be surprised if others are annoyed by your
    choices. Lastly, a look after a few months can be both humbling and
    profitable.
  </p>
</blockquote>
<p>
  It’s true that the “cleaned” version does a better job at describing
  the overall <em>process</em> of what is actually going on here,
  especially if you can read the entire thing on one screen. However,
  modern editors will not show you the entirety of the code all at once
  (rather only ~50 lines at a time), hence the scrolling annoyance.
</p>
<p>
  When you scroll, you have to keep the context you can’t see in your
  head. Given that code is a precise artifact, you’ll find that you
  can’t easily hold the code for entire functions in your head. This
  will cause you to constantly stumble and force you to refresh the
  knowledge by scrolling back up to the previous code (or by jumping to
  another file in some cases).
</p>
<p>
  The interesting thing is that in UI design circles, the code would be
  seen as information that needs to be presented with a more clear
  visual hierarchy. Thus, the solution would be to find a way to present
  the literal code itself in a much more intuitive manner (ie. Don’t
  hide the important parts by default!).
</p>
<p>
  In programming circles, we simply blame the programmer for poor UI
  design choices of the editor, and tell them to refactor.
</p>
<p>— {metadata.date}</p>

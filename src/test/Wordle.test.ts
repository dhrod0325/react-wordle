import { INVALID_WORD, WordValidator } from "../domain/WordValidator";
import { WordGenerator } from "../domain/WordGenerator";
import { Word } from "../domain/Word";
import { WordGrid } from "../domain/WordGrid";

class MockWordGenerator implements WordGenerator {
  private readonly word: string;

  constructor(word: string) {
    this.word = word;
  }

  generate(): string {
    return this.word;
  }
}

describe("WordTest", () => {
  test("World 정답 테스트", () => {
    const answer = new MockWordGenerator("hello").generate();
    const input = new Word("hello");

    expect(input.isAnswer(new Word(answer))).toBeTruthy();
  });

  test("Word가 다른 Word와 비교를 올바르게 하는지 테스트", () => {
    const answer = new MockWordGenerator("hello").generate();

    const input = new Word("world");
    const result1 = input.check(new Word(answer));

    expect(result1.map((r) => r.checkResult)).toEqual([
      "FAIL",
      "INCLUDE",
      "FAIL",
      "SUCCESS",
      "FAIL",
    ]);

    const input2 = new Word("power");
    const result2 = input2.check(new Word(answer));

    expect(result2.map((r) => r.checkResult)).toEqual([
      "FAIL",
      "INCLUDE",
      "FAIL",
      "INCLUDE",
      "FAIL",
    ]);
  });

  test("벨리데이터 테스트", () => {
    WordValidator.validate(new Word("hello"));

    try {
      WordValidator.validate(new Word("baboo"));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", INVALID_WORD);
    }
  });

  test("그리드 글자 테스트", () => {
    const check1 = WordGrid(
      WordGrid(WordGrid().inputWord(0, new Word("WORLD"))).checkWord(0, "WORLD")
    );

    "WORLD".split("").forEach((value) => {
      expect(check1.getLetterByText(value)?.checkResult).toEqual("SUCCESS");
    });

    const check2 = WordGrid(
      WordGrid(WordGrid().inputWord(0, new Word("WORLD"))).checkWord(0, "POWER")
    );

    expect(check2.getLetterByText("P")?.checkResult).toEqual(undefined);
    expect(check2.getLetterByText("O")?.checkResult).toEqual("SUCCESS");
    expect(check2.getLetterByText("W")?.checkResult).toEqual("INCLUDE");
    expect(check2.getLetterByText("E")?.checkResult).toEqual(undefined);
    expect(check2.getLetterByText("R")?.checkResult).toEqual("INCLUDE");
  });

  test("그리드 정답 테스트", () => {
    const checker = WordGrid(WordGrid().inputWord(0, new Word("HELLO")));
    expect(checker.isAnswer(0, "HELLO")).toEqual(true);
    expect(checker.isAnswer(0, "BABOO")).toEqual(false);

    const checker2 = WordGrid(WordGrid().inputWord(0, new Word("WORLD")));
    expect(checker2.isAnswer(0, "WORLD")).toEqual(true);
    expect(checker2.isAnswer(0, "BABOO")).toEqual(false);
  });
});

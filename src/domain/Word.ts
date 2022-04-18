import { ALPHABET } from "../constants/ALPHABET";
import { Letter } from "./Letter";
import { SETTING } from "../constants/SETTING";

export class Word {
  private readonly _letters: Letter[];

  constructor(letters: Letter[] | string) {
    if (typeof letters === "string") {
      this._letters = this.parse(letters);
    } else {
      this._letters = letters;
    }
  }

  private parse(letters: string) {
    return letters.split("").map((value, index) => new Letter(value, index));
  }

  public check(targetWord: Word) {
    return this._letters.map(
      (letter) => new Letter(letter.text, letter.position, letter.checkResultByWord(targetWord))
    );
  }

  public isAnswer(targetWord: Word) {
    const answerList = this.check(targetWord).filter((target) => target.checkResult === "SUCCESS");
    return answerList.length === SETTING.WORD_SIZE;
  }

  public toString(): string {
    return this._letters.map((letter) => letter.text).join("");
  }

  public getSuccessLetter(targetLetter: Letter) {
    return this._letters.filter(
      (letter) => letter.text == targetLetter.text && letter.position == targetLetter.position
    );
  }

  public getLetter(text: string) {
    const result = this._letters.filter((letter) => letter.text == text);
    return result.length > 0 ? result[0] : null;
  }

  public findNotAlphaBetList() {
    return this._letters.filter((letter) => !ALPHABET.includes(letter.text.toUpperCase()));
  }

  public setLetter(indexAt: number, letter: string) {
    const result = [...this._letters];
    result[indexAt] = new Letter(letter, indexAt);
    return new Word(result);
  }

  get letters(): Letter[] {
    return this._letters;
  }
}

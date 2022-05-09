import { LetterStateType } from "../@types";
import { Word } from "./Word";

export class Letter {
  private readonly _text: string;
  private readonly _position: number;
  private readonly _checkResult?: LetterStateType;

  constructor(text: string, position: number, _checkResult?: LetterStateType) {
    this._text = text;
    this._position = position;
    this._checkResult = _checkResult;
  }

  public checkResultByWord(word: Word): LetterStateType {
    if (!word.toString().includes(this.text)) {
      return "FAIL";
    }

    const filtered = word.getSuccessLetter(this);

    if (filtered.length > 0) {
      return "SUCCESS";
    }

    return "INCLUDE";
  }

  get text(): string {
    return this._text;
  }

  get position(): number {
    return this._position;
  }

  get checkResult(): LetterStateType {
    return this._checkResult;
  }
}

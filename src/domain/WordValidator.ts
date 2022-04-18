import { Word } from "./Word";
import { WORDS } from "../constants/WORDS";
import { SETTING } from "../constants/SETTING";

export const INVALID_LENGTH = `${SETTING.WORD_SIZE}글자를 입력하셔야 합니다`;
export const INVALID_WORD = "단어가 아닙니다";
export const INVALID_ALPHABET = "알파벳만 입력이 가능합니다.";

export class WordValidator {
  public static validate(word: Word) {
    this.validateLength(word);
    this.validateWord(word);
    this.validateAlphabet(word);
  }

  private static validateWord(word: Word) {
    if (!WORDS.includes(word.toString().toLowerCase())) {
      throw new Error(INVALID_WORD);
    }
  }

  private static validateAlphabet(word: Word) {
    const filteredNotAlphabet = word.findNotAlphaBetList();

    if (filteredNotAlphabet.length > 0) {
      throw new Error(INVALID_ALPHABET);
    }
  }

  private static validateLength(word: Word) {
    if (SETTING.WORD_SIZE > word.toString().trim().length) {
      throw new Error(INVALID_LENGTH);
    }
  }
}

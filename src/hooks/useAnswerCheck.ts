import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerState,
  currentColState,
  currentRowState,
  keyboardState,
  wordsState,
} from "../recoil/atoms";
import { WordValidator } from "../domain/WordValidator";
import { ALPHABET } from "../constants/ALPHABET";
import { useEffect } from "react";
import { WordGrid } from "../domain/WordGrid";
import { KeyboardButtonType } from "../@types";
import { SETTING } from "../constants/SETTING";

export const useAnswerCheck = () => {
  const answer = useRecoilValue(answerState);
  const words = useRecoilValue(wordsState);
  const setWords = useSetRecoilState(wordsState);
  const [keyboard, setKeyboard] = useRecoilState(keyboardState);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowState);
  const [currentCol, setCurrentCol] = useRecoilState(currentColState);

  const wordGrid = WordGrid(words);

  useEffect(() => {
    wordGrid.setWords(words);
    setKeyboard(createKeyboard());
  }, [words]);

  function removeLetter() {
    const col = currentCol - 1;

    if (col < 0) {
      return;
    }

    setCurrentCol(col);
    setWords(wordGrid.removeLetter(currentRow, col));
  }

  function checkCurrentWord() {
    WordValidator.validate(words[currentRow]);

    setCurrentRow(currentRow + 1);
    setCurrentCol(0);

    setWords(wordGrid.checkWordByRow(currentRow, answer));
  }

  function inputLetter(letter: string) {
    if (letter.length >= SETTING.WORD_SIZE) {
      return;
    }

    setCurrentCol(currentCol + 1);
    setWords(wordGrid.inputLetter(currentRow, currentCol, letter));
  }

  function isAnswer() {
    return wordGrid.isAnswer(currentRow, answer);
  }

  function createKeyboard() {
    const newKeyBoard: KeyboardButtonType[][] = [];

    keyboard.forEach((keys, keysIndex) => {
      newKeyBoard[keysIndex] = [];

      [...keys].forEach((key) => {
        const letter = wordGrid.getLetterByText(key.text);
        const state = letter ? letter.checkResult : "";
        newKeyBoard[keysIndex].push({ ...key, state });
      });
    });

    return newKeyBoard;
  }

  function isNotInputAble(letter: string) {
    const etcKeys = [SETTING.KEY_ENTER, SETTING.KEY_BACKSPACE];
    return !etcKeys.includes(letter) && currentCol >= SETTING.WORD_SIZE;
  }

  return (letter: string) => {
    if (isNotInputAble(letter)) {
      return false;
    }

    switch (letter) {
      case SETTING.KEY_BACKSPACE: {
        removeLetter();
        return false;
      }
      case SETTING.KEY_ENTER: {
        checkCurrentWord();

        if (isAnswer()) {
          return true;
        }
      }
    }

    if (!ALPHABET.includes(letter)) {
      return false;
    }

    inputLetter(letter);

    return false;
  };
};

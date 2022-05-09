import { atom } from "recoil";
import { RECOIL_KEY } from "../constants/RECOIL_KEY";
import { initialKeyboards, initialWordGrid } from "../constants/SETTING";

export const wordsState = atom({
  key: RECOIL_KEY.wordsState,
  default: initialWordGrid(),
});

export const keyboardState = atom({
  key: RECOIL_KEY.keyboardState,
  default: initialKeyboards(),
});

export const answerState = atom({
  key: RECOIL_KEY.answerState,
  default: "",
});

export const currentRowState = atom({
  key: RECOIL_KEY.currentRow,
  default: 0,
});

export const currentColState = atom({
  key: RECOIL_KEY.currentCol,
  default: 0,
});

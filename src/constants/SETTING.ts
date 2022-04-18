import { Word } from "../domain/Word";
import { KeyboardButtonType } from "../@types";
import { KEYBOARD } from "./KEYBOARD";

export const SETTING = {
  WORD_SIZE: 5,
  KEY_BACKSPACE: "BACKSPACE",
  KEY_ENTER: "ENTER",
};

export function initialWordGrid(): Word[] {
  const rows = Array.from({ length: SETTING.WORD_SIZE });
  const cols = Array.from({ length: SETTING.WORD_SIZE + 1 }).join(" ");

  return rows.map(() => new Word(cols));
}

export function initialKeyboards(): KeyboardButtonType[][] {
  return KEYBOARD.map((keys) => keys.map((value) => ({ text: value, state: "" })));
}

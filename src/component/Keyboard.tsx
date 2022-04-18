import { useRecoilValue } from "recoil";
import { keyboardState } from "../recoil/atoms";
import classNames from "classnames";
import { KeyboardButtonType, KeyboardProps } from "../@types";

export const Keyboard = ({ onClick }: KeyboardProps) => {
  const keyboard = useRecoilValue(keyboardState);

  const handleOnClick = (key: KeyboardButtonType) => () => {
    onClick(key.text);
  };

  const KeyButtons = (keyRow: number, keys: KeyboardButtonType[]) => {
    return (
      <div id="keyItem1" className={classNames("keyboardButtonContainer")} key={keyRow}>
        {keys.map((key, keyCol) => {
          return KeyButton(key, keyCol);
        })}
      </div>
    );
  };

  const KeyButton = (key: KeyboardButtonType, keyCol: number) => {
    return (
      <span
        className={classNames("keyboardButton", key.state)}
        key={keyCol}
        onClick={handleOnClick(key)}
      >
        {key.text}
      </span>
    );
  };

  return <div id="keyboard">{keyboard.map((keys, keyRow) => KeyButtons(keyRow, keys))}</div>;
};

import { useRef } from "react";

export const useLongPress = (onLongPress, delay = 2000) => {
  const timerRef = useRef(null);

  const start = () => {
    timerRef.current = setTimeout(() => {
      onLongPress();
    }, delay);
  };

  const cancel = () => {
    clearTimeout(timerRef.current);
  };

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  };
};

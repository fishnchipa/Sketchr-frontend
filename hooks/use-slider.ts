import { useCallback, useState } from "react";

export function useSlider() {
  const [value, setValue] = useState(0);

  const increment = (width: number) => {
   
    setValue(width);
  }

  return {value: value, increment: increment}

}
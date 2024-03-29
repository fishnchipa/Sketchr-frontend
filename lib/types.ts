
export type ColorType = {
  rgb: {
    red: number,
    green: number,
    blue: number 
  }, 
  hsv: {
    hue: number,
    saturation: number,
    value: number
  },
  hsl: {
    hue: number,
    saturation: number,
    lightness: number
  }
}

export type squareType = {
  in: boolean,
  left: number,
  right: number,
  top: number,
  bottom: number,
}

export type HSVInputType = "saturation" | "value";
export type HSLInputType = "saturation" | "lightness";
export type RGBInputType = "red" | "green" | "blue";

export type Point = {
  x: number,
  y: number
}

export type CanvasRef = {
  mouseDown: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
  mouseUp: () => void,
  mouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
  focus: () => void,
  unfocus: () => void,
}

export type toolOptions = "brush" | "eraser" | "cursor" | "fill" | "eyedrop" | "transform" | "move" | "selection" | "circleSelection"; 

export type HSVType = {
  hue: number,
  saturation: number,
  value: number
}
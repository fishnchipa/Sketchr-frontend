
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
  show: () => void,
  hide: () => void,
}

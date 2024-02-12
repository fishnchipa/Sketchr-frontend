import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { squareType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hsvToHSL (h: number, s: number, v: number) {
  

  let hue = h;
  let lightness = v * (1 - (s / 2));
  let saturation = (v - lightness) / Math.min(lightness, 1 - lightness);

  if (lightness === 0 || lightness === 1) {
    saturation = 0;
  }

  return {hue, saturation, lightness}
}

export function hsvToRGB (h: number, s: number, v: number,) {
  let chroma = v * s;
  let hue1 = h / 60;
  let x = chroma * (1- Math.abs((hue1 % 2) - 1));
  let r1, g1, b1;
  if (hue1 >= 0 && hue1 <= 1) {
    ([r1, g1, b1] = [chroma, x, 0]);
  } else if (hue1 >= 1 && hue1 <= 2) {
    ([r1, g1, b1] = [x, chroma, 0]);
  } else if (hue1 >= 2 && hue1 <= 3) {
    ([r1, g1, b1] = [0, chroma, x]);
  } else if (hue1 >= 3 && hue1 <= 4) {
    ([r1, g1, b1] = [0, x, chroma]);
  } else if (hue1 >= 4 && hue1 <= 5) {
    ([r1, g1, b1] = [x, 0, chroma]);
  } else if (hue1 >= 5 && hue1 <= 6) {
    ([r1, g1, b1] = [chroma, 0, x]);
  } else {
    ([r1, g1, b1] = [0, 0, 0]);
  }
  
  let m = v - chroma;
  let red = (r1+m)*255;
  let green = (g1+m)*255;
  let blue = (b1+m)*255;
  
  return { red, green, blue };
}

export function hslToHSV (h: number, s: number, l: number) {
  let hue = h;
  let value = l + s*Math.min(l, 1-l);
  let saturation = 2* (1 - (l/value));

  if (value === 0) {
    saturation = 0;
  }

  return {hue, saturation, value};
}

export function hslToRGB(h: number, s: number, l: number) {
  const { hue, saturation, value } = hslToHSV(h,s,l);
  const { red, green, blue } = hsvToRGB(hue, saturation, value);

 
  return { red, green, blue };

}

export function rgbToHSV (r: number, g: number, b: number) {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let delta = max - min;

  let h = delta && 60 * (max === r ? (g-b) / delta % 6 : max === g ? (b-r) / delta + 2 : (r-g) / delta + 4);
  
  let hue = h;
  let saturation = max && delta * 100 /max;
  let value = max * 100 / 255;

  h < 0 ? hue = hue + 360 : hue;
  
  return { hue, saturation, value };
}

export function rgbToHSL (r: number, g: number, b: number) {
  const { hue: hueHSV, saturation: saturationHSV, value:valueHSV } = rgbToHSV(r, g, b);
  const { hue, saturation, lightness } = hsvToHSL(hueHSV, saturationHSV, valueHSV);

  return { hue, saturation, lightness};
}

export function rgbToHEX (r: number, g: number, b: number) {

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); 
}


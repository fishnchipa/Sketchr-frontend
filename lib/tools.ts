import { Point } from "@/lib/types";



export const brush = (start: Point, end: Point | null, ctx: CanvasRenderingContext2D, size: number, opacity: number, color: string) => {

	if (ctx) {
		ctx.lineCap = "round";
    ctx.lineJoin = "round";
		ctx.lineWidth = size;
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = opacity / 100;
		ctx.strokeStyle = color;
		ctx.moveTo(start.x, start.y);
		
		if (end) {
			ctx.lineTo(end.x, end.y);
			
		}
		ctx.stroke();
		



	}
}

export const eraser = (start: Point, end: Point | null, ctx: CanvasRenderingContext2D, size: number, opacity: number, color: string) => {
	if (ctx) {

		start = start ?? end;
		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.arc(start.x, start.y, size/2, 0, 2 * Math.PI);
		ctx.fill();
	
		ctx.lineWidth = size;
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		if (end) {
			ctx.lineTo(end.x, end.y);
		}
		ctx.stroke();
	}
}

export const cursor = (start: Point, end: Point | null, ctx: CanvasRenderingContext2D, size: number) => {
	
}

export const fill = () => {
	
}
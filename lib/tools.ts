import { Point } from "@/lib/types";

export const brush = (start: Point, end: Point | null, ctx: CanvasRenderingContext2D, size: number, opacity: number) => {
	if (ctx) {
		
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = size;

		ctx.strokeStyle = "#0080FF";
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		if (end) {
			ctx.lineTo(end.x, end.y);
		}
		ctx.stroke();
		ctx.closePath();

		ctx.strokeStyle = '#0080FF';
		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		if (end) {
			ctx.lineTo(end.x, end.y);
		}
		ctx.stroke();
		ctx.strokeStyle = "#0080FF80"
		ctx.globalCompositeOperation = "source-over";
		ctx.stroke();
		ctx.closePath();
	}
}

export const eraser = (start: Point, end: Point | null, ctx: CanvasRenderingContext2D, size: number) => {
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
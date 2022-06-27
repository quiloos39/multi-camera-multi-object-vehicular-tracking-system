import { useEffect, useRef } from "react";

interface PlayerProps {
  frame: any;
}

export function Player({ frame }: PlayerProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (frame && canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        const { image, boundingBoxes } = frame;
        ctx.clearRect(0, 0, 1920, 1080);
        ctx.drawImage(image, 0, 0, 1920, 1080);
        boundingBoxes.forEach((box) => {
          const { x, y, w, h, id, label, color } = box;
          ctx.beginPath();
          ctx.rect(x, y, w, h);
          ctx.strokeStyle = "rgb(105, 198, 219)";
          ctx.lineWidth = 7;
          ctx.stroke();
          ctx.font = "bold 16px Arial";
          ctx.fillStyle = "rgb(0, 0, 0)";
          ctx.fillText(`ID: ${id}`, x, y + h + 20);
        });
      }
    }
  }, [frame]);

  return (
    <div className="flex-grow overflow-auto">
      <canvas width={1920} height={1080} ref={canvas} />
    </div>
  );
}

import React from 'react';
import { ColorContext } from '../context';
import { Header } from '../Header';
import { client } from '../service';

interface Coordinates {
  mouseX: number,
  mouseY: number
};

interface Input {
  mouseX: number,
  mouseY: number,
  fromX: number,
  fromY: number,
  color: string,
  size: number
};

const colors: string[] = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0'
];

function Canvas() {

  const [position, setPosition] = React.useState<Coordinates | null>(null);
  const [isDown, setIsDown] = React.useState<boolean>(false);

  // const [data, setData] = React.useState<ImageData[]>([]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasCurrent = canvasRef.current;
  const context: CanvasRenderingContext2D | null = canvasCurrent?.getContext('2d')!;

  const { color } = React.useContext(ColorContext);

  React.useEffect(() => {
    // client.on('', (coordinates: Input) => {
    //   drawLine({
    //     mouseX: coordinates.mouseX,
    //     mouseY: coordinates.mouseY,
    //     fromX: coordinates.fromX,
    //     fromY: coordinates.fromY,
    //     color: coordinates.color,
    //     size: coordinates.size
    //   })
    // })
  }, [])

  function onWheel() {
    console.log([])
  }

  function drawLine(input: Input) {
    if (!context) return;

    context.beginPath();
    context.lineWidth = input.size;
    context.lineCap = 'round';
    context.strokeStyle = input.color;
    context.moveTo(input.fromX, input.fromY);
    context.lineTo(input.mouseX, input.mouseY);
    context.stroke();
    context.closePath();
  }

  function onUp() {
    setPosition(null)
    setIsDown(false)
  }

  function onDown(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;

    setPosition({
      mouseX: mouseX,
      mouseY: mouseY
    })

    setIsDown(true)
  }

  function onDraw(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

    if (!isDown) return;

    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;

    const prevCoordinates = position!;

    if (true) {
      client.emit('', {
        mouseX: mouseX,
        mouseY: mouseY,
        fromX: prevCoordinates.mouseX,
        fromY: prevCoordinates.mouseY,
        color: color,
        size: 8
      })
    }

    setPosition({
      mouseX: mouseX,
      mouseY: mouseY
    })

    drawLine({
      mouseX: mouseX,
      mouseY: mouseY,
      fromX: prevCoordinates.mouseX,
      fromY: prevCoordinates.mouseY,
      color: color,
      size: 8
    })
  }

  return (
    <div className='container flex' onWheel={onWheel}>

      <Header colors={colors} undo={() => null} redo={() => null} />

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'block', touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onDraw}
        onPointerUp={onUp}
      />
    </div>
  );
};

export { Canvas }
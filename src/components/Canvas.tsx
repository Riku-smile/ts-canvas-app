import {useRef, useState} from 'react';

type Prop = {
    height: number,
    width: number
}

type Rect = {
    bottom: number
    height: number,
    left: number,
    right: number,
    top: number,
    width: number,
}

const Canvas: React.FC<Prop> = ({width,height}) =>{
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;
        return canvas.getContext('2d');
    }

    const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(e.button !== 0){ return; }
        const canvas: any = canvasRef.current;
        const rect: Rect = canvas.getBoundingClientRect();
        const x = ~~(e.clientX - rect.left);
        const y = ~~(e.clientY - rect.top);
        Draw(x,y);
    }

    const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(e.buttons !== 1){ return; }
        const canvas: any = canvasRef.current;
        const rect: Rect = canvas.getBoundingClientRect();
        const x = ~~(e.clientX - rect.left);
        const y = ~~(e.clientY - rect.top);
        Draw(x,y);
    }

    const DrawEnd = () => {
        mouseX = null;
        mouseY = null;
    }

    const Draw = (x: number, y: number) => {
        const ctx = getContext();
        ctx.beginPath();
        ctx.globalAlpha = 1.0;
        if (mouseX === null || mouseY === null) {
            ctx.moveTo(x,y)
        } else {
            ctx.moveTo(mouseX,mouseY)
        }
        ctx.lineTo(x,y);
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
        mouseX = x;
        mouseY = y;
    }

    const Reset = () => {
        var res = window.confirm("リセットしても良いですか？");
        if (res === true) {
            const ctx = getContext();
            ctx.clearRect(0, 0, width, height);
        }
    }

    let [color, setColor] = useState('#000');
    let [lineWidth, setLineWidth] = useState(10);

    return (
        <div className="canvas--outer">
            <div className="canvas--inner">
                <canvas
                    id="canvas--content"
                    onMouseDown={onClick}
                    onMouseMove={onMove}
                    onMouseUp={DrawEnd}
                    onMouseOut={DrawEnd}
                    ref={canvasRef}
                    width={`${width}px`}
                    height={`${height}px`}
                    style={{border: '2px solid black'}}
                />
            </div>
            <div className="setting">
                <div className="setting--content">
                    <h2 className="setting--title" style={{color: color}}>ペンの色</h2>
                    {[ '#000', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff' ].map(color =>(
                        <button className="setting--btn" key={color} style={{backgroundColor: color}} onClick={()=> { setColor(color) }} ></button>
                    ))}
                </div>
                <input type="button" className="reset" value="Reset" onClick={Reset} />
                <div className="setting--content">
                    <h2 className="setting--title" style={{borderBottom: `solid black ${lineWidth}px`}}>ペンの太さ</h2>
                    {[ 2, 4, 6, 8, 10 ].map(lineWidth =>(
                        <button className="setting--btn" key={lineWidth} onClick={()=> { setLineWidth(lineWidth) }} >{lineWidth}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Canvas;
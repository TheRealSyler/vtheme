export type ThemeTransitionOptions = {
  removeAfter?: number;
  loops?: number;
  drawInterval?: number;
  maxSmallShapes?: number;
  maxLargeShapes?: number;
  minSmallShapes?: number;
  minLargeShapes?: number;
  noiseOpacity?: number;
  noiseMaxBrightness?: number;
  minShapesOpacity?: number;
  maxShapesOpacity?: number;
};
/* istanbul ignore next */
export function ThemeTransition(options?: ThemeTransitionOptions) {
  const _options = {
    removeAfter: 230,
    loops: 3,
    drawInterval: 20,
    maxSmallShapes: 600,
    maxLargeShapes: 30,
    minSmallShapes: 50,
    minLargeShapes: 10,
    noiseOpacity: 0.1,
    noiseMaxBrightness: 200,
    minShapesOpacity: 0.3,
    maxShapesOpacity: 0.8,
  };

  if (options) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        _options[key as keyof ThemeTransitionOptions] = options[key];
      }
    }
  }

  const canvas = document.createElement('canvas');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.id = 'vtheme-extra-theme-transition';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.zIndex = '10000000';

  if (canvas.getContext) {
    let loop = -2;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (ctx !== null) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        drawSmallShapes();
        drawLargeShapes();
        generateNoise(_options.noiseOpacity);
        if (loop <= _options.loops) {
          loop++;
          setTimeout(() => draw(), _options.drawInterval);
        }
      }
    };

    const drawSmallShapes = () => {
      if (ctx !== null) {
        const elementNum = Math.round(
          Math.max(Math.random() * _options.maxSmallShapes, _options.minSmallShapes)
        );
        for (let i = 0; i < elementNum; i++) {
          ctx.fillStyle = randomRgb(_options.maxShapesOpacity, _options.minShapesOpacity);
          const height = Math.max(Math.random() * 14, 5);
          const width = Math.max(Math.random() * 150, 20);
          const x = Math.random() * window.innerWidth + (window.innerWidth / 2) * loop;
          const y = Math.random() * window.innerHeight;
          ctx.fillRect(x, y, width, height);
        }
      }
    };

    const drawLargeShapes = () => {
      if (ctx !== null) {
        const elementNum = Math.round(
          Math.max(Math.random() * _options.maxLargeShapes, _options.minLargeShapes)
        );
        for (let i = 0; i < elementNum; i++) {
          ctx.fillStyle = randomRgb(_options.maxShapesOpacity, _options.minShapesOpacity);
          const height = Math.max(Math.random() * 120, 60);
          const width = Math.max(Math.random() * 600, 100);
          const x = Math.random() * window.innerWidth + (window.innerWidth / 2) * loop;
          const y = Math.random() * window.innerHeight;
          ctx.fillRect(x, y, width, height);
        }
      }
    };

    const generateNoise = (opacity?: number) => {
      const noiseCanvas = document.createElement('canvas');
      const noiseCtx = noiseCanvas.getContext('2d');
      if (noiseCtx !== null) {
        let x: number;
        let y: number;
        let r: number;
        let g: number;
        let b: number;
        opacity = opacity || 0.2;
        noiseCanvas.width = 100;
        noiseCanvas.height = 100;

        for (x = 0; x < noiseCanvas.width; x++) {
          for (y = 0; y < noiseCanvas.height; y++) {
            r = Math.floor(Math.random() * _options.noiseMaxBrightness);
            g = Math.floor(Math.random() * _options.noiseMaxBrightness);
            b = Math.floor(Math.random() * _options.noiseMaxBrightness);

            noiseCtx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            noiseCtx.fillRect(x, y, 1, 1);
          }
        }
        canvas.style.backgroundImage = 'url(' + noiseCanvas.toDataURL('image/png') + ')';
      }
    };

    document.body.appendChild(canvas);
    setTimeout(() => {
      canvas.remove();
    }, _options.removeAfter);

    window.requestAnimationFrame(draw);
  } else {
    canvas.remove();
  }
}
/* istanbul ignore next */
function randomRgb(maxShapesOpacity: number, minShapesOpacity: number) {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.max(
    Math.random() * maxShapesOpacity,
    minShapesOpacity
  )})`;
}

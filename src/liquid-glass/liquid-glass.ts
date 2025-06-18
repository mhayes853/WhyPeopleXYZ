import "../shared-assets/style.css";
import "./liquid-glass.css";
import vertexShaderCode from "./assets/vertex.glsl?raw";
import fragmentShaderCode from "./assets/fragment.glsl?raw";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const resize = (context: WebGLRenderingContext) => {
  canvas.width = Math.min(
    window.innerWidth,
    canvas.clientWidth * window.devicePixelRatio,
  );
  canvas.height = Math.min(
    window.innerHeight,
    canvas.clientHeight * window.devicePixelRatio,
  );
  context.viewport(0, 0, canvas.clientWidth, canvas.height);
};

const renderingContext = (): WebGLRenderingContext => {
  const gl = canvas.getContext("webgl", { antialias: true });
  const context = gl
    ? gl
    : (canvas.getContext("experimental-webgl", {
        antialias: true,
      }) as WebGLRenderingContext);
  resize(context);
  return context;
};

const compileShader = (type: GLenum, source: string) => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

const gl = renderingContext();

const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderCode);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderCode);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error("Program link error:", gl.getProgramInfoLog(program));
}
gl.useProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
  gl.STATIC_DRAW,
);

const positionLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const resolution = gl.getUniformLocation(program, "u_resolution");
const mouse = gl.getUniformLocation(program, "u_mouse");
const size = gl.getUniformLocation(program, "u_size");

const background = gl.createTexture();

const image = new Image();
image.crossOrigin = "anonymous";
image.src = "./liquid-glass/assets/background.avif";
image.onload = () => {
  const aspect = image.width / image.height;
  const cssWidth = canvas.parentElement!.clientWidth;
  const cssHeight = cssWidth / aspect;

  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  void canvas.offsetHeight;

  canvas.width = cssWidth * devicePixelRatio;
  canvas.height = cssHeight * devicePixelRatio;

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(resolution, canvas.width, canvas.height);

  // Load texture
  gl.bindTexture(gl.TEXTURE_2D, background);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(gl.getUniformLocation(program, "u_background"), 0);

  gl.uniform1f(
    gl.getUniformLocation(program, "u_dpr"),
    window.devicePixelRatio,
  );

  requestAnimationFrame(draw);
};

const title = document.getElementById("title")!;
const numIcons = title.children.length;
const textHeight = title.clientHeight;
const textWidth = title.clientWidth;

const totalWidth = textWidth + (numIcons - 1);
const totalHeight = textHeight; // assuming 1 row

const defaultWidth = totalWidth + 10; // Add padding
const defaultHeight = totalHeight + 10;
let enlargedSize = [defaultWidth, defaultHeight];
const defaultSize = [enlargedSize[0] * 0.5, enlargedSize[1] * 0.5];
let targetSize = [...defaultSize];
let currentSize = [...targetSize];

const rect = canvas.parentElement!.getBoundingClientRect();
let targetMouse = [rect.width / 2, textHeight / 2 + 20];
let currentMouse = [...targetMouse];

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.parentElement!.getBoundingClientRect();

  const glassHalfWidth = currentSize[0] / (2 * devicePixelRatio);
  const glassHalfHeight = currentSize[1] / (2 * devicePixelRatio);

  // Clamp mouse to stay within canvas bounds
  const clampedX = Math.max(
    glassHalfWidth,
    Math.min(e.clientX - rect.left, rect.width - glassHalfWidth),
  );
  const clampedY = Math.max(
    glassHalfHeight,
    Math.min(e.clientY - rect.top, rect.height - glassHalfHeight),
  );

  targetMouse = [clampedX, clampedY]; // in CSS pixels
});

let lastTime = performance.now();

const draw = (now: DOMHighResTimeStamp) => {
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  const speed = 5.0; // animation speed in units per second

  // Tween position
  currentMouse[0] += (targetMouse[0] - currentMouse[0]) * speed * delta;
  currentMouse[1] += (targetMouse[1] - currentMouse[1]) * speed * delta;

  // Optional: animate size for hover effect
  targetSize[0] = enlargedSize[0];
  targetSize[1] = enlargedSize[1];

  // Tween size with delta time
  currentSize[0] += (targetSize[0] - currentSize[0]) * speed * delta;
  currentSize[1] += (targetSize[1] - currentSize[1]) * speed * delta;

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(resolution, canvas.width, canvas.height);
  gl.uniform2f(mouse, currentMouse[0], currentMouse[1]);
  gl.uniform2f(size, currentSize[0], currentSize[1]);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, background);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  const cssX = currentMouse[0];
  const cssY = currentMouse[1];
  title.style.transform = `
    translate(${cssX}px, ${cssY}px)
    translate(-50%, -50%)
  `;

  requestAnimationFrame(draw);
};

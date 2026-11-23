import backgroundImage from "./background.avif";
import vertexShaderCode from "./vertex.glsl?raw";
import fragmentShaderCode from "./fragment.glsl?raw";

const ANIMATION_SPEED = 5.0;

/**
 * Renders the liquid glass demo into `canvas`, moving `title` along with the
 * glass. Returns a function that stops the animation.
 */
export const startLiquidGlass = (
  canvas: HTMLCanvasElement,
  title: HTMLElement,
): (() => void) => {
  const gl =
    canvas.getContext("webgl", { antialias: true }) ??
    (canvas.getContext("experimental-webgl", {
      antialias: true,
    }) as WebGLRenderingContext | null);
  if (!gl) {
    return () => {};
  }

  canvas.width = Math.min(
    window.innerWidth,
    canvas.clientWidth * window.devicePixelRatio,
  );
  canvas.height = Math.min(
    window.innerHeight,
    canvas.clientHeight * window.devicePixelRatio,
  );
  gl.viewport(0, 0, canvas.clientWidth, canvas.height);

  const compileShader = (type: GLenum, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };

  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexShaderCode));
  gl.attachShader(
    program,
    compileShader(gl.FRAGMENT_SHADER, fragmentShaderCode),
  );
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

  const textHeight = title.clientHeight;
  const textWidth = title.clientWidth;
  const totalWidth = textWidth + (title.children.length - 1);
  const enlargedSize = [totalWidth + 10, textHeight + 10];
  const targetSize = [enlargedSize[0] * 0.5, enlargedSize[1] * 0.5];
  const currentSize = [...targetSize];

  const rect = canvas.parentElement!.getBoundingClientRect();
  let targetMouse = [rect.width / 2, textHeight / 2 + 20];
  const currentMouse = [...targetMouse];

  let frame = 0;
  let lastTime = performance.now();

  const draw = (now: DOMHighResTimeStamp) => {
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    currentMouse[0] +=
      (targetMouse[0] - currentMouse[0]) * ANIMATION_SPEED * delta;
    currentMouse[1] +=
      (targetMouse[1] - currentMouse[1]) * ANIMATION_SPEED * delta;

    targetSize[0] = enlargedSize[0];
    targetSize[1] = enlargedSize[1];
    currentSize[0] += (targetSize[0] - currentSize[0]) * ANIMATION_SPEED * delta;
    currentSize[1] += (targetSize[1] - currentSize[1]) * ANIMATION_SPEED * delta;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform2f(mouse, currentMouse[0], currentMouse[1]);
    gl.uniform2f(size, currentSize[0], currentSize[1]);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, background);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    title.style.transform = `translate(${currentMouse[0]}px, ${currentMouse[1]}px) translate(-50%, -50%)`;

    frame = requestAnimationFrame(draw);
  };

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = backgroundImage;
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

    frame = requestAnimationFrame(draw);
  };

  const onMouseMove = (event: MouseEvent) => {
    const rect = canvas.parentElement!.getBoundingClientRect();
    const glassHalfWidth = currentSize[0] / (2 * devicePixelRatio);
    const glassHalfHeight = currentSize[1] / (2 * devicePixelRatio);

    // Clamp the glass so it stays within the canvas bounds.
    targetMouse = [
      Math.max(
        glassHalfWidth,
        Math.min(event.clientX - rect.left, rect.width - glassHalfWidth),
      ),
      Math.max(
        glassHalfHeight,
        Math.min(event.clientY - rect.top, rect.height - glassHalfHeight),
      ),
    ];
  };
  canvas.addEventListener("mousemove", onMouseMove);

  return () => {
    image.onload = null;
    cancelAnimationFrame(frame);
    canvas.removeEventListener("mousemove", onMouseMove);
  };
};

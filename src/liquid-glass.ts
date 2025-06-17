import "./style.css";
import "./liquid-glass.css";

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
    v_uv = vec2(a_position.x, -a_position.y) * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_dpr;
uniform sampler2D u_background;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_size;
varying vec2 v_uv;

float cssPxUV() {
    return u_dpr / min(u_resolution.x, u_resolution.y);
}

float roundedBox(vec2 uv, vec2 center, vec2 size, float radius) {
    vec2 q = abs(uv - center) - size + radius;
    return length(max(q, 0.0)) - radius;
}

vec3 blurBackground(vec2 uv, vec2 resolution) {
    vec3 result = vec3(0.0);
    float total = 0.0;
    float radius = 3.0;
    for (int x = -3; x <= 3; x++) {
        for (int y = -3; y <= 3; y++) {
            vec2 offset = vec2(float(x), float(y)) * 2.0 / resolution;
            float weight = exp(-(float(x * x + y * y)) / (2.0 * radius));
            result += texture2D(u_background, uv + offset).rgb * weight;
            total += weight;
        }
    }
    return result / total;
}

float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return length(max(d, 0.0)) - r;
}

vec2 getNormal(vec2 uv, vec2 center, vec2 size, float radius) {
    vec2 eps = vec2(1.0) / u_resolution * 2.0;
    vec2 p = uv - center;

    float sdfCenter = roundedBoxSDF(p, size, radius);
    float dx = (roundedBoxSDF(p + vec2(eps.x, 0.0), size, radius) - roundedBoxSDF(p - vec2(eps.x, 0.0), size, radius)) * 0.5;
    float dy = (roundedBoxSDF(p + vec2(0.0, eps.y), size, radius) - roundedBoxSDF(p - vec2(0.0, eps.y), size, radius)) * 0.5;

    vec2 gradient = vec2(dx, dy);

    // Optional: smooth corners by blending with diagonal gradients
    float dxy1 = roundedBoxSDF(p + eps, size, radius);
    float dxy2 = roundedBoxSDF(p - eps, size, radius);
    vec2 diag = vec2(dxy1 - dxy2);

    gradient = mix(gradient, diag, 0.25); // adjust 0.25 to smooth more/less

    if (length(gradient) < 0.001) {
        return vec2(0.0);
    }
    return normalize(gradient);
}

void main() {
    vec2 pixelUV = (v_uv * u_resolution) / u_dpr;
    vec2 center = u_mouse;
    vec2 size = u_size * 0.5;

    vec2 local = (pixelUV - center) / size;
    local.y *= u_resolution.x / u_resolution.y;

    float radius = 20.0;
    float dist = roundedBox(pixelUV, center, size, radius);

    if (dist > 1.0) {
        gl_FragColor = texture2D(u_background, v_uv);
        return;
    }

    // Radial curvature refraction (center-based)
    float r = clamp(length(local * 1.0), 0.0, 1.0);
    float curvature = pow(r, 1.0);
    vec2 domeNormal = normalize(local) * curvature;
    float eta = 1.0 / 1.5;
    vec2 incident = -domeNormal;
    vec2 refractVec = refract(incident, domeNormal, eta);
    vec2 curvedRefractUV = v_uv + refractVec * 0.03;

    // Edge contour refraction
    float contourFalloff = exp(-abs(dist) * 0.4); // slightly stronger edge refraction
    vec2 normal = getNormal(pixelUV, center, size, radius);
    vec2 domeNormalContour = normal * pow(contourFalloff, 1.5);
    vec2 refractVecContour = refract(vec2(0.0), domeNormalContour, eta);
    vec2 uvContour = v_uv + refractVecContour * 0.35 * contourFalloff;

    // Blend based on distance from edge and radial distance
    float edgeWeight = smoothstep(0.0, 1.0, abs(dist));
    float radialWeight = smoothstep(0.5, 1.0, r);
    float combinedWeight = clamp((edgeWeight * 1.0) + (-radialWeight * 0.5), 0.0, 1.0);
    vec2 refractUV = mix(curvedRefractUV, uvContour, combinedWeight);

    vec3 refracted = texture2D(u_background, refractUV).rgb;
    vec3 blurred = blurBackground(refractUV, u_resolution);
    vec3 base = mix(refracted, blurred, 0.5);

    // Shadow
    float edgeFalloff = smoothstep(0.01, 0.0, dist);
    float verticalBand = 1.0 - smoothstep(-1.5, -0.2, local.y);
    float topShadow = edgeFalloff * verticalBand;
    vec3 shadowColor = vec3(0.0);
    base = mix(base, shadowColor, topShadow * 0.1);

    // Edge glow
    float edge = 1.0 - smoothstep(0.0, 0.03, dist * -2.0);
    vec3 glow = vec3(0.7);
    vec3 color = mix(base, glow, edge * 0.5);

    float alpha = 0.75;
    gl_FragColor = vec4(color, alpha);
}
`;

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

const vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

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
image.src = "/liquid-glass/background.avif";
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

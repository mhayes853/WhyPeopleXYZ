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
    float contourFalloff = exp(-abs(dist) * 0.1); // slightly stronger edge refraction
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
    vec3 base = mix(refracted, blurred, 0.75);

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

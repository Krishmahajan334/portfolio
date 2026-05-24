"use client";

import React, { useEffect, useRef } from "react";

interface LineWavesProps {
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number; // in degrees
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
}

export const LineWaves: React.FC<LineWavesProps> = ({
  speed = 0.3,
  innerLineCount = 32.0,
  outerLineCount = 36.0,
  warpIntensity = 1.0,
  rotation = -45.0,
  edgeFadeWidth = 0.0,
  colorCycleSpeed = 1.0,
  brightness = 0.25,
  color1 = "#1DCD9F",
  color2 = "#00F5FF",
  color3 = "#7F5AF0",
  enableMouseInteraction = true,
  mouseInfluence = 2.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const hexToVec3 = (hex: string): [number, number, number] => {
      const h = hex.replace("#", "");
      return [
        parseInt(h.substring(0, 2), 16) / 255,
        parseInt(h.substring(2, 4), 16) / 255,
        parseInt(h.substring(4, 6), 16) / 255,
      ];
    };

    const vertexShaderSrc = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision highp float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uSpeed;
      uniform float uInnerLines;
      uniform float uOuterLines;
      uniform float uWarpIntensity;
      uniform float uRotation;
      uniform float uEdgeFadeWidth;
      uniform float uColorCycleSpeed;
      uniform float uBrightness;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec2 uMouse;
      uniform float uMouseInfluence;
      uniform bool uEnableMouse;

      #define HALF_PI 1.5707963

      float hashF(float n) {
        return fract(sin(n * 127.1) * 43758.5453123);
      }

      float smoothNoise(float x) {
        float i = floor(x);
        float f = fract(x);
        float u = f * f * (3.0 - 2.0 * f);
        return mix(hashF(i), hashF(i + 1.0), u);
      }

      float displaceA(float coord, float t) {
        float result = sin(coord * 2.123) * 0.2;
        result += sin(coord * 3.234 + t * 4.345) * 0.1;
        result += sin(coord * 0.589 + t * 0.934) * 0.5;
        return result;
      }

      float displaceB(float coord, float t) {
        float result = sin(coord * 1.345) * 0.3;
        result += sin(coord * 2.734 + t * 3.345) * 0.2;
        result += sin(coord * 0.189 + t * 0.934) * 0.3;
        return result;
      }

      vec2 rotate2D(vec2 p, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
      }

      void main() {
        vec2 coords = gl_FragCoord.xy / uResolution;
        coords = coords * 2.0 - 1.0;
        coords.x *= uResolution.x / uResolution.y;
        coords = rotate2D(coords, uRotation);

        float halfT = uTime * uSpeed * 0.5;
        float fullT = uTime * uSpeed;

        float mouseWarp = 0.0;
        if (uEnableMouse) {
          vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
          mPos.x *= uResolution.x / uResolution.y;
          float mDist = length(coords - mPos);
          mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
        }

        float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
        float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
        float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
        float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

        vec2 fieldA = vec2(warpAx, warpAy);
        vec2 fieldB = vec2(warpBx, warpBy);
        vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

        float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
        float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
        float vMask = 1.0 - max(fadeTop, fadeBottom);

        float tileCount = mix(uOuterLines, uInnerLines, vMask);
        float scaledY = blended.y * tileCount;
        float nY = smoothNoise(abs(scaledY));

        float ridge = pow(
          step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
          5.0
        );

        float lines = 0.0;
        for (float i = 1.0; i < 3.0; i += 1.0) {
          lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
        }

        float pattern = vMask * lines;

        float cycleT = fullT * uColorCycleSpeed;
        float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
        float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
        float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

        vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
        float alpha = clamp(length(col), 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResLoc = gl.getUniformLocation(program, "uResolution");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");
    const uInnerLoc = gl.getUniformLocation(program, "uInnerLines");
    const uOuterLoc = gl.getUniformLocation(program, "uOuterLines");
    const uWarpLoc = gl.getUniformLocation(program, "uWarpIntensity");
    const uRotLoc = gl.getUniformLocation(program, "uRotation");
    const uFadeLoc = gl.getUniformLocation(program, "uEdgeFadeWidth");
    const uCycleLoc = gl.getUniformLocation(program, "uColorCycleSpeed");
    const uBrightLoc = gl.getUniformLocation(program, "uBrightness");
    const uC1Loc = gl.getUniformLocation(program, "uColor1");
    const uC2Loc = gl.getUniformLocation(program, "uColor2");
    const uC3Loc = gl.getUniformLocation(program, "uColor3");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uMouseInfLoc = gl.getUniformLocation(program, "uMouseInfluence");
    const uEnableMouseLoc = gl.getUniformLocation(program, "uEnableMouse");

    // Set static uniforms
    const rotRad = (rotation * Math.PI) / 180;
    gl.uniform1f(uSpeedLoc, speed);
    gl.uniform1f(uInnerLoc, innerLineCount);
    gl.uniform1f(uOuterLoc, outerLineCount);
    gl.uniform1f(uWarpLoc, warpIntensity);
    gl.uniform1f(uRotLoc, rotRad);
    gl.uniform1f(uFadeLoc, edgeFadeWidth);
    gl.uniform1f(uCycleLoc, colorCycleSpeed);
    gl.uniform1f(uBrightLoc, brightness);
    gl.uniform3fv(uC1Loc, hexToVec3(color1));
    gl.uniform3fv(uC2Loc, hexToVec3(color2));
    gl.uniform3fv(uC3Loc, hexToVec3(color3));
    gl.uniform1f(uMouseInfLoc, mouseInfluence);
    gl.uniform1i(uEnableMouseLoc, enableMouseInteraction ? 1 : 0);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      ];
    };

    const handleMouseLeave = () => {
      targetMouse = [0.5, 0.5];
    };

    if (enableMouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResLoc, w, h);
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrameId: number;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      gl.uniform1f(uTimeLoc, time * 0.001);

      if (enableMouseInteraction) {
        currentMouse[0] += 0.03 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.03 * (targetMouse[1] - currentMouse[1]);
        gl.uniform2f(uMouseLoc, currentMouse[0], currentMouse[1]);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (enableMouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [
    speed,
    innerLineCount,
    outerLineCount,
    warpIntensity,
    rotation,
    edgeFadeWidth,
    colorCycleSpeed,
    brightness,
    color1,
    color2,
    color3,
    enableMouseInteraction,
    mouseInfluence,
  ]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

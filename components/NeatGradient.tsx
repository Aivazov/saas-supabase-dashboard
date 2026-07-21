// components/NeatGradient.tsx

'use client';

import { useEffect, useRef } from 'react';
import { NeatGradient } from '@firecms/neat';

const config = {
  colors: [
    { color: '#000000', enabled: true },
    { color: '#001129', enabled: true },
    { color: '#0F0025', enabled: true },
    { color: '#14080A', enabled: true },
    { color: '#001129', enabled: true },
  ],
  speed: 2,
  horizontalPressure: 5,
  verticalPressure: 4,
  waveFrequencyX: 3,
  waveFrequencyY: 2,
  waveAmplitude: 1,
  shadows: 2,
  highlights: 2,
  colorBrightness: 1,
  colorSaturation: -1,
  wireframe: false,
  colorBlending: 7,
  backgroundColor: '#010101',
  backgroundAlpha: 1,
  grainScale: 2,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 1,
  resolution: 0.85,
  yOffset: 629,
  yOffsetWaveMultiplier: 2.2,
  yOffsetColorMultiplier: 2.5,
  yOffsetFlowMultiplier: 2.8,
  flowDistortionA: 3.7,
  flowDistortionB: 4,
  flowScale: 1.4,
  flowEase: 0.26,
  flowEnabled: true,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureVoidLikelihood: 0.06,
  textureVoidWidthMin: 10,
  textureVoidWidthMax: 500,
  textureBandDensity: 0.8,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.68,
  proceduralBackgroundColor: '#FFED00',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: true,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 1,
  shapeType: 'plane' as const,
};

export function NeatBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const gradient = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    const handleScroll = () => {
      gradient.yOffset = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className='gradient-wrapper'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '105vw',
        height: '105vh',
        minHeight: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        id='gradient'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

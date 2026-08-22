import { useState, useEffect, useSyncExternalStore } from 'react';

/**
 * Detects how much 3D this device can afford, once, at module level.
 * Components read the result instead of each running their own probes.
 */
function detect() {
  if (typeof window === 'undefined') {
    return { webgl: false, tier: 'none', isMobile: false, reducedMotion: false, maxDpr: 1 };
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTablet = window.matchMedia('(max-width: 1023px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let webgl = false;
  try {
    const canvas = document.createElement('canvas');
    webgl = !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    webgl = false;
  }

  // Coarse capability signals available without touching the GPU.
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;

  let tier = 'high';
  if (!webgl || reducedMotion) tier = 'none';
  else if (isMobile || cores <= 4 || memory <= 4) tier = 'low';
  else if (isTablet || cores <= 6) tier = 'medium';

  // Cap DPR hard: rendering at 3x on a phone is the fastest way to drop frames.
  const dpr = window.devicePixelRatio || 1;
  const maxDpr = tier === 'low' ? Math.min(dpr, 1.25) : tier === 'medium' ? Math.min(dpr, 1.6) : Math.min(dpr, 2);

  return { webgl, tier, isMobile, isTablet, reducedMotion, maxDpr };
}

let cached = null;
export function getDeviceCapability() {
  if (!cached) cached = detect();
  return cached;
}

export function useDeviceCapability() {
  const [caps, setCaps] = useState(getDeviceCapability);

  useEffect(() => {
    // Only re-evaluate on breakpoint crossings, not on every resize pixel.
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => {
      cached = detect();
      setCaps(cached);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return caps;
}

/** Subscribe to a media query without re-rendering on unrelated resizes. */
export function useMediaQuery(query) {
  const subscribe = (cb) => {
    const mq = window.matchMedia(query);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  };
  const getSnapshot = () => window.matchMedia(query).matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

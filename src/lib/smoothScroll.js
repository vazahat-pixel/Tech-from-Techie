/**
 * Scrolling and the shared frame loop.
 *
 * Deliberately uses the browser's NATIVE scrolling.
 *
 * A JS smooth-scroll library (Lenis) intercepts every wheel event and moves the
 * page by writing a transform each frame. That hands scrolling to the main
 * thread, so any other work — a React render, an image decode, a style recalc —
 * shows up as visible stutter. Native scrolling runs on the compositor and
 * keeps up even while the main thread is busy, which is what actually makes it
 * feel like it never catches.
 *
 * `scroll-behavior: smooth` in CSS still gives animated anchor jumps, and the
 * browser implements that off the main thread too.
 */

let rafId = null;
const subscribers = new Set();

function frame(time) {
  for (const fn of subscribers) {
    try {
      fn(time);
    } catch (err) {
      // One bad subscriber must never kill the loop.
      console.error('[frame] subscriber failed', err);
    }
  }
  rafId = subscribers.size ? requestAnimationFrame(frame) : null;
}

export function initSmoothScroll() {
  // Nothing to initialise — native scrolling is already active. Kept as a
  // stable entry point so callers don't need to change.
  return null;
}

export function destroySmoothScroll() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  subscribers.clear();
}

/**
 * Subscribe to a shared requestAnimationFrame loop.
 * The loop only runs while at least one subscriber is registered, so an idle
 * page schedules no frames at all.
 */
export function onFrame(fn) {
  subscribers.add(fn);
  if (rafId === null) rafId = requestAnimationFrame(frame);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export function getLenis() {
  return null;
}

/** Prevent background scrolling while a modal owns the viewport. */
export function lockScroll(locked) {
  const body = document.body;
  if (locked) {
    // Compensate for the scrollbar so the page doesn't shift sideways.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
  } else {
    body.style.overflow = '';
    body.style.paddingRight = '';
  }
}

/** Smoothly scroll to an element or selector, allowing for the fixed navbar. */
export function scrollToTarget(target, { offset = -76 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

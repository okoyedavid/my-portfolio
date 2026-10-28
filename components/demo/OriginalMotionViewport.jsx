"use client";
import { useEffect, useRef } from "react";
import { mountOriginalMotion } from "@/lib/demo-motion/original-motion-controller";

/** React owns the viewport. Original scene shaders, camera and simulation stay intact. */
export default function OriginalMotionViewport({
  scene,
  timeline,
  paused = false,
  assetPrefix = "",
  onReady,
  onError,
}) {
  const host = useRef(null);
  const callbacks = useRef({ onReady, onError });
  const currentInstance = useRef(null);
  const pauseState = useRef(paused);
  useEffect(() => {
    pauseState.current = paused;
    currentInstance.current?.setPaused(paused);
  }, [paused]);
  useEffect(() => {
    callbacks.current = { onReady, onError };
  }, [onReady, onError]);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let alive = true,
      instance = null,
      visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      instance?.setVisible(visible);
    });
    observer.observe(node);
    const motion = mountOriginalMotion({
      host: node,
      kind: scene,
      assetPrefix,
      getProgress: () => timeline.current.progress,
      getPresentation: () => timeline.current.presentation || {},
      onFrame: ({ progress, busy, paused: frozen }) => {
        node.dataset.progress = String(progress);
        node.dataset.busy = String(busy);
        node.dataset.paused = String(Boolean(frozen));
      },
    });
    motion.ready
      .then((created) => {
        instance = created;
        if (!alive || !instance) return;
        currentInstance.current = instance;
        instance.setPaused(pauseState.current);
        instance.setVisible(visible);
        node.dataset.ready = "true";
        node.__originalMotion = instance;
        callbacks.current.onReady?.();
      })
      .catch((error) => {
        if (alive) callbacks.current.onError?.(error);
      });
    return () => {
      alive = false;
      currentInstance.current = null;
      observer.disconnect();
      node.dataset.ready = "false";
      delete node.__originalMotion;
      motion.dispose();
    };
  }, [scene, timeline, assetPrefix]);
  return (
    <div
      ref={host}
      data-original-engine={scene}
      data-ready="false"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#a0a5b1",
      }}
      role="img"
      aria-label={
        scene + " animation using the original Igloo rendering pipeline"
      }
    />
  );
}

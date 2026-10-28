"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import OriginalMotionViewport from "./demo/OriginalMotionViewport";

/** One renderer carries the rings journey through to the project wordmarks. */
export default function RingsTripViewport({
  progress,
  camera,
  projectIndex,
  opened,
  reducedMotion,
  paused = false,
  onReadyChange,
}) {
  const timeline = useRef({ progress: 0, presentation: {} });
  const host = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const onReady = useCallback(() => {
    setReady(true);
    onReadyChange?.(true);
  }, [onReadyChange]);
  const onError = useCallback(
    (err) => {
      setError(err.message);
      onReadyChange?.(false);
    },
    [onReadyChange],
  );
  useEffect(() => {
    timeline.current.presentation.projectIndex = projectIndex;
    timeline.current.presentation.opened = opened;
    timeline.current.presentation.reducedMotion = reducedMotion;
  }, [projectIndex, opened, reducedMotion]);
  useEffect(() => {
    const update = () => {
      timeline.current.progress = reducedMotion ? 1 : progress.get();
      timeline.current.presentation.camera = reducedMotion
        ? camera.get() >= 0.5
          ? 1
          : 0
        : camera.get();
      if (host.current)
        host.current.dataset.progress = String(timeline.current.progress);
    };
    update();
    const stopTravel = progress.on("change", update);
    const stopCamera = camera.on("change", update);
    return () => {
      stopTravel();
      stopCamera();
    };
  }, [progress, camera, reducedMotion]);
  return (
    <div
      ref={host}
      data-rings-viewport
      data-ready={ready}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <OriginalMotionViewport
        scene="portfolio"
        paused={paused}
        timeline={timeline}
        assetPrefix="/igloo-runtime"
        onReady={onReady}
        onError={onError}
      />
      {!ready && !error && (
        <p
          style={{
            position: "absolute",
            inset: "50% 0 auto",
            textAlign: "center",
            color: "#526077",
            fontSize: 12,
          }}
        >
          Preparing the trip…
        </p>
      )}
      {error && (
        <p
          role="status"
          style={{
            position: "absolute",
            inset: "auto 24px 24px",
            textAlign: "center",
            color: "#526077",
            fontSize: 12,
          }}
        >
          The 3D preview is unavailable. You can still explore every project
          below.
        </p>
      )}
    </div>
  );
}

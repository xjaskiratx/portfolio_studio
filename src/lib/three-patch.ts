import * as THREE from "three";

/**
 * Patch THREE.Clock globally to use THREE.Timer-based implementation.
 * This resolves deprecation warnings from libraries like @react-three/fiber
 * that still use THREE.Clock internally with Three.js r183+.
 */
const currentClockName = Reflect.get(THREE.Clock, "name");

if (typeof window !== "undefined" && currentClockName !== "TimerClockProxy") {
  class TimerClockProxy {
    private timer = new THREE.Timer();
    public autoStart: boolean;
    public running = false;
    public startTime = 0;
    public oldTime = 0;
    public elapsedTime = 0;

    constructor(autoStart = true) {
      this.autoStart = autoStart;
      this.timer.connect(document);
    }

    start() {
      const now = performance.now();
      this.startTime = now;
      this.oldTime = now;
      this.elapsedTime = 0;
      this.running = true;
      this.timer = new THREE.Timer();
      this.timer.connect(document);
      this.timer.reset();
    }

    getDelta() {
      if (this.autoStart && !this.running) {
        this.start();
        return 0;
      }

      if (!this.running) return 0;

      this.timer.update();
      const delta = this.timer.getDelta();
      this.oldTime = performance.now();
      this.elapsedTime += delta;
      return delta;
    }

    getElapsedTime() {
      this.getDelta();
      return this.elapsedTime;
    }

    stop() {
      this.getElapsedTime();
      this.running = false;
      this.autoStart = false;
    }
  }

  Object.defineProperty(THREE, "Clock", {
    value: TimerClockProxy,
    configurable: true,
    writable: true,
  });
}

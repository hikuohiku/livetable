const isDebug = process.env.DEBUG === "true";

function mkIfDebug<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> | void => {
    if (isDebug) {
      return fn(...args);
    }
  };
}

const devlog = mkIfDebug(console.log);
const devDir = mkIfDebug(console.dir);
const devTime = mkIfDebug(console.time);
const devTimeEnd = mkIfDebug(console.timeEnd);

export { devDir, devTime, devTimeEnd };
export default devlog;

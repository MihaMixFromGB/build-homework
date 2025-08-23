import { watch } from "chokidar";

const changedFilesLog = [];

export function getLog() {
  return changedFilesLog;
}

const watcher = watch("./src");

export async function subscribe() {
  watcher.on("change", (path) => {
    changedFilesLog.push(path);
  });
}

export function unsubscribe() {
  watcher.close();
}

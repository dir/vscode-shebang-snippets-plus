import * as vscode from "vscode";
import { Shebang } from "./types";

export function getLastShebangs(extensionContext: vscode.ExtensionContext) {
  return extensionContext.globalState.get<string[]>("lastShebangs") ?? [];
}

export function setLastShebang(
  extensionContext: vscode.ExtensionContext,
  lastShebang: Shebang,
  executablePath: string
) {
  const oldLastShebangs = getLastShebangs(extensionContext);
  const newShebang = `${executablePath}${lastShebang.executable}`;
  const newLastShebangs = [
    newShebang,
    ...oldLastShebangs.filter((shebang) => shebang !== newShebang),
  ];
  extensionContext.globalState.update("lastShebangs", newLastShebangs);
}

/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const titleBar = document.getElementById("title-bar");
document.addEventListener("DOMContentLoaded", () => {
  electron.baseInfo().then((info) => {
    titleBar.querySelector("#title").innerHTML = info.title;
    titleBar.querySelector("#icon").src = info.icon;
  });
});

const information = document.getElementById("info");
information.innerHTML = `Using Chrome <code>v${versions.chrome()}</code>, Node.js <code>v${versions.node()}</code>, and Electron <code>v${versions.electron()}</code>`;

const box = Array.from({ length: 10 });
box.forEach((_, i) => {
  box[i] = `<div class="box" id="${i}" data-index="${i}"></div>`;
});
document.querySelector(".boxes").innerHTML = box.join("");

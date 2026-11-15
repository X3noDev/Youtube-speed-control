// ==UserScript==
// @name         Youtube speed control
// @description  ultimate speeding
// @version      2.5
// @match        https://www.youtube.com/*
// @grant        none
// @author       Xeno
// ==/UserScript==

(function() {
    'use strict';

    let speed = 2;
    let enabled = true;

    function getVideo() {
        return document.querySelector("video");
    }

    function applySpeed() {
        const video = getVideo();
        if (!video) return;
        video.playbackRate = enabled ? speed : 1;
    }

    function styleButton(btn, width = "52px") {
        btn.style.marginRight = "8px";
        btn.style.padding = "0 10px";
        btn.style.height = "36px";
        btn.style.width = width;
        btn.style.minWidth = width;
        btn.style.boxSizing = "border-box";
        btn.style.border = "1px solid rgba(255,255,255,0.18)";
        btn.style.borderRadius = "18px";
        btn.style.cursor = "pointer";
        btn.style.font = "500 14px Roboto, Arial, sans-serif";
        btn.style.lineHeight = "36px";
        btn.style.letterSpacing = "0.2px";
        btn.style.textAlign = "center";
        btn.style.whiteSpace = "nowrap";
        btn.style.transition = "background-color 0.15s ease, filter 0.15s ease";
        btn.style.boxShadow = "none";
        btn.style.outline = "none";
        btn.style.flex = "0 0 auto";
        btn.style.display = "inline-flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.opacity = "1";
        btn.style.visibility = "visible";
        btn.style.zIndex = "9999";
    }

    function updateSpeedButton(btn) {
        btn.textContent = speed.toFixed(1);
        btn.style.background = enabled ? "rgba(140, 20, 20, 0.85)" : "#000000";
        btn.style.color = "#ffffff";
    }

    function createIconButton(symbol, title, width) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = symbol;
        btn.title = title;
        styleButton(btn, width);
        btn.style.background = "#000000";
        btn.style.color = "#ffffff";

        btn.addEventListener("mouseenter", () => {
            btn.style.filter = "brightness(1.12)";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.filter = "none";
        });

        return btn;
    }

    function findActionContainer() {
        return document.querySelector("#actions") || document.querySelector("#top-level-buttons-computed") || document.querySelector("#menu-container");
    }

    function createControls() {
        if (document.getElementById("tm-speed-toggle")) return;

        const container = findActionContainer();
        if (!container) return;

        const wrapper = document.createElement("div");
        wrapper.id = "tm-speed-wrapper";
        wrapper.style.display = "inline-flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "0px";
        wrapper.style.marginRight = "8px";
        wrapper.style.flex = "0 0 auto";
        wrapper.style.position = "relative";
        wrapper.style.zIndex = "9999";
        wrapper.style.opacity = "1";
        wrapper.style.visibility = "visible";

        const decBtn = createIconButton("−", "Slow down by 0.5", "36px");
        const speedBtn = document.createElement("button");
        speedBtn.id = "tm-speed-toggle";
        speedBtn.type = "button";
        speedBtn.title = "Toggle video speed";
        styleButton(speedBtn, "52px");
        updateSpeedButton(speedBtn);

        const incBtn = createIconButton("+", "Speed up by 0.5", "36px");

        decBtn.addEventListener("click", () => {
            speed = Math.max(0.5, speed - 0.5);
            enabled = true;
            updateSpeedButton(speedBtn);
            applySpeed();
        });

        incBtn.addEventListener("click", () => {
            speed = speed + 0.5;
            enabled = true;
            updateSpeedButton(speedBtn);
            applySpeed();
        });

        speedBtn.addEventListener("click", () => {
            enabled = !enabled;
            updateSpeedButton(speedBtn);
            applySpeed();
        });

        wrapper.appendChild(decBtn);
        wrapper.appendChild(speedBtn);
        wrapper.appendChild(incBtn);

        container.insertBefore(wrapper, container.firstChild);
    }

    const observer = new MutationObserver(() => {
        createControls();
        applySpeed();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    createControls();
    setInterval(applySpeed, 1000);
})();

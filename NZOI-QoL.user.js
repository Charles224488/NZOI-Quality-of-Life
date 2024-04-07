// ==UserScript==
// @name         NZOI-QoL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Quality of Life features for the New Zealand Informatics Olympiad Website.
// @author       Charles
// @match        https://train.nzoi.org.nz/*
// @updateURL    https://github.com/Charles224488/NZOI-Quality-of-Life/raw/main/NZOI-QoL.user.js
// @downloadURL  https://github.com/Charles224488/NZOI-Quality-of-Life/raw/main/NZOI-QoL.user.js
// @icon         https://i.imgur.com/sEhgSRv.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let widthFlag = true, topFlag = true;
    const sideLogo = document.getElementById('side');
    const group = document.querySelector('div[style="float: right; width: 240px; margin: 0px; margin-right: -250px"]');
    const groupMargin = document.querySelector('div[style="padding: 0px; padding-right: 250px"]');
    const main = document.getElementById("main");
    const mainMenu = document.querySelector('#main-menu');
    const mainContainer = document.querySelector('#main-container');
    const titleBox = document.querySelector('#main-page-title-box');

    function disableScrollbar() {
        let Scrollbar = document.getElementById('main');
        Scrollbar.style.msOverflowStyle = 'none';
        Scrollbar.style.scrollbarWidth = 'none';
        Scrollbar.style.overflowY = 'scroll';
        Scrollbar.insertAdjacentHTML('beforeend', '<style>#main::-webkit-scrollbar { display: none; }</style>');
    }

    function set(element, attribute, value) {
        if (element) {
            element.style[attribute] = value;
        } else {
            console.log("Missing Element, 'set' function");
        }
    }

    function toggleElement(element) {
        if (element) {
            if (element.style.display === 'none') {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        } else {
            console.log("Element does not exist");
        }
    }

    // Compacter
    function checkdash() {
        if (window.innerWidth < 1024) {
            if (widthFlag) {
                toggleElement(sideLogo);
                set(main, "left", "0px");
                set(mainMenu, "left", "0px");

                set(mainContainer, "margin", "0px");
                set(titleBox, "margin-right", "10px");

                toggleElement(group);
                set(groupMargin, "padding-right", "0px");
                widthFlag = false;
            }
        } else {
            if (!widthFlag) {
                toggleElement(sideLogo);
                set(main, "left", "200px");
                set(mainMenu, "left", "200px");

                set(mainContainer, "margin", "10px");
                set(titleBox, "margin-right", "20px");

                toggleElement(group);
                set(groupMargin, "padding-right", "250px");
                widthFlag = true;
            }
        }
    }

    function check() {
        if (window.innerWidth < 1024) {
            if (widthFlag) {
                toggleElement(sideLogo);
                set(main, "left", "0px");
                set(mainMenu, "left", "0px");

                set(mainContainer, "margin", "0px");
                set(mainContainer, "padding", "4px");
                set(titleBox, "margin-right", "4px");
                widthFlag = false;
            }
        } else {
            if (!widthFlag) {
                toggleElement(sideLogo);
                set(main, "left", "200px");
                set(mainMenu, "left", "200px");

                set(mainContainer, "margin", "10px");
                set(mainContainer, "padding", "10px");
                set(titleBox, "margin-right", "20px");
                widthFlag = true;
            }
        }
    }
    if (window.location.href === "https://train.nzoi.org.nz/") {
        window.addEventListener('resize', checkdash); checkdash();
    } else {
        window.addEventListener('resize', check); check();
    }

    // Middle Click
    document.addEventListener('mousedown', event => {
        if (event.button === 1) {
            event.preventDefault();
            if (topFlag) {
                main.style.top = "0px";
                mainMenu.style.display = 'none';
            } else {
                main.style.top = "30px";
                mainMenu.style.display = 'block';
            }
            topFlag = !topFlag;
        }
    });

    // Paste Fix, Invis Outline, and Scrollbar Removal
    document.addEventListener("paste", e => e.f(), true);
    set(main, "outline", 0); disableScrollbar();
})();
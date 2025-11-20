/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/desktop.js":
/*!************************!*\
  !*** ./src/desktop.js ***!
  \************************/
/***/ (() => {

eval("{(function () {\n    \"use strict\";\n\n    console.log(\"cccccc \");\n    kintone.events.on([\"app.record.edit.show\",], (event) => {\n\n        const headerSpace = kintone.app.record.getHeaderMenuSpaceElement();\n\n        const btn = document.createElement(\"button\");\n        btn.textContent = \"Update status\";\n        btn.className = \"kintoneplugin-button-normal\";\n\n        btn.onclick = function() {\n            alert(\"Bạn đã nhấn button!\");\n        };\n\n        // Thêm button vào header\n        headerSpace.appendChild(btn);\n\n        event.record;\n        console.log(\"Record: \", event.record)\n        return event;\n    });\n\n    kintone.events.on(\"app.record.index.show\", function(event) {\n        const records = event.records;\n\n\n        // 1️⃣ Thêm checkbox \"Check All\" vào header (th)\n        const table = document.querySelector(\"table.recordlist-gaia\");\n        const theadRow = table.querySelector(\"thead th\");\n\n        if (!theadRow.querySelector(\".my-safe-checkbox-header\")) {\n            const th = document.createElement(\"th\");\n            th.className = \"my-safe-checkbox-header\";\n            th.style.textAlign = \"center\";\n            th.style.width = \"60px\";\n\n            // Checkbox Select All\n            const checkAll = document.createElement(\"input\");\n            checkAll.type = \"checkbox\";\n\n            checkAll.onchange = function() {\n                const allCheckboxes = table.querySelectorAll(\".my-safe-checkbox\");\n                allCheckboxes.forEach(cb => (cb.checked = checkAll.checked));\n            };\n\n            th.appendChild(checkAll);\n\n            // Chèn th vào đầu tiên\n            theadRow.insertBefore(th, theadRow.firstChild);\n        }\n\n\n        const elements = kintone.app.getFieldElements(\"role\");\n\n        console.log(\"elements: \", elements)\n\n        if (!elements || !records) return event;\n\n        // 2️⃣ Thêm checkbox vào từng record row\n        elements.forEach((el, i) => {\n            const row = el.parentElement;  // <tr> của record\n            if (row.querySelector(\".my-safe-checkbox-cell\")) return;\n\n            // create td left\n            const td = document.createElement(\"td\");\n            td.className = \"my-safe-checkbox-cell\";\n            td.style.textAlign = \"center\";\n            td.style.width = \"60px\";\n\n            // create input checkbox\n            const checkbox = document.createElement(\"input\");\n            checkbox.type = \"checkbox\";\n            checkbox.className = \"my-safe-checkbox\";\n\n            checkbox.onchange = function() {\n                console.log(\n                    \"Checked record:\",\n                    records[i].$id.value,\n                    checkbox.checked\n                );\n            };\n\n            td.appendChild(checkbox);\n\n            // append td to first column\n            row.insertBefore(td, row.firstElementChild);\n        });\n\n        return event;\n    });\n})();\n\n//# sourceURL=webpack://harrs/./src/desktop.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/desktop.js"]();
/******/ 	
/******/ })()
;
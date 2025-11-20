(function () {
    "use strict";

    console.log("cccccc ");
    kintone.events.on(["app.record.edit.show",], (event) => {

        const headerSpace = kintone.app.record.getHeaderMenuSpaceElement();

        const btn = document.createElement("button");
        btn.textContent = "Update status";
        btn.className = "kintoneplugin-button-normal";

        btn.onclick = function() {
            alert("Bạn đã nhấn button!");
        };

        // Thêm button vào header
        headerSpace.appendChild(btn);

        event.record;
        console.log("Record: ", event.record)
        return event;
    });

    kintone.events.on("app.record.index.show", function(event) {
        const records = event.records;


        // 1️⃣ Thêm checkbox "Check All" vào header (th)
        const table = document.querySelector("table.recordlist-gaia");
        const theadRow = table.querySelector("thead th");

        if (!theadRow.querySelector(".my-safe-checkbox-header")) {
            const th = document.createElement("th");
            th.className = "my-safe-checkbox-header";
            th.style.textAlign = "center";
            th.style.width = "60px";

            // Checkbox Select All
            const checkAll = document.createElement("input");
            checkAll.type = "checkbox";

            checkAll.onchange = function() {
                const allCheckboxes = table.querySelectorAll(".my-safe-checkbox");
                allCheckboxes.forEach(cb => (cb.checked = checkAll.checked));
            };

            th.appendChild(checkAll);

            // Chèn th vào đầu tiên
            theadRow.insertBefore(th, theadRow.firstChild);
        }


        const elements = kintone.app.getFieldElements("role");

        console.log("elements: ", elements)

        if (!elements || !records) return event;

        // 2️⃣ Thêm checkbox vào từng record row
        elements.forEach((el, i) => {
            const row = el.parentElement;  // <tr> của record
            if (row.querySelector(".my-safe-checkbox-cell")) return;

            // create td left
            const td = document.createElement("td");
            td.className = "my-safe-checkbox-cell";
            td.style.textAlign = "center";
            td.style.width = "60px";

            // create input checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "my-safe-checkbox";

            checkbox.onchange = function() {
                console.log(
                    "Checked record:",
                    records[i].$id.value,
                    checkbox.checked
                );
            };

            td.appendChild(checkbox);

            // append td to first column
            row.insertBefore(td, row.firstElementChild);
        });

        return event;
    });
})();
// components/CheckboxColumn.js

export function renderHeaderCheckbox(table, onSelectAll) {
    const theadRow = table.querySelector("thead th");
    if (!theadRow || theadRow.querySelector(".my-safe-checkbox-header")) return;
    const th = document.createElement("th");
    th.className = "my-safe-checkbox-header";
    th.style.textAlign = "center";
    th.style.width = "60px";

    const checkAll = document.createElement("input");
    checkAll.type = "checkbox";
    checkAll.onchange = () => onSelectAll(checkAll.checked);

    th.appendChild(checkAll);
    theadRow.insertBefore(th, theadRow.firstChild);
}

export function renderRowCheckbox(row, recordId, onChange) {
    if (row.querySelector(".my-safe-checkbox-cell")) return;

    const td = document.createElement("td");
    td.className = "my-safe-checkbox-cell";
    td.style.textAlign = "center";
    td.style.width = "60px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "my-safe-checkbox";

    checkbox.onchange = () => onChange(recordId, checkbox.checked);

    td.appendChild(checkbox);

    row.insertBefore(td, row.firstElementChild);
}

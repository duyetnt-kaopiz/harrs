import { Button } from 'kintone-ui-component/lib/button';
import { Dialog } from "kintone-ui-component/lib/dialog";
import { Dropdown } from "kintone-ui-component/lib/dropdown";

export class WorkFlowComponent {

    constructor() {
        this.dialog = null;
    }

    /**
     * @function render dialog approve
     * @param {*} statusList
     * @param {*} assigneeList
     * @param {*} onConfirm
     */
    renderDialog(statusList, assigneeList, onConfirm) {
        const statusDropdown = new Dropdown({
            label: 'Status:',
            requiredIcon: true,
            items: statusList.map(s => ({ value: s, label: s }))
        });
        const assigneeDropdown = new Dropdown({
            label: 'User:',
            items: assigneeList.map(u => ({
                value: u.code,
                label: u.name
            }))
        });
        const okBtn = new Button({ text: "Xác nhận", type: "submit" });
        const cancelBtn = new Button({ text: "Hủy", type: "normal" });
        // okBtn.addEventListener('click', clickEvent => {
        //     onConfirm({
        //         status: statusDropdown.value,
        //         assignee: assigneeDropdown.value
        //     });
        //     this.dialog.close();
        // });
        cancelBtn.addEventListener('click', clickEvent => {
            this.dialog.close()
        });
        okBtn.addEventListener('click', clickEvent => {
            this.dialog.close()
        });

        const divFooter = document.createElement('div');
        divFooter.appendChild(okBtn);
        divFooter.appendChild(cancelBtn);

        const divContent = document.createElement("div");
        divContent.id = "content-modal";
        divContent.appendChild(document.createElement("div")).innerHTML = "<b>Chọn trạng thái</b>";
        divContent.appendChild(statusDropdown);
        divContent.appendChild(document.createElement("br"));
        divContent.appendChild(document.createElement("div")).innerHTML = "<b>Chọn người xử lý</b>";
        divContent.appendChild(assigneeDropdown);

        this.dialog = new Dialog({
            title: 'Title',
            header: "Chuyển trạng thái workflow",
            className: 'options-class',
            id: 'options-id',
            content: divContent,
            footer: divFooter
        });
        return this.dialog;
    }

    /**
     * @function render checkbox all
     * @param table
     * @param onSelectAll
     */
    renderHeaderCheckbox(table, onSelectAll) {
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

    /**
     * @function render checkbox ech row
     * @param row
     * @param recordId
     * @param onChange
     * @param defaultChecked
     */
    renderRowCheckbox(row, recordId, onChange, defaultChecked = false) {
        if (row.querySelector(".my-safe-checkbox-cell")) return;
        const td = document.createElement("td");
        td.className = "my-safe-checkbox-cell";
        td.style.textAlign = "center";
        td.style.width = "60px";

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "my-safe-checkbox";
        checkBox.dataset.recordId = recordId;
        checkBox.checked = defaultChecked;

        checkBox.addEventListener("change", () => {
            onChange(recordId, checkBox.checked);
        });
        td.appendChild(checkBox);
        row.insertBefore(td, row.firstElementChild);
    }

    /**
     * @function render button show dialog
     * @returns {Button}
     */
    renderButtonModal() {
        const header = kintone.app.getHeaderMenuSpaceElement();
        const button = new Button({
            text: 'Submit',
            type: 'submit'
        });
        header.appendChild(button);
        return button;
    }
}

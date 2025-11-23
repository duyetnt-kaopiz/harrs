import { Button } from 'kintone-ui-component/lib/button';
import { Dialog } from "kintone-ui-component/lib/dialog";
import { Dropdown } from "kintone-ui-component/lib/dropdown";
import { UserOrgGroupSelect } from "kintone-ui-component/lib/user-org-group-select";
import { WorkFlowService } from "../../services/workfllow/WorkFlowService.js";
const workFollowService = new WorkFlowService();

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
            label: 'Chọn trạng thái',
            id: 'status-id',
            requiredIcon: true,
            items: statusList.map(s => ({ value: s, label: s }))
        });

        const assigneeDropdown = new UserOrgGroupSelect({
            label: 'Chọn người xử lý',
            items: assigneeList.map(u => ({
                value: u.code,
                label: u.name,
                type: 'user'
            })),
            className: 'options-class',
            icon: 'user',
            id: 'user-id',
            placeholder: 'Please select assignees',
            visible: true,
            disabled: false
        });

        const btnApprove = new Button({ text: "Approve", type: "submit" });
        const cancelBtn = new Button({ text: "Cancel", type: "alert" });

        btnApprove.addEventListener('click', () => {
            onConfirm({
                status: statusDropdown.value,
                assignee: assigneeDropdown.value[0],
                modal: this.dialog
            });
        });

        cancelBtn.addEventListener('click', clickEvent => {
            this.dialog.close()
        });

        const divFooter = document.createElement('div');
        divFooter.appendChild(btnApprove);
        divFooter.appendChild(cancelBtn);

        const divContent = document.createElement("div");
        divContent.id = "content-modal";
        divContent.appendChild(statusDropdown);
        divContent.appendChild(document.createElement("br"));
        divContent.appendChild(document.createElement("br"));
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
            id: 'btn-show-modal',
            text: 'ステータス更新',
            type: 'submit'
        });
        if (document.getElementById('btn-show-modal') != null) {
            return;
        }
        header.appendChild(button);
        return button;
    }
}

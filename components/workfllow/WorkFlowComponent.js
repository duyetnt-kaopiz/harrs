import {Button} from 'kintone-ui-component/lib/button';
import {Dialog} from "kintone-ui-component/lib/dialog";
import {Dropdown} from "kintone-ui-component/lib/dropdown";
import {Spinner} from 'kintone-ui-component/lib/spinner';

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
        if (this.dialog) {
            return;
        }
        const statusDropdown = new Dropdown({
            label: '対応ステータス:',
            id: 'status-id',
            requiredIcon: true,
            items: statusList.map(s => ({ value: s, label: s }))
        });
        const assigneeDropdown = new Dropdown({
            label: '担当者（オプション）:',
            items: assigneeList.map(user => ({
                value: user.code,
                label: user.name,
            })),
            id: 'user-id',
            visible: true,
            disabled: false
        });

        const statusError = document.createElement("div");
        statusError.className = "wf-error";
        statusError.style.color = "red";
        statusError.style.fontSize = "12px";
        statusError.style.marginTop = "4px";
        const showGeneralError = document.createElement("div");
        showGeneralError.className = "wf-error";
        showGeneralError.style.color = "red";
        showGeneralError.style.fontSize = "12px";
        showGeneralError.style.marginTop = "40px";

        const btnApprove = new Button({ text: "Approve", type: "submit" });
        const cancelBtn = new Button({ text: "Cancel", type: "alert" });

        btnApprove.addEventListener('click', () => {
            onConfirm({
                status: statusDropdown.value,
                assignee: assigneeDropdown.value,
                modal: this.dialog,
                showStatusError: msg => statusError.textContent = msg,
                showGeneralError: msg => showGeneralError.textContent = msg,
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
        divContent.appendChild(statusError);
        divContent.appendChild(document.createElement("br"));
        divContent.appendChild(assigneeDropdown);
        divContent.appendChild(showGeneralError);
        this.dialog = new Dialog({
            title: 'Title',
            header: "プロセス管理ステータスを更新",
            id: 'modal-approve',
            content: divContent,
            footer: divFooter
        });
        return this.dialog;
    }

    /**
     * @function render checkbox all
     * @param table
     * @param records
     * @param onSelectAll
     */
    renderHeaderCheckbox(table, records, onSelectAll) {
        const theadRow = table.querySelector("thead th");

        if (!records.length) return;

        if (!theadRow || theadRow.querySelector(".my-safe-checkbox-header")) return;
        const th = document.createElement("th");
        th.className = "my-safe-checkbox-header";
        th.style.textAlign = "center";
        th.style.width = "60px";

        const checkAll = document.createElement("input");
        checkAll.type = "checkbox";
        checkAll.className = "check-all";
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
            type: 'submit',
            disabled: true
        });
        if (document.getElementById('btn-show-modal') != null) {
            return;
        }
        header.appendChild(button);
        return button;
    }

    loadingPage(isLoading) {
        const existingWrapper = document.getElementById("wf-global-spinner");
        if (existingWrapper) {
            if (this.spinnerInstance) {
                isLoading ? this.spinnerInstance.open() : this.spinnerInstance.close();
                existingWrapper.style.display = isLoading ? "flex" : "none";
            }
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.id = "wf-global-spinner";
        wrapper.style.position = "fixed";
        wrapper.style.top = 0;
        wrapper.style.left = 0;
        wrapper.style.width = "100vw";
        wrapper.style.height = "100vh";
        wrapper.style.background = "rgba(0,0,0,0.2)";
        wrapper.style.display = "none";
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "center";
        wrapper.style.zIndex = 9999;

        const spinner = new Spinner({
            isVisible: true,
            size: "large",
            text: 'loading...',
            className: 'options-class',
            id: 'options-id',
            container: document.body
        });

        wrapper.appendChild(spinner);
        document.body.appendChild(wrapper);
        this.spinnerInstance = spinner;
        wrapper.style.display = isLoading ? "flex" : "none";
        isLoading ? spinner.open() : spinner.close();
    }
}

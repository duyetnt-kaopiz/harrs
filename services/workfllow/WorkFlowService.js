// services/CheckboxService.js

export class WorkFlowService {
    constructor() {
        this.storageKey = "checked-records";
        this.checkedRecords = this.loadCheckedRecords();
    }

    loadCheckedRecords() {
        return JSON.parse(localStorage.getItem(this.storageKey) || "{}");
    }

    saveCheckedRecords() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.checkedRecords));
    }

    onCheck(recordId, checked) {
        if (checked) {
            this.checkedRecords[recordId] = true;
        } else {
            delete this.checkedRecords[recordId];
        }
        this.saveCheckedRecords();
    }

    onCheckAll(checked, table) {
        const checkboxes = table.querySelectorAll(".my-safe-checkbox");
        checkboxes.forEach(cb => {
            cb.checked = checked;
            const recordId = cb.dataset.recordId;

            if (checked) {
                this.checkedRecords[recordId] = true;
            } else {
                delete this.checkedRecords[recordId];
            }
        });
        this.saveCheckedRecords();
    }

    isChecked(recordId) {
        return !!this.checkedRecords[recordId];
    }
}

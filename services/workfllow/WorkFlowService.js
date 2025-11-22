// services/CheckboxService.js
import { RecordRepository } from "../../infrastructure/workfllow/RecordRepository.js";
export class WorkFlowService {
    constructor() {
        this.storageKey = "checked-records";
        this.checkedRecords = this.loadCheckedRecords();
        this.appId = kintone.app.getId();
        this.repo = new RecordRepository();
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

    /** Lấy danh sách trạng thái từ Process Management */
    async getStatusList() {
        const data = await this.repo.getProcessStatus();
        return Object.keys(data.states);
    }

    /** Lấy list user assign */
    async getAssigneeList() {
        return await this.repo.getUserList();
    }

    /** Lấy action name (từ -> đến) */
    async getActionNameByStatus(targetStatus) {
        const process = await this.repo.getProcessStatus();
        const found = process.actions.find(a => a.to === targetStatus);

        if (!found) {
            throw new Error("Không tìm thấy action để chuyển tới trạng thái: " + targetStatus);
        }

        return found.name;
    }

    /** Update Workflow (hàng loạt) */
    async updateWorkflowMany(recordIds, actionName, assigneeCode) {
        return await this.repo.updateRecordStatusMany(recordIds, actionName, assigneeCode);
    }
}

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

    checkHeaderCheckbox(headerCheckbox, records) {
        if (headerCheckbox) {
            headerCheckbox.checked = records.every(r => this.isChecked(r.$id.value));
        }
    }

    clearLocalStorage() {
        localStorage.removeItem(this.storageKey);
    }

    /** Lấy danh sách trạng thái từ Process Management */
    async getStatusList() {
        const data = await this.repo.getProcessStatus(this.appId);
        return Object.keys(data.states);
    }

    /** Lấy list user assign */
    async getAssigneeList() {
        return await this.repo.getUserList();
    }

    /** Lấy action name (từ -> đến) */
    async getActionNameByStatus(targetStatus) {
        const process = await this.repo.getProcessStatus(this.appId);
        const found = process.actions.find(a => a.to === targetStatus);

        if (!found) {
            throw new Error("Không tìm thấy action để chuyển tới trạng thái: " + targetStatus);
        }

        return found.name;
    }

    async handleApprove(status, assignee, modal, showStatusError, showGeneralError) {
        try {
            if (!status) {
                showStatusError("Vui lòng chọn trạng thái.");
                return;
            }
            const recordIds = Object.keys(this.loadCheckedRecords());
            if (recordIds.length === 0) {
                showGeneralError("Vui lòng chọn ít nhất một bản ghi.");
                return;
            }
            const actionName = await this.getActionNameByStatus(status);
            await this.updateWorkflowMany(recordIds, actionName, assignee);

            alert("Cập nhật trạng thái thành công!");
            location.reload();
        } catch (err) {
            console.error(err);
            showGeneralError(err.message)
            alert("Có lỗi xảy ra: " + err.message);
        } finally {
            //
        }
    }

    /**
     * @function handle update status workflow with path
     * @param recordIds
     * @param actionName
     * @param assigneeCode
     * @returns {Promise<*>}
     */
    async updateWorkflowMany(recordIds, actionName, assigneeCode) {

        const cleanIds = recordIds.filter(id => id && id !== 'undefined' && id.trim() !== '');

        const body = cleanIds.map(id => ({
            id,
            action: actionName,
            assignee: assigneeCode
        }));

        const payload = {
            app: this.appId,
            records: body
        };
        return await this.repo.updateRecordStatusMany(payload);
    }
}

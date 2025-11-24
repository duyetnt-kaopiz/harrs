// services/CheckboxService.js
import { RecordRepository } from "../../infrastructure/workfllow/RecordRepository.js";
import {WorkFlowComponent} from "../../components/workfllow/WorkFlowComponent.js";

export class WorkFlowService {
    constructor() {
        this.storageKey = "checked-records";
        this.checkedRecords = this.loadCheckedRecords();
        this.appId = kintone.app.getId();
        this.repo = new RecordRepository();
        this.component = new WorkFlowComponent();
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
        this.updateApproveButtonState(this.checkedRecords);
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
        this.updateApproveButtonState(this.checkedRecords);
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

    updateApproveButtonState(checkedRecords) {
        const btnShowModal = document.getElementById("btn-show-modal");
        if (!btnShowModal) return;
        btnShowModal.disabled = Object.keys(checkedRecords).length === 0;
    }

    /**
     * @function get Process status
     * @returns {Promise<string[]>}
     */
    async getStatusList() {
        const data = await this.repo.getProcessStatus(this.appId);
        return Object.keys(data.states);
    }

    /**
     * @function get Process assign
     * @returns {Promise<*>}
     */
    async getAssigneeList() {
        return await this.repo.getUserList();
    }

    /**
     * @function get action name from list status
     * @param targetStatus
     * @returns {Promise<*>}
     */
    async getActionNameByStatus(targetStatus) {
        const process = await this.repo.getProcessStatus(this.appId);

        console.log("targetStatus:  ", targetStatus)
        console.log("process:  ", process)
        const found = process.actions.find(a => a.to === targetStatus);

        if (!found) {
            throw new Error("アクションが見つかりません: " + targetStatus);
        }

        return found.name;
    }

    async handleApprove(status, assignee, modal, showStatusError, showGeneralError) {
        try {
            if (!status) {
                showStatusError("状態を選択してください。");
                return;
            }
            const recordIds = Object.keys(this.loadCheckedRecords());
            if (recordIds.length === 0) {
                showGeneralError("少なくとも1件のレコードを選択してください。");
                return;
            }
            this.component.loadingPage(true);
            const actionName = await this.getActionNameByStatus(status);
            await this.updateWorkflowMany(recordIds, actionName, assignee);

            alert("状態を正常に更新しました！");
            location.reload();
        } catch (err) {
            console.error(err);
            showGeneralError(err.message)
        } finally {
            this.component.loadingPage(false);
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
            ...(assigneeCode ? { assignee: assigneeCode } : {})
        }));

        console.log("body: ", body)
        const payload = {
            app: this.appId,
            records: body
        };
        return await this.repo.updateRecordStatusMany(payload);
    }
}

import { WorkFlowComponent } from "../components/workfllow/WorkFlowComponent.js";
import { WorkFlowService } from "../services/workfllow/WorkFlowService.js";

const renderComponent = new WorkFlowComponent();
const workFollowService = new WorkFlowService();

kintone.events.on("app.record.index.show", async function(event) {
    const records = event.records;
    const elements = kintone.app.getFieldElements("Record_number");

    if (!records) return event;
    // add th checkbox all
    const table = document.querySelector("table.recordlist-gaia");
    renderComponent.renderHeaderCheckbox(table, (checked) => {
        workFollowService.onCheckAll(checked, table);
    });
    // add checkbox to each record
    elements.forEach((el, i) => {
        const row = el.parentElement;
        const recordId = records[i].$id.value;
        renderComponent.renderRowCheckbox(
            row, recordId,
            (id, checked) => workFollowService.onCheck(id, checked),
            workFollowService.isChecked(recordId)
        );
    });
    // add button approve
    const btnModal = renderComponent.renderButtonModal();
    const status = await workFollowService.getStatusList();
    const users = await workFollowService.getAssigneeList();
    const dialog = await renderComponent.renderDialog(status, users, btnModal);

    if (btnModal) {
        btnModal.addEventListener('click', clickEvent => {
            dialog.open();
        });
    }

    return event;
});

import { WorkFlowComponent } from "../components/workfllow/WorkFlowComponent.js";
import { WorkFlowService } from "../services/workfllow/WorkFlowService.js";

const renderComponent = new WorkFlowComponent();
const workFollowService = new WorkFlowService();

kintone.events.on("app.record.index.show", function(event) {
    const records = event.records;

    console.log("rsssse: ", records)

    const elements = kintone.app.getFieldElements("Record_number");

    if (!records || !elements) return event;

    // add button approe
    renderComponent.approveRender(event);

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

    return event;
});

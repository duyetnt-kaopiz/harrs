import { RenderComponent } from "../components/workfllow/apporveComponent.js";
import { WorkFollowService } from "../services/workfllow/CheckboxService.js";

const renderComponent = new RenderComponent();
const workFollowService = new WorkFollowService();

kintone.events.on("app.record.index.show", function(event) {
    const records = event.records;

    const elements = kintone.app.getFieldElements("role");

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

        renderComponent.renderRowCheckbox(row, recordId, (id, checked) => {
            workFollowService.onCheck(id, checked);
        });
    });

    return event;
});

import { renderHeaderCheckbox, renderRowCheckbox } from "../components/workfllow/CheckboxColumn.js";
import { apporveRender } from "../components/workfllow/apporveComponent.js";
import { CheckboxService } from "../services/workfllow/CheckboxService.js";

kintone.events.on("app.record.index.show", function(event) {
    const records = event.records;
    console.log("xxx=======>: ", records)
    const elements = kintone.app.getFieldElements("role");

    if (!records || !elements) return event;

    // add button approe
    apporveRender(event);

    const table = document.querySelector("table.recordlist-gaia");


    renderHeaderCheckbox(table, (checked) => {
        CheckboxService.onCheckAll(checked, table);
    });

    // add checkbox to each record
    elements.forEach((el, i) => {
        const row = el.parentElement;
        const recordId = records[i].$id.value;

        renderRowCheckbox(row, recordId, (id, checked) => {
            CheckboxService.onCheck(id, checked);
        });
    });

    return event;
});

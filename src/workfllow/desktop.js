import { renderHeaderCheckbox, renderRowCheckbox } from "../../components/workfllow/CheckboxColumn.js";
import { CheckboxService } from "../..//services/workfllow/CheckboxService.js";

kintone.events.on("app.record.index.show", function(event) {
    const records = event.records;
    const elements = kintone.app.getFieldElements("role");

    if (!records || !elements) return event;

    const table = document.querySelector("table.recordlist-gaia");

    // Thêm checkbox Select All
    renderHeaderCheckbox(table, (checked) => {
        CheckboxService.onCheckAll(checked, table);
    });

    // Thêm checkbox vào từng record row
    elements.forEach((el, i) => {
        const row = el.parentElement;
        const recordId = records[i].$id.value;

        renderRowCheckbox(row, recordId, (id, checked) => {
            CheckboxService.onCheck(id, checked);
        });
    });

    return event;
});

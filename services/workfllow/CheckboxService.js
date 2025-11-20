// services/CheckboxService.js

export class WorkFollowService {
    onCheck(recordId, checked) {
        console.log("Checked record:", recordId, checked);
        //code here
    }

    onCheckAll(checked, table) {
        const checkboxes = table.querySelectorAll(".my-safe-checkbox");
        checkboxes.forEach(cb => (cb.checked = checked));
    }
}

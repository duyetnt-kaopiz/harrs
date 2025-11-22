import { Button } from 'kintone-ui-component/lib/button';
import { Dialog } from "kintone-ui-component/lib/dialog";

export class WorkFlowComponent {
    renderHeaderCheckbox(table, onSelectAll) {
        const theadRow = table.querySelector("thead th");
        if (!theadRow || theadRow.querySelector(".my-safe-checkbox-header")) return;
        const th = document.createElement("th");
        th.className = "my-safe-checkbox-header";
        th.style.textAlign = "center";
        th.style.width = "60px";

        const checkAll = document.createElement("input");
        checkAll.type = "checkbox";
        checkAll.onchange = () => onSelectAll(checkAll.checked);

        th.appendChild(checkAll);
        theadRow.insertBefore(th, theadRow.firstChild);
    }

    renderRowCheckbox(row, recordId, onChange, defaultChecked = false) {
        if (row.querySelector(".my-safe-checkbox-cell")) return;
        const td = document.createElement("td");
        td.className = "my-safe-checkbox-cell";
        td.style.textAlign = "center";
        td.style.width = "60px";

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "my-safe-checkbox";
        checkBox.dataset.recordId = recordId;
        checkBox.checked = defaultChecked;

        checkBox.addEventListener("change", () => {
            onChange(recordId, checkBox.checked);
        });
        td.appendChild(checkBox);

        row.insertBefore(td, row.firstElementChild);
    }

    approveRender(event) {
        const header = kintone.app.getHeaderMenuSpaceElement();

        const button = new Button({
            text: 'Submit',
            type: 'submit'
        });


        const okButton = new Button({
            text: 'OK',
            type: 'submit'
        });
        const cancelButton = new Button({
            text: 'Cancel',
            type: 'normal'
        });

        okButton.addEventListener('click', () => {
            // call api update
            dialog.close()
        });
        cancelButton.addEventListener('click', () => {
            dialog.close()
        });
        const divEl = document.createElement('div');
        divEl.appendChild(okButton);
        divEl.appendChild(cancelButton);

        const dialog = new Dialog({
            title: 'Title',
            header: '<div>This is Header</div>',
            content: '<div>This is Content</div>',
            footer: divEl,
            className: 'options-class',
            id: 'options-id',
            icon: 'info',
            container: document.body,
            footerVisible: true
        });

        dialog.addEventListener('close', event => {
            dialog.close();
        });

        button.addEventListener('click', clickEvent => {
            console.log(clickEvent);

            dialog.open();
        });

        header.appendChild(button);
        return event;
    }
}

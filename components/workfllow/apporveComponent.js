import { Button } from 'kintone-ui-component/lib/button';


export function apporveRender(event) {
    const header = kintone.app.getHeaderMenuSpaceElement();

    const button = new Button({
        text: 'Submit',
        type: 'submit'
    });
    button.addEventListener('click', clickEvent => {
        console.log(clickEvent);
    });

    header.appendChild(button);
    return event;
}
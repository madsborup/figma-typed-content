import { UI_WIDTH, UI_HEIGHT } from './constants/layout';
figma.showUI(__html__);
figma.ui.resize(UI_WIDTH, UI_HEIGHT);
figma.on("selectionchange", () => {
    const componentNodes = figma.root.findAll((node) => node.type === 'COMPONENT');
    const componentsData = componentNodes.map((node) => ({ id: node.id, name: node.name }));
    const selection = figma.currentPage.selection;
    const selectedComponent = selection[0];
    //get first element in selection, as we are only interested in looking at one element
    //TODO implement handling for multiple elements in selection
    if (selection.length === 1 && selection[0].type === 'COMPONENT') {
        let currentContentProps;
        if (selectedComponent.getPluginData('contentProps')) {
            currentContentProps = JSON.parse(selectedComponent.getPluginData('contentProps'));
        }
        else {
            currentContentProps = [];
        }
        figma.ui.postMessage({ type: 'set-selected-component', component: { name: selectedComponent.name, id: selectedComponent.id, contentProps: currentContentProps } });
    }
    else {
        figma.ui.postMessage({ type: 'set-selected-component', component: null });
    }
    figma.ui.postMessage({ type: 'set-all-components', components: componentsData });
});
figma.ui.onmessage = msg => {
    const selection = figma.currentPage.selection;
    const selectedComponent = selection[0];
    if (msg.type === 'add-content-property') {
        let currentContentProps;
        if (selectedComponent.getPluginData('contentProps')) {
            currentContentProps = JSON.parse(selectedComponent.getPluginData('contentProps'));
        }
        else {
            currentContentProps = [];
        }
        const stringifiedProperties = JSON.stringify([...currentContentProps, msg.property]);
        selectedComponent.setPluginData('contentProps', stringifiedProperties);
        figma.ui.postMessage({ type: 'set-selected-component', component: { name: selectedComponent.name, id: selectedComponent.id, contentProps: JSON.parse(stringifiedProperties) } });
    }
    if (msg.type === 'delete-content-property') {
        const newContentProps = JSON.parse(selectedComponent.getPluginData('contentProps')).filter(props => {
            return props.name !== msg.name;
        });
        const stringifiedProperties = JSON.stringify(newContentProps);
        console.log(stringifiedProperties);
        selectedComponent.setPluginData('contentProps', stringifiedProperties);
        figma.ui.postMessage({ type: 'set-selected-component', component: { name: selectedComponent.name, id: selectedComponent.id, contentProps: JSON.parse(stringifiedProperties) } });
    }
    if (msg.type === 'create-rectangles') {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
};

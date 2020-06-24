import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Title, Input, Icon, Select, Divider } from 'react-figma-plugin-ds';
import 'react-figma-plugin-ds/styles/figma-plugin-ds.min.css';
import './ui.css';
const App = () => {
    const [selectedComponent, setSelectedComponent] = React.useState();
    const [allComponents, setAllComponents] = React.useState();
    React.useEffect(() => {
        onmessage = (event) => {
            const { type } = event.data.pluginMessage;
            if (type === 'set-selected-component') {
                setSelectedComponent(event.data.pluginMessage.component);
                console.log(event.data.pluginMessage.component);
            }
            if (type === 'set-all-components') {
                setAllComponents(event.data.pluginMessage.components);
            }
            if (type === 'set-component-properties') {
            }
        };
    }, [selectedComponent, allComponents]);
    const handleAddProperty = () => {
        parent.postMessage({
            pluginMessage: {
                type: 'add-content-property',
                property: { name: '', type: '', quantity: 'single' },
            },
        }, '*');
    };
    const handleDeleteProperty = (name) => {
        console.log('fired');
        parent.postMessage({
            pluginMessage: {
                type: 'delete-content-property',
                name: name,
            },
        }, '*');
    };
    const getTypeOptions = () => {
        const primitiveOptions = [
            { divider: false, value: 'text', label: 'text' },
            { divider: false, value: 'number', label: 'number' },
            { divider: 'Components', value: false, label: '' },
        ];
        const componentOptions = allComponents.map((component) => ({
            divider: false,
            value: component.id,
            label: component.name,
        }));
        return [...primitiveOptions, ...componentOptions];
    };
    if (selectedComponent && allComponents) {
        return (React.createElement("div", null,
            React.createElement(Title, { size: "large", weight: "normal", level: "h4" }, selectedComponent.name),
            React.createElement(Divider, null),
            React.createElement("div", { className: "header" },
                React.createElement(Title, { size: "small", weight: "bold" }, "Content"),
                React.createElement(Icon, { name: "plus", onClick: () => handleAddProperty() })),
            React.createElement("div", null, selectedComponent.contentProps &&
                selectedComponent.contentProps.map((property) => {
                    return (React.createElement("div", { className: "container" },
                        React.createElement(Input, { placeholder: "Name", icon: "draft", defaultValue: property.name }),
                        React.createElement(Select, { placeholder: "Type", options: getTypeOptions() }),
                        React.createElement("div", { className: "container" },
                            React.createElement(Icon, { name: "layout-grid-uniform", onClick: () => console.log('clicked') })),
                        React.createElement(Icon, { name: "minus", onClick: () => handleDeleteProperty(property.name) })));
                }))));
    }
    return (React.createElement("div", { className: "center" },
        React.createElement(Icon, { name: "component" }),
        React.createElement(Title, { size: "large", weight: "normal", level: "h3" }, "Select a Master Component")));
};
ReactDOM.render(React.createElement(App, null), document.getElementById('react-page'));

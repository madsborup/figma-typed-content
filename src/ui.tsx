import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PRIMITIVE_TYPES, QUANTITY, ComponentContentProperty, ComponentNode  } from './constants/types';
import { Title, Input, Icon, Select, Divider, Button, SelectOption } from 'react-figma-plugin-ds';
import 'react-figma-plugin-ds/styles/figma-plugin-ds.min.css';
import './ui.css';

declare function require(path: string): any;

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentNode>();
  const [allComponents, setAllComponents] = React.useState<ComponentNode[]>();

  React.useEffect(() => {
    onmessage = (event) => {
      const { type } = event.data.pluginMessage;
      if (type === 'set-selected-component') {
        setSelectedComponent(event.data.pluginMessage.component as ComponentNode);
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
    parent.postMessage(
      {
        pluginMessage: {
          type: 'add-content-property',
          property: { name: '', type: '', quantity: 'single' },
        },
      },
      '*'
    );
  };

  const handleDeleteProperty = (name: string) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'delete-content-property',
          name: name,
        },
      },
      '*'
    );
  };

  const getTypeOptions = (): SelectOption[] => {
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
    return (
      <div>
        <Title size="large" weight="normal" level="h4">
          {selectedComponent.name}
        </Title>
        <Divider />
        <div className="header">
          <Title size="small" weight="bold">
            Content
          </Title>
          <Icon name="plus" onClick={() => handleAddProperty()} />
        </div>
        <div>
          {selectedComponent.contentProps &&
            selectedComponent.contentProps.map((property) => {
              return (
                <div className="container">
                  <Input placeholder="Name" icon="draft" defaultValue={property.name} />
                  <Select placeholder="Type" options={getTypeOptions()} />
                  <div className="container">
                    <Icon name="layout-grid-uniform" onClick={() => console.log('clicked')} />
                  </div>
                  <Icon name="minus" onClick={() => handleDeleteProperty(property.name)} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <Icon name="component" />
      <Title size="large" weight="normal" level="h3">
        Select a Master Component
      </Title>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('react-page'));

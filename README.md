# Typed Components

## About

Typed components is a Figma plugin, currently intented to be used as a communication/documentation tool for designers and developers. Use typing to describe the contents of components to assist communcation between designers and developers. 

It is currently not intented to be used directly as the data model in production code, but more as a "template" for developers to further refine. For example, data structure is represented as `quantity: 'single' | 'multiple'`, and it is up to the developer to determine what data structure is best for implementation when multiple is selected (eg. Object or Array). 

## Features

Add properties to components, define the type of the property and select quantity.

### Types

Types can be either primitive types or other components.


### Example

`
ComponentName: {
    label: {
        type: 'string',
        quantity: 'single'
    }
    content: {
        type: 'ButtonComponent',
        quantity: 'multiple'
    }
}
`


## Further work

- Github integration.

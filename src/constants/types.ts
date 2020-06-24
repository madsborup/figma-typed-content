export type PRIMITIVE_TYPES = 'text' | 'number'
export type QUANTITY = 'single' | 'multiple'

export type ComponentContentProperty = {
  name: string;
  type: PRIMITIVE_TYPES | string;
  quantity: QUANTITY;
};

export type ComponentNode = {
  name: string;
  id: string;
  contentProps: ComponentContentProperty[];
};
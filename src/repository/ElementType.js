//@flow


export type ElementType = {
  name: string,
  label: string,
  option?: any
}

export const API_MODEL: ElementType = {
  name: 'apiModel',
  label: ''
}

export const SECTION: ElementType = {
  name: 'section',
  label: 'Add new section'
}
export const RESOURCE: ElementType = {
  name: 'resource',
  label: 'Add new resource'
}
export const OPERATION: ElementType = {
  name: 'operation',
  label: 'Add new operation'
}
export const DATA_TYPE: ElementType = {
  name: 'data-type',
  label: 'Add new data-type'
}
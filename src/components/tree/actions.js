//@flow
import type {Node} from './model'
import {OPERATION, RESOURCE, SECTION} from '../../repository/ElementType'
export const ADD_SECTION = 'ADD_SECTION'
export const ADD_RESOURCE = 'ADD_RESOURCE'
export const ADD_OPERATION = 'ADD_OPERATION'

export type TreeAction = {type: string, payload: Node | {section: string, resourcePath:string, type: NodeType}}

export const addSection = (name: string) : TreeAction => ({
  type: ADD_SECTION,
  payload: {
    label: name,
    name,
    type: SECTION,
  }
})

export const addResource = (path: string, section: string) : TreeAction => ({
  type: ADD_RESOURCE,
  payload: {
    section: section,
    resourcePath: path,
    type: RESOURCE,
  }
})


export const addOperation = (name: string, operation: string, resourcePath: string, section: string) : TreeAction => ({
  type: ADD_OPERATION,
  payload: {
    opName: name,
    operation,
    section,
    resourcePath,
    type: OPERATION,
  }
})


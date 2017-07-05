// @flow

import Option from '../util/Option'
import {List, Map} from 'immutable'
import {API_MODEL, DATA_TYPE, OPERATION, RESOURCE, SECTION} from './ElementType'
import type {ElementType} from './ElementType'

class RepositoryModel {
  _root: APIModel

  constructor(root: APIModel) { this._root = root}

  get root(): APIModel { return this._root}

  getSections() : Section[] {
    return this._root.sections.valueSeq().toArray()
  }
}

class APIElement {
  _name: string
  _description: string


  constructor(name: string, description: string) {
    this._name = name
    this._description = description
  }

  get name(): string { return this._name}
  get type(): ElementType { throw new Error("Not implemented method") }
  get description(): string { return this._description}
  get children(): List<APIElement> { return List() }

  hasChildren(): boolean { return false }

}

class Section extends APIElement {
  _elements: Map<string, $Subtype<APIElement>>

  constructor(name: string, description: string, elements: Map<string, $Subtype<APIElement>>) {
    super(name, description);
    this._elements = elements
  }

  get elements(): Map<string, $Subtype<APIElement>> { return this._elements }
  get children(): List<$Subtype<APIElement>> { return List(this.elements.valueSeq()) }
  get type(): ElementType { return SECTION }

  hasChildren(): boolean { return this.elements.size !== 0 }

  resourceByPath(path: string): Resource {
    // return Option.option(this.elements.get(path)).getOrFail(new Error("Resource not found")) todo: this and the one in ApiModel
    return this.elements.get(path)
  }
}

class APIModel extends APIElement {
  _sections: Map<string, Section>

  get sections(): Map<string, Section> { return this._sections }
  get children() : List<APIElement> { return List(this.sections.valueSeq()) }
  get type(): ElementType { return API_MODEL }


  constructor(name: string, description: string, sections: Map<string, Section>) {
    super(name, description)
    this._sections = sections
  }

  sectionByName(section: string) : Section {
    // return Option.option(this.sections.get(section)).getOrFail(new Error("Section not found"))
    return this.sections.get(section)
  }

  hasChildren(): boolean { return this.sections.size !== 0 }
}

class ElementModel extends APIElement {
  _section: Section

  constructor(name: string, description: string, section: Section) {
    super(name, description)
    this._section = section
  }

}

class Resource extends ElementModel {
  _path: string
  _operations: Map<string, Operation>

  constructor(name: string, description: string, path: string, section: Section, operations: Map<string, Operation>) {
    super(name, description, section)
    this._path = path
    this._operations = operations
  }

  get operations(): Map<string, Operation> { return this._operations }
  get path(): string { return this._path }
  get children() : List<APIElement> { return List(this.operations.valueSeq()) }
  get type(): ElementType { return RESOURCE }

  hasChildren(): boolean { return this.operations.size !== 0 }

}

class Operation extends ElementModel {
  _method: Method
  _resource: Resource

  constructor(name: string, description: string, method: Method, resource: Resource) {
    super(name, description)
    this._method = method
    this._resource = resource
  }

  get type(): ElementType { return OPERATION }

}

class DataType extends ElementModel {
  _type: Type
  _example: string

  constructor(name: string, description: string, type: Type, example: String) {
    super(name, description)
    this._type = type
    this._example = example
  }

  get type(): ElementType { return DATA_TYPE }

}

export type Type = {
  name: string
}

export {
  ElementModel,
  Resource,
  Operation,
  DataType
}

export {
  RepositoryModel,
  APIModel,
  APIElement,
  Section
}
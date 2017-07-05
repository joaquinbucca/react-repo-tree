//@flow

import {Map} from 'immutable'
import {APIModel, Operation, Resource, Section} from './RepositoryModel'
import {RepositoryFactory} from './RepositoryFactory'
import {MethodUtil} from './Method'

export class APIManager {

  static addSectionByName(api: APIModel, name: string) : APIModel { return new APIModel(api.name, api.description, api.sections.set(name, new Section(name, "", new Map()))) }

  static addResourceInSectionByPath(api: APIModel, section: string, path: string) : APIModel {
    const sec: Section = api.sectionByName(section)
    const res = RepositoryFactory.resource(path, path, sec)
    const elems = sec.elements.set(path, res)
    const sections = api.sections.set(sec.name, new Section(sec.name, sec.description, elems))

    return new APIModel(api.name, api.description, sections)
  }

  static addOperationToResource(api: APIModel, section: string, path: string, operation: string, name: string) : APIModel {
    const sec: Section = api.sectionByName(section)
    const res: Resource = sec.resourceByPath(path)
    const ops = res.operations.set(operation, new Operation(name, "", MethodUtil.fromName(operation), res))
    const elems = sec.elements.set(path, new Resource(res.name, res.description, path, sec, ops))
    const sections = api.sections.set(sec.name, new Section(sec.name, sec.description, elems))

    return new APIModel(api.name, api.description, sections)
  }
}
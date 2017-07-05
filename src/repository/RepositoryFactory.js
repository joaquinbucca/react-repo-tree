//@flow

import {Resource, Section} from './RepositoryModel'
import {Map} from 'immutable'


export class RepositoryFactory {

  static resource(name: string, path: string, sec: Section) {
    return new Resource(name, "", path, sec, Map())
  }
}
//@flow

import {RepositoryModel} from './RepositoryModel'
import {APIManager} from './APIManager'

export class RepositoryManager {


  static addSectionByName(repo: RepositoryModel, name: string) : RepositoryModel {
    return new RepositoryModel(APIManager.addSectionByName(repo.root, name))
  }

  static addResourceBySectionAndPath(repo: RepositoryModel, section: string, path: string) : RepositoryModel {
    return new RepositoryModel(APIManager.addResourceInSectionByPath(repo.root, section, path))
  }

  static addOperationToResource(repo: RepositoryModel, section: string, path: string, operation: string, name: string) : RepositoryModel {
    return new RepositoryModel(APIManager.addOperationToResource(repo.root, section, path, operation, name))
  }


}
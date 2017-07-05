//@flow

import {RepositoryModel} from './RepositoryModel'
import {RESOURCE} from './ElementType'

export class RepositoryFetcher {

  static getPathsInSection(repo: RepositoryModel, section: string) : Resource[] {

    const sec = repo.root.sections.get(section)
    if (!sec) throw new Error(`Section ${sec} it's not in repository`)
    return sec.children.filter(e => e.type === RESOURCE).toArray()
  }
}
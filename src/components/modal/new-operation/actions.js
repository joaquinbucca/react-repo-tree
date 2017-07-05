// @flow

import {
  Operation, RepositoryModel, Resource,
  Section
} from '../../../repository/RepositoryModel'
import {RepositoryFetcher} from '../../../repository/RepositoryFetcher'
export const SHOW: string = 'VISUAL/NEW_OPERATION/SHOW_MODAL'
export const CLOSE: string = 'VISUAL/NEW_OPERATION/CLOSE_MODAL'
export const UPDATE_NAME: string = 'VISUAL/NEW_OPERATION/UPDATE_NAME'
export const UPDATE_PATH: string = 'VISUAL/NEW_OPERATION/UPDATE_PATH'
export const UPDATE_SECTION: string = 'VISUAL/NEW_OPERATION/UPDATE_SECTION'
export const UPDATE_OPERATION: string = 'VISUAL/NEW_OPERATION/UPDATE_OPERATION'

export type NewOperationAction = {
  type: string,
  payload: {
    sections: ?Section[],
    paths: ?Resource[],
    section: ?Section,
    path: ?string,
    name: ?string,
    repo: ?RepositoryModel
  }
}
export const openNewOperationModal = (repo: RepositoryModel) : NewOperationAction => ({
  type: SHOW,
  payload: {
    sections: repo.getSections(),
    repo: repo
  }
})

export const closeNewOperationModal = () : NewOperationAction => ({
  type: CLOSE
})

export const updateNewOperationName = (name: string) : NewOperationAction => ({
  type: UPDATE_NAME,
  payload: {name}
})

export const updateNewOperationPath = (path: string) : NewOperationAction => ({
  type: UPDATE_PATH,
  payload: path
})


const getPaths = (repo, section) => RepositoryFetcher.getPathsInSection(repo, section)

export const updateNewOperationSection = (repo: RepositoryModel, section: string) : NewOperationAction => ({
  type: UPDATE_SECTION,
  payload: {
    section,
    paths: getPaths(repo, section)
  }
})


export const updateNewOperationOp = (operation: Operation) : NewOperationAction => ({
  type: UPDATE_OPERATION,
  payload: {operation}
})
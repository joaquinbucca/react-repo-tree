//@flow
import * as actions from './actions'
import type {Node, State} from './model'
import type {TreeAction} from './actions'
import {Map} from 'immutable'
import {APIModel, RepositoryModel} from '../../repository/RepositoryModel'
import {RepositoryManager} from '../../repository/RepositoryManager'

const apiModel : APIModel = new APIModel("Some API", "Super wow description", Map())
const repository: RepositoryModel = new RepositoryModel(apiModel)

const initState: State = {
  repository,
}

const addResourceToSection = (state: State, action: TreeAction): RepositoryModel => {
  const {section, resourcePath} = action.payload
  const repository: RepositoryModel = state.repository

  return RepositoryManager.addResourceBySectionAndPath(repository, section, resourcePath)
}

const addOperationToResource = (state: State, action: TreeAction): RepositoryModel => {
  const {section, resourcePath, operation, opName} = action.payload
  const repository: RepositoryModel = state.repository

  return RepositoryManager.addOperationToResource(repository, section, resourcePath, operation, opName)
}

const addSectionToRepository = (state: State, action: TreeAction): RepositoryModel => {
  const rep = state.repository
  const node: Node = action.payload
  return RepositoryManager.addSectionByName(rep, node.label)
}

const reducer = (state: State = initState, action: TreeAction) : $Shape<State> => {
  switch (action.type) {
    case actions.ADD_SECTION:
      return {
        ...state,
        repository: addSectionToRepository(state, action)
      }
    case actions.ADD_RESOURCE:
      return {
        ...state,
        repository: addResourceToSection(state, action)
      }
    case actions.ADD_OPERATION:
      return {
        ...state,
        repository: addOperationToResource(state, action)
      }
    default:
      return state
  }
}

export default reducer

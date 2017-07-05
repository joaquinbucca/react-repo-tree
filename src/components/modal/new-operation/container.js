//@flow
import {connect} from 'react-redux'
import NewOperation from './NewOperation'
import {
  getSection, getSecOptions, getPathOptions, getShowModal, getValid, getOperation,
  getName, getRepo, getOpOptions, getResourcePath
} from './selectors'
import {
  closeNewOperationModal, updateNewOperationName, updateNewOperationOp, updateNewOperationPath,
  updateNewOperationSection
} from './actions'
import {addOperation} from '../../tree/actions'
import type {Dispatch, SelectOption} from '../../types/index'
import {RepositoryModel} from '../../../repository/RepositoryModel'

export type Props = {
  valid: boolean,
  showModal: boolean,
  resourcePath: string,
  section: string,
  operation: string,
  repo: RepositoryModel,
  secOptions: SelectOption[],
  pathOptions: SelectOption[],
  opOptions: SelectOption[],
  onSubmit: (name: string, path: string, operation: string, section: string) => void,
  onCancel: () => void,
  onPathChange: (path: string) => void,
  onNameChange: (name: string) => void,
  onSectionChange: (section: string) => void,
  onOperationChange: (operation: string) => void
}

const mapState = (rootState): $Shape<Props> => {
  return {
    resourcePath: getResourcePath(rootState),
    valid: getValid(rootState),
    secOptions: getSecOptions(rootState),
    pathOptions: getPathOptions(rootState),
    opOptions: getOpOptions(rootState),
    section: getSection(rootState),
    name: getName(rootState),
    repo: getRepo(rootState),
    operation: getOperation(rootState),
    showModal: getShowModal(rootState)
  }
}

const mapDispatch = (dispatch: Dispatch): $Shape<Props> => {
  return {
    onSubmit: (name: string, operation: string, path: string, section: string) => {
      dispatch(addOperation(name, operation, path, section))
      dispatch(closeNewOperationModal())
    },
    onCancel: () => dispatch(closeNewOperationModal()),
    onSectionChange: (repo: RepositoryModel, section: string) => dispatch(updateNewOperationSection(repo, section)),
    onOperationChange: (operation: string) => dispatch(updateNewOperationOp(operation)),
    onPathChange: (path: string) => dispatch(updateNewOperationPath(path)),
    onNameChange: (name: string) => dispatch(updateNewOperationName(name))
  }
}

export default connect(mapState, mapDispatch)(NewOperation)
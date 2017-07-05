//@flow
import {connect} from 'react-redux'
import NewResource from './NewResource'
import {getCurrentSection, getOptions, getResourcePath, getShowModal, getValid} from './selectors'
import {closeNewResourceModal, updateNewResourceName, updateNewResourceSection} from './actions'
import {addResource} from '../../tree/actions'
import type {Dispatch} from '../../types/index'
import {Section} from '../../../repository/RepositoryModel'

export type Props = {
  resourcePath: string,
  valid: boolean,
  showModal: boolean,
  onSubmit: (name: string, path: string) => void,
  onCancel: () => void,
  onPathChange: (name: string) => void,
  onSectionChange: (section: string) => void
}

const mapState = (rootState): $Shape<Props> => {
  return {
    resourcePath: getResourcePath(rootState),
    valid: getValid(rootState),
    options: getOptions(rootState),
    currentSection: getCurrentSection(rootState),
    showModal: getShowModal(rootState)
  }
}

const mapDispatch = (dispatch: Dispatch): $Shape<Props> => {
  return {
    onSubmit: (path: string, section: Section) => {
      dispatch(addResource(path, section))
      dispatch(closeNewResourceModal())
    },
    onCancel: () => dispatch(closeNewResourceModal()),
    onSectionChange: (section: string) => dispatch(updateNewResourceSection(section)),
    onPathChange: (name: string) => dispatch(updateNewResourceName(name))
  }
}

export default connect(mapState, mapDispatch)(NewResource)
//@flow
import {connect} from 'react-redux'
import NewSection from './NewSection'
import {getSectionName, getShowModal, getValid} from './selectors'
import {closeNewSectionModal, updateNewSectionName} from './actions'
import {addSection} from '../../tree/actions'
import type {Dispatch} from '../../types/index'

export type Props = {
  sectionName: string,
  valid: boolean,
  showModal: boolean,
  onSubmit: (name: string, path: string) => void,
  onCancel: () => void,
  onNameChange: (name: string) => void
}

const mapState = (rootState): $Shape<Props> => {
  return {
    sectionName: getSectionName(rootState),
    valid: getValid(rootState),
    showModal: getShowModal(rootState)
  }
}

const mapDispatch = (dispatch: Dispatch): $Shape<Props> => {
  return {
    onSubmit: (name) => {
      dispatch(addSection(name))
      dispatch(closeNewSectionModal())
    },
    onCancel: () => dispatch(closeNewSectionModal()),
    onNameChange: (name) => dispatch(updateNewSectionName(name))
  }
}

export default connect(mapState, mapDispatch)(NewSection)
import * as actions from './actions'
import {State} from './model'
import {NewResourceAction} from './actions'
import {Section} from '../../../repository/RepositoryModel'

const initState: State = {
  showModal: false,
  resourcePath: '',
  valid: true,
  options: [],
  currentSection: undefined
}

export default ((state: State = initState, action: NewResourceAction): State => {
  switch (action.type) {
    case actions.SHOW :
      const sections : Section[] = action.payload.sections
      return {
        ...state,
        showModal: true,
        options: sections.map(s => ({ value: s.name, label: s.name})),
        currentSection: sections[0].name
      }
    case actions.CLOSE :
      return initState
    case actions.UPDATE_NAME :
      return {
        ...state,
        resourcePath: action.payload
      }
    case actions.UPDATE_SECTION :
      return {
        ...state,
        currentSection: action.payload.section
      }
    default:
      return state
  }
})
import * as actions from './actions'
import {State} from './model'
import {Action} from '../../types/index'

const initState: State = {
  showModal: false,
  sectionName: '',
  valid: true
}

export default ((state: State = initState, action: Action): State => {
  switch (action.type) {
    case actions.SHOW :
      return {
        ...state,
        showModal: true
      }
    case actions.CLOSE :
      return initState
    case actions.UPDATE_NAME :
      return {
        ...state,
        sectionName: action.payload
      }
    default:
      return state
  }
})
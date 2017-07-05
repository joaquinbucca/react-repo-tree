//@flow
import * as actions from './actions'
import {State} from './model'
import {NewOperationAction} from './actions'
import {Section} from '../../../repository/RepositoryModel'
import {MethodUtil} from '../../../repository/Method'

const initState: State = {
  showModal: false,
  resourcePath: '',
  name: '',
  valid: true,
  repo: undefined,
  secOptions: [],
  pathOptions: [],
  opOptions: MethodUtil.getMethods().map(m => ({value: m.name, label: m.name})),
  section: undefined,
  operation: undefined
}

export default ((state: State = initState, action: NewOperationAction): State => {
  switch (action.type) {
    case actions.SHOW :
      const sections : Section[] = action.payload.sections
      return {
        ...state,
        showModal: true,
        repo: action.payload.repo,
        secOptions: sections.map(s => ({ value: s.name, label: s.name})),
        section: sections[0].name
      }
    case actions.CLOSE :
      return initState
    case actions.UPDATE_NAME :
      return {
        ...state,
        name: action.payload.name
      }
    case actions.UPDATE_PATH :
      return {
        ...state,
        resourcePath: action.payload.path,
      }
    case actions.UPDATE_SECTION :
      const paths = action.payload.paths
      return {
        ...state,
        section: action.payload.section,
        pathOptions: paths.map(r => ({value: r.path, label: r.path})),
        resourcePath: paths[0].path
      }
    case actions.UPDATE_OPERATION :
      return {
        ...state,
        operation: action.payload.operation
      }
    default:
      return state
  }
})
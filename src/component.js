//@flow
import * as tree from './components/tree'
import * as newSection from './components/modal/new-section'
import * as newResource from './components/modal/new-resource'
import * as newOperation from './components/modal/new-operation'
import {combineReducers} from 'redux'
import * as modals from './components/modal/constants'

export const PROJECT_NAME: string ='visual'

export const reducers = {
  [PROJECT_NAME]: combineReducers({
    [tree.NAME] : tree.reducer,
    [modals.NAME] : combineReducers({
      [newSection.NAME] : newSection.reducer,
      [newResource.NAME] : newResource.reducer,
      [newOperation.NAME] : newOperation.reducer
    })
  })
}
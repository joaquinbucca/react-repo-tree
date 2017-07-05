// @flow

import type {Action} from '../../types/index'
export const SHOW: string = 'VISUAL/NEW_SECTION/SHOW_MODAL'
export const CLOSE: string = 'VISUAL/NEW_SECTION/CLOSE_MODAL'
export const UPDATE_NAME: string = 'VISUAL/NEW_SECTION/UPDATE_NAME'

export const openNewSectionModal = () : Action => ({
  type: SHOW
})

export const closeNewSectionModal = (): Action => ({
  type: CLOSE
})

export const updateNewSectionName = (name: string) : Action => ({
    type: UPDATE_NAME,
    payload: name
})
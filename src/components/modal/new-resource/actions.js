// @flow

import {RepositoryModel, Section} from '../../../repository/RepositoryModel'
export const SHOW: string = 'VISUAL/NEW_RESOURCE/SHOW_MODAL'
export const CLOSE: string = 'VISUAL/NEW_RESOURCE/CLOSE_MODAL'
export const UPDATE_NAME: string = 'VISUAL/NEW_RESOURCE/UPDATE_NAME'
export const UPDATE_SECTION: string = 'VISUAL/NEW_RESOURCE/UPDATE_SECTION'

export type NewResourceAction = {
  type: string,
  payload: {
    sections: ?Section[],
    section: ?string
  }
}
export const openNewResourceModal = (repo: RepositoryModel) : NewResourceAction => ({
  type: SHOW,
  payload: {
    sections: repo.getSections()
  }
})

export const closeNewResourceModal = () : NewResourceAction => ({
  type: CLOSE
})

export const updateNewResourceName = (path: string) : NewResourceAction => ({
  type: UPDATE_NAME,
  payload: path
})

export const updateNewResourceSection = (section: string) : NewResourceAction => ({
  type: UPDATE_SECTION,
  payload: {section}
})
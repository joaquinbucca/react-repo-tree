import {PROJECT_NAME} from '../../../component'
import {NAME as MODALS} from '../constants'
import {NAME} from './index'


export const getNewSectionState = (state) => state[PROJECT_NAME][MODALS][NAME]

export const getSectionName = (state) => getNewSectionState(state).sectionName
export const getValid = (state) => getNewSectionState(state).valid
export const getShowModal = (state) => getNewSectionState(state).showModal

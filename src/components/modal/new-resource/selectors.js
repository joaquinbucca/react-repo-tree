import {PROJECT_NAME} from '../../../component'
import {NAME as MODALS} from '../constants'
import {NAME} from './index'


export const getNewResourceState = (state) => state[PROJECT_NAME][MODALS][NAME]

export const getResourcePath = (state) => getNewResourceState(state).resourcePath
export const getValid = (state) => getNewResourceState(state).valid
export const getShowModal = (state) => getNewResourceState(state).showModal
export const getCurrentSection = (state) => getNewResourceState(state).currentSection
export const getOptions = (state) => getNewResourceState(state).options

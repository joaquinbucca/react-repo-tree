//@flow

import {PROJECT_NAME} from '../../../component'
import {NAME as MODALS} from '../constants'
import {NAME} from './index'


export const getNewResourceState = (state) => state[PROJECT_NAME][MODALS][NAME]

export const getResourcePath = (state) => getNewResourceState(state).resourcePath
export const getValid = (state) => getNewResourceState(state).valid
export const getShowModal = (state) => getNewResourceState(state).showModal
export const getSection = (state) => getNewResourceState(state).section
export const getOperation = (state) => getNewResourceState(state).operation
export const getName = (state) => getNewResourceState(state).name
export const getRepo = (state) => getNewResourceState(state).repo
export const getSecOptions = (state) => getNewResourceState(state).secOptions
export const getOpOptions = (state) => getNewResourceState(state).opOptions
export const getPathOptions = (state) => getNewResourceState(state).pathOptions

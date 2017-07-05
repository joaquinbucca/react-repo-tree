import {NAME} from './index'
import {PROJECT_NAME} from '../../component'

export const getTreeSelectors = (rootState) => rootState[PROJECT_NAME][NAME]
export const getRepository = (state) => getTreeSelectors(state).repository
//@flow

import {SelectOption} from '../../types/index'
export type State = {
  showModal: boolean,
  resourcePath: string,
  currentSection: string,
  options: SelectOption[],
  valid: boolean
}
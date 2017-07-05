//@flow

import {SelectOption} from '../../types/index'
export type State = {
  showModal: boolean,
  resourcePath: string,
  operation: string,
  section: string,
  valid: boolean,
  secOptions: SelectOption[],
  pathOptions: SelectOption[],
  exists: boolean
}
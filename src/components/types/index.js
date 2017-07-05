//@flow

export type Action = {type: string}
export type Dispatch = (action: Action) => any
export type SelectOption = {value: string, label: string}
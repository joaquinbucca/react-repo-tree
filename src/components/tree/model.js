//@flow

import {APIElement, RepositoryModel} from '../../repository/RepositoryModel'

export type LeafNode = { name: string, label: string }
// eslint-disable-next-line
export type NonLeafNode = { name: string, label: string, children: Node[] }
export type Node = LeafNode | NonLeafNode


export type State = {
  repository: RepositoryModel,
}

const fromLeaf = (elem: APIElement): Node => {
  return {
    name: elem.name.replace(new RegExp(" ", 'g'), "").toLowerCase(),
    label: elem.name,
    type: elem.type
  }
}

const fromAPIElement = (elem: APIElement): Node => {
  const node = fromLeaf(elem)
  if (!elem.hasChildren()) return node
  const children : Node[] = elem.children
    .map(fromAPIElement)
    .toArray()

  return {...node, children}
}

export const fromRepository = (repository: RepositoryModel): Node[] => {
  return [fromAPIElement(repository.root)]
}
//@flow
import Tree from './Tree'
import {connect} from 'react-redux'
import {getRepository} from './selectors'
import {openNewSectionModal} from '../modal/new-section/actions'
import type {State, Node} from './model'
import {fromRepository} from './model'
import type {Dispatch} from '../types/index'
import {openNewResourceModal} from '../modal/new-resource/actions'
import {RepositoryModel} from '../../repository/RepositoryModel'
import {openNewOperationModal} from '../modal/new-operation/actions'

export type Props = {
  name: string,
  nodes: ?Node[],
  expanded: ?string[],
  repository: RepositoryModel,
  onUpdateText: (text: string) => void,
  showNewSectionDialog: (path: string) => void,
  showNewResourceDialog: (repo: RepositoryModel) => void,
  showNewOperationDialog: (repo: RepositoryModel) => void
}

const mapProps = (state: State): $Shape<Props> => {
  const repository: RepositoryModel = getRepository(state)
  const nodes: ?Node[] = repository ? fromRepository(repository) : undefined
  const expanded : ?string[] = nodes ? [`/${nodes[0].name}`] : undefined
  return ({
    repository,
    name: repository.root.name,
    expanded,
    nodes
  })
}

const mapDispatch = (dispatch: Dispatch): $Shape<Props> => ({
  showNewSectionDialog: () => dispatch(openNewSectionModal()),
  showNewResourceDialog: (repo: RepositoryModel) => dispatch(openNewResourceModal(repo)),
  showNewOperationDialog: (repo: RepositoryModel) => dispatch(openNewOperationModal(repo))
})

export default connect(mapProps, mapDispatch)(Tree)
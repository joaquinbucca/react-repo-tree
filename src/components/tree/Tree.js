//@flow
import React, {Component} from 'react'
import {TreeUI, ContextMenu} from '../MulesoftComponents'
import {default as Icon} from '../svgicon/SvgIcon'
import {default as NewSection} from '../modal/new-section/container'
import {default as NewResource} from '../modal/new-resource/container'
import {default as NewOperation} from '../modal/new-operation/container'
import './Tree.css'
import type {Node} from './model'
import {RESOURCE, API_MODEL, SECTION, ElementType} from '../../repository/ElementType'
import {RepositoryModel} from '../../repository/RepositoryModel'
import {Props} from './container'

class Tree extends Component {

  props: Props

  openSectionDialog() {
    this.props.showNewSectionDialog()
  }

  openResourceDialog(repo: RepositoryModel) {
    this.props.showNewResourceDialog(repo)
  }

  openOperationDialog(repo: RepositoryModel) {
    this.props.showNewOperationDialog(repo)
  }

  renderLeaf(n: any) {
    const node: Node = n.node
    const newMenuTestId = `File-Tree-New-Menu${node.label.toString()}`
    const addOptions = this.getAddOptions(node.type)

    return (
      <div className="tree-node tree-leaf"
           data-path={node.label.toString()}>
        <label title={node.label}>
          {node.label}
        </label>
        <div className="node-options" onClick={(e) => e.stopPropagation()}>
          <ContextMenu triggerOn={['click']}
                       className="tree-menu new-menu"
                       options={addOptions}
                       testId={newMenuTestId}>
            <Icon name="plus" size={18}/>
          </ContextMenu>
        </div>
      </div>
    )
  }

  renderFolder(n: any) {
    const node: Node = n.node
    const newMenuTestId = `File-Tree-New-Menu${node.label.toString()}`
    const addOptions = this.getAddOptions(node.type)

    return (
      <div className="tree-node tree-folder"
           data-path={node.label.toString()}>
        <label title={node.label}>
          {node.label}
        </label>
        <div className="node-options" onClick={(e) => e.stopPropagation()}>
          <ContextMenu triggerOn={['click']}
                       className="tree-menu new-menu"
                       options={addOptions}
                       testId={newMenuTestId}>
            <Icon name="plus" size={18}/>
          </ContextMenu>
        </div>
      </div>
    )
  }

  getAddOptions(type: ElementType) {
    const repository: RepositoryModel = this.props.repository
    return type === API_MODEL
      ? [
        {label: 'New section', onClick: this.openSectionDialog.bind(this)}
      ]
      : type === SECTION ?
        [
          {label: 'New Operation', onClick: this.openSectionDialog.bind(this)},
          {label: 'New Resource', onClick: this.openResourceDialog.bind(this, repository)},
          {label: 'New Data type', onClick: this.openSectionDialog.bind(this)},
          {label: 'New Text', onClick: this.openSectionDialog.bind(this)}
        ]
        : type === RESOURCE ?
          [
            {label: 'GET', onClick: this.openOperationDialog.bind(this, repository)},
            {label: 'POST', onClick: this.openOperationDialog.bind(this, repository)},
            {label: 'PUT', onClick: this.openOperationDialog.bind(this, repository)},
            {label: 'DELETE', onClick: this.openOperationDialog.bind(this, repository)},
            {label: 'OPTIONS', onClick: this.openOperationDialog.bind(this, repository)},
            {label: 'HEAD', onClick: this.openOperationDialog.bind(this, repository)},
            {label: 'OPTIONS', onClick: this.openOperationDialog.bind(this, repository)}
          ]
          : []
  }


  render() {
    const {nodes} = this.props

    if (nodes && nodes.length === 0) {
      return (
        <div className="Tree-loading" data-test-id="Tree-Loading">
          <span>No files</span>
        </div>
      )
    }

    return (<div className="Tree">
        <TreeUI className="TreeUi sidebar"
                getLeaf={this.renderLeaf.bind(this)}
                getFolder={this.renderFolder.bind(this)}
                getEmpty={() => ''}
                nodes={nodes}
          // selected={selected}
          //     expanded={expanded}
          // onSelect={this.handleOnSelect.bind(this)}
          // onToggle={this.handleOnToggle.bind(this)}
                testId="Tree"/>
        <NewSection/>
        <NewResource/>
        <NewOperation/>
      </div>
    )
  }
}

export default Tree
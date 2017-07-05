//@flow

import * as React from 'react'
import {RESERVED_NAME_MESSAGE} from '../constants'
import {Modal, ModalHeader, ModalBody, Label, Button, ModalFooter, TextField, Select} from '../../MulesoftComponents'
import {Props} from './container'


class NewOperation extends React.Component {
  props: Props

  onPathChange(e) {
    this.props.onPathChange(e.value)
  }

  onNameChange(e) {
    this.props.onNameChange(e.value)
  }

  onOperationChange(e) {
    this.props.onOperationChange(e.value)
  }

  handleSubmit() {
    const {name, operation, resourcePath, section} = this.props

    if (resourcePath) this.props.onSubmit(name, operation, resourcePath, section)
  }

  onSectionChange(e) {
    this.props.onSectionChange(this.props.repo, e.value)
  }

  render() {
    const {onCancel, resourcePath, valid, exists, showModal, name,
      section, operation, pathOptions, opOptions, secOptions} = this.props
    return showModal ? (
      <Modal onEsc={onCancel}
             onClickOverlay={onCancel}
             testId="New-Operation-Modal"
             className="new-operation">
        <ModalHeader title="Add new operation">
          <h1>Add new operation</h1>
        </ModalHeader>
        <ModalBody>
          <Select
            onChange={this.onSectionChange.bind(this)}
            options={secOptions}
            name="Select Section"
            value={section}
            tabindex="4"     // eslint-disable-line
          />
          <Select
            onChange={this.onPathChange.bind(this)}
            options={pathOptions}
            name="Select Path"
            value={resourcePath}
            tabindex="4"     // eslint-disable-line
          />
          <Select
            onChange={this.onOperationChange.bind(this)}
            options={opOptions}
            name="Select Path"
            value={operation}
            tabindex="4"     // eslint-disable-line
          />
          <TextField value={name}
                     placeholder="Name..."
                     onChange={this.onNameChange.bind(this)}
                     autoFocus
                     testId="New-Operation-Input-Name"/>
          {
            (!valid && resourcePath.trim() !== '') ?
              <div className="new-operation-error">
                <Label >
                  {RESERVED_NAME_MESSAGE}
                </Label>
              </div>:null
          }
          {
            (valid && exists) ?
              <div className="new-operation-error">
                <Label >
                  '{resourcePath}' already exists in project
                </Label>
              </div>:null
          }
        </ModalBody>

        <ModalFooter>
          <Button
            kind="tertiary"
            onClick={onCancel}
            noFill
            testId="modal-cancel-New-Operation-Modal"
          >Cancel</Button>
          <Button
            kind="primary"
            onClick={this.handleSubmit.bind(this)}
            disabled={!valid || exists}
            testId="modal-submit-New-Operation-Modal"
          >Ok</Button>
        </ModalFooter>
      </Modal>
    ) : null
  }
}

export default NewOperation
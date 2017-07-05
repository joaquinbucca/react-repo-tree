//@flow
import * as React from 'react'
import {RESERVED_NAME_MESSAGE} from '../constants'
import {Modal, ModalHeader, ModalBody, Label, Button, ModalFooter, TextField, Select} from '../../MulesoftComponents'
import {Props} from './container'


class NewResource extends React.Component {
  props: Props

  onPathChange(e) {
    this.props.onPathChange(e.value)
  }

  handleSubmit() {
    const {resourcePath, currentSection} = this.props

    if (resourcePath) this.props.onSubmit(resourcePath, currentSection)
  }

  onSectionChange(e) {
    this.props.onSectionChange(e.value)
  }

  render() {
    const {onCancel, resourcePath, valid, exists, showModal, currentSection, options} = this.props
    return showModal ? (
      <Modal onEsc={onCancel}
             onClickOverlay={onCancel}
             testId="New-Resource-Modal"
             className="new-resource">
        <ModalHeader title="Add new resource">
          <h1>Add new resource</h1>
        </ModalHeader>
        <ModalBody>
          <Select
            onChange={this.onSectionChange.bind(this)}
            options={options}
            name="Select"
            value={currentSection}
            tabindex="4"     // eslint-disable-line
          />
          <TextField value={resourcePath}
                     placeholder="Name..."
                     onChange={this.onPathChange.bind(this)}
                     autoFocus
                     testId="New-Resource-Input-Name"/>
          {
            (!valid && resourcePath.trim() !== '') ?
              <div className="new-resource-error">
                <Label >
                  {RESERVED_NAME_MESSAGE}
                </Label>
              </div>:null
          }
          {
            (valid && exists) ?
              <div className="new-resource-error">
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
            testId="modal-cancel-New-Resource-Modal"
          >Cancel</Button>
          <Button
            kind="primary"
            onClick={this.handleSubmit.bind(this)}
            disabled={!valid || exists}
            testId="modal-submit-New-Resource-Modal"
          >Ok</Button>
        </ModalFooter>
      </Modal>
    ) : null
  }
}

export default NewResource
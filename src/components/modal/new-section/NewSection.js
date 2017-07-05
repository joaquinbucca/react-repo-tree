import * as React from 'react'
import {RESERVED_NAME_MESSAGE} from '../constants'
import {Modal, ModalHeader, ModalBody, Label, Button, ModalFooter, TextField} from '../../MulesoftComponents'
import {Props} from './container'


class NewSection extends React.Component {
  props: Props

  onNameChange(e) {
    this.props.onNameChange(e.value)
  }

  handleSubmit() {
    const {sectionName} = this.props

    if (sectionName) this.props.onSubmit(sectionName)
  }

  render() {
    const {onCancel, sectionName, valid, exists, showModal} = this.props
    return showModal ? (
      <Modal onEsc={onCancel}
             onClickOverlay={onCancel}
             testId="New-Section-Modal"
             className="new-section">
        <ModalHeader title="Add new section">
          <h1>Add new section</h1>
        </ModalHeader>
        <ModalBody>
          <TextField value={sectionName}
                     placeholder="Name..."
                     onChange={this.onNameChange.bind(this)}
                     autoFocus
                     testId="New-Section-Input-Name"/>
          {
            (!valid && sectionName.trim() !== '') ?
              <div className="new-section-error">
                <Label >
                  {RESERVED_NAME_MESSAGE}
                </Label>
              </div>:null
          }
          {
            (valid && exists) ?
              <div className="new-section-error">
                <Label >
                  '{sectionName}' already exists in project
                </Label>
              </div>:null
          }
        </ModalBody>

        <ModalFooter>
          <Button
            kind="tertiary"
            onClick={onCancel}
            noFill
            testId="modal-cancel-New-Section-Modal"
          >Cancel</Button>
          <Button
            kind="primary"
            onClick={this.handleSubmit.bind(this)}
            disabled={!valid || exists}
            testId="modal-submit-New-Section-Modal"
          >Ok</Button>
        </ModalFooter>
      </Modal>
    ) : null
  }
}

export default NewSection
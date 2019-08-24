import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBContainer,
  MDBCol,
  MDBCardTitle,
  MDBSelect
} from "mdbreact";

class Modal extends Component {
  render() {
    const {
      disabled,
      outlined,
      addBilling,
      id,
      apptDate,
      apptTime,
      endTime,
      assigneeFirst,
      assigneeLast,
      assigneeCompany,
      assigneePhone,
      adjusterFirst,
      adjusterLast,
      adjusterCompany,
      adjusterPhone,
      contractors,
      dateAssigned,
      dateContractorAssigned,
      refName,
      refNumber,
      doi,
      dob,
      litigated,
      notes,
      language,
      assignmentType,
      locationName,
      address,
      city,
      state,
      postalCode,
      appointmentPrice,
      contractorMinimum,
      ApptMinimum,
      contractorPrice,
      additionalCost,
      status,
      billingContactName,
      billingPhone,
      billingEmail,
      billingLocation,
      billingAddress,
      billingCity,
      billingState,
      billingZipCode
    } = this.state;
    return (
      <MDBModal
        className='cascading-modal'
        isOpen={this.state.isOpen}
        toggle={this.state.toggle}
        size='fluid'
      >
        <MDBModalHeader
          className='text-center stylish-color-dark text-white'
          titleClass='w-100'
          tag='h1'
          toggle={this.state.toggle}
        >
          {this.state.headerName}
        </MDBModalHeader>

        {/** MODAL Body*/}
        <MDBModalBody>
          <MDBContainer>
            <MDBRow center>
              <MDBCol md='6'>
                <MDBInput
                  labelClass='active'
                  type='text'
                  name='dateAssigned'
                  label='Date Assigned'
                  disabled={disabled}
                  outline={outlined}
                  value={dateAssigned}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>
              <MDBCol md='6'>
                <MDBSelect
                  disabled={disabled}
                  outline={outlined}
                  options={this.state.optionsStatus}
                  value={status}
                  getTextContent={this.state.handleStatusChange}
                  selected={status}
                />
                <label>Appointment Status</label>
              </MDBCol>
            </MDBRow>
            <MDBCardTitle
              className='info-color-dark text-white z-depth-2 text-center rounded'
              tag='h2'
              size='12'
            >
              Case Information
            </MDBCardTitle>

            {/** Case Information */}
            {this.state.toggleCaseInfo}

            <MDBCardTitle
              className='info-color-dark text-white z-depth-2 text-center rounded'
              tag='h2'
              size='12'
            >
              Appointment Details
            </MDBCardTitle>

            {/** Toggle input for dates and time from being editable to non editable  */}
            {this.state.toggleDateTimeEdit}

            <MDBRow>
              <MDBCol lg='4' md='6'>
                <MDBInput
                  outline={outlined}
                  name='litigated'
                  disabled={disabled}
                  label='Litigated'
                  checked={litigated}
                  type='checkbox'
                  id='checkbox1'
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='4' md='6'>
                <MDBSelect
                  outline={outlined}
                  searchId='assignmentType'
                  label='Assignment Type'
                  options={this.state.optionsApptType}
                  value={assignmentType}
                  disabled={disabled}
                  getTextContent={this.state.handleAssignmentTypeChange}
                  selected={assignmentType}
                />
              </MDBCol>

              <MDBCol lg='4' md='6'>
                <MDBInput
                  outline={outlined}
                  name='language'
                  label='Language'
                  size='sm'
                  disabled={disabled}
                  type='text'
                  value={language}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>
            </MDBRow>

            {/** Toggle Edit input for Location name */}
            {this.state.toggleLocationNameEdit}

            <MDBRow>
              <MDBCol size='12'>
                <MDBInput
                  outline={outlined}
                  name='address'
                  label='Street Address'
                  size='sm'
                  disabled={disabled}
                  type='text'
                  value={address}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol size='4'>
                <MDBInput
                  outline={outlined}
                  name='city'
                  label='City'
                  disabled={disabled}
                  size='sm'
                  type='text'
                  value={city}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol size='4'>
                <MDBInput
                  outline={outlined}
                  name='state'
                  label='State'
                  disabled={disabled}
                  size='sm'
                  type='text'
                  value={state}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol size='4'>
                <MDBInput
                  outline={outlined}
                  name='zipCode'
                  label='Zip Code'
                  disabled={disabled}
                  size='sm'
                  type='number'
                  value={postalCode}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>
            </MDBRow>

            <MDBCardTitle
              className='info-color-dark text-white z-depth-2 text-center rounded'
              tag='h2'
              size='12'
            >
              Assignee Information
            </MDBCardTitle>

            <MDBRow>
              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='assigneeFirst'
                  label='First Name '
                  size='sm'
                  disabled={disabled}
                  type='text'
                  value={assigneeFirst}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='assigneeLast'
                  label='Last Name'
                  size='sm'
                  disabled={disabled}
                  type='text'
                  value={assigneeLast}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='assigneeCompany'
                  label='Company Name'
                  size='sm'
                  disabled={disabled}
                  type='text'
                  value={assigneeCompany}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='assigneePhone'
                  label='Phone'
                  size='sm'
                  disabled={disabled}
                  value={this.state.formatPhoneNumberAssignee}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>
            </MDBRow>

            <MDBCardTitle
              className='info-color-dark text-white z-depth-2 text-center rounded'
              tag='h2'
              size='12'
            >
              Adjuster Information
            </MDBCardTitle>

            <MDBRow>
              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='adjusterFirst'
                  label='First Name '
                  size='sm'
                  disabled={disabled}
                  value={adjusterFirst}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='adjusterLast'
                  label='Last Name'
                  size='sm'
                  disabled={disabled}
                  value={adjusterLast}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='adjusterCompany'
                  label='Company Name'
                  size='sm'
                  disabled={disabled}
                  value={adjusterCompany}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>

              <MDBCol lg='3' md='6'>
                <MDBInput
                  outline={outlined}
                  name='adjusterPhone'
                  label='Phone'
                  size='sm'
                  disabled={disabled}
                  type='text'
                  value={this.state.formatPhoneNumberAdjuster}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow center>
              <MDBCol sm='5'>
                <MDBInput
                  name='contractors'
                  outline={outlined}
                  label='Interpreter Assigned'
                  value={contractors}
                  size='sm'
                  disabled={disabled}
                  onChange={this.state.handleInputChange}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow center>
              <MDBCol sm='3'>
                <MDBInput
                  outline={outlined}
                  disabled={disabled}
                  name='appointmentPrice'
                  label='Appointment Price'
                  value={appointmentPrice}
                  onChange={this.state.handleInputChange}
                  type='number'
                />
              </MDBCol>
              <MDBCol sm='1'>
                <MDBIcon icon='times' />
              </MDBCol>
              <MDBCol sm='3'>
                <MDBInput
                  outline={outlined}
                  disabled={disabled}
                  name='ApptMinimum'
                  value={ApptMinimum}
                  onChange={this.state.handleInputChange}
                  type='number'
                  label='Minimum Time'
                />
              </MDBCol>

              <MDBCol sm='1'>
                <MDBIcon icon='equals' />
              </MDBCol>

              <MDBCol sm='3'>
                <MDBInput
                  outline={outlined}
                  disabled={disabled}
                  labelClass='active'
                  name='total'
                  value={this.state.addTotalAppt}
                  label='Total'
                  icon=''
                />
              </MDBCol>
            </MDBRow>

            <MDBRow center>
              <MDBCol sm='3'>
                <MDBInput
                  outline={outlined}
                  disabled={disabled}
                  name='contractorPrice'
                  label='Contractor Price'
                  value={contractorPrice}
                  onChange={this.state.handleInputChange}
                  type='number'
                />
              </MDBCol>
              <MDBCol sm='1'>
                <MDBIcon icon='times' />
              </MDBCol>
              <MDBCol sm='3'>
                <MDBInput
                  outline={outlined}
                  disabled={disabled}
                  name='contractorMinimum'
                  value={contractorMinimum}
                  onChange={this.state.handleInputChange}
                  type='number'
                  label='Minimum Time'
                />
              </MDBCol>

              <MDBCol sm='1'>
                <MDBIcon size='sm' icon='equals' />
              </MDBCol>

              <MDBCol sm='3'>
                <MDBInput
                  outline={outlined}
                  disabled={disabled}
                  labelClass='active'
                  name='total'
                  value={this.state.addTotalContr}
                  label='Total'
                  icon=''
                />
              </MDBCol>
            </MDBRow>

            {/** Billing information Drop down */}
            {this.state.billingInfo}
          </MDBContainer>
        </MDBModalBody>
        <MDBModalFooter>
          {/* Should Edit or cancel changes button be Displayed? */}
          {this.state.toggleEditButton}

          {/* Should Close or Save button be Displayed? */}
          {this.state.toggleCloseButton}
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default Modal;

import React, { Fragment, Component } from "react";
import API from "../utils/API";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBFormInline,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import AddressCard from "../components/AddressCard";
class Address extends Component {
  state = {
    value: 0
  };

  //these 3 allow us to access db to search
  changeClientSearch = data => {
    this.setState({
      clients: data
    });
  };

  changeApptSearch = data => {
    this.setState({
      appointments: data
    });
  };

  changeContractorSearch = data => {
    this.setState({
      contractors: data
    });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  toggle = tab => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    const { contractors, clients } = this.props;

    console.log({ contractors, clients });

    return (
      <MDBContainer className='mt-4'>
        <MDBRow>
          <MDBCol md='12'>
            <form className='form-inline mt-4 mb-4 '>
              <MDBContainer>
                <MDBRow>
                  <MDBCol
                    md='12'
                    className='d-flex-inline justify-content-center'
                  >
                    <div>
                      <MDBIcon icon='search' />
                      <input
                        className='form-control form-control-sm ml-3 w-75 '
                        type='text'
                        placeholder='Search'
                        aria-label='Search'
                      />
                      <MDBBtn
                        outline
                        color='primary'
                        rounded
                        size='sm'
                        type='submit'
                      >
                        Search
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </form>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol />
          <MDBCol md='12'>
            <h2>Basic</h2>
            <MDBNav tabs className='nav-justified'>
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  className={this.state.activeItem === "1" ? "active" : ""}
                  onClick={this.toggle("1")}
                  role='tab'
                >
                  <MDBIcon icon='user' /> Client
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  className={this.state.activeItem === "2" ? "active" : ""}
                  onClick={this.toggle("2")}
                  role='tab'
                >
                  Contractor
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent className='card' activeItem={this.state.activeItem}>
              <MDBTabPane tabId='1' role='tabpanel'>
                <MDBSelect>
                  <MDBSelectInput selected='Filter' />
                  <MDBSelectOptions>
                    <MDBSelectOption disabled>
                      Choose your option
                    </MDBSelectOption>
                    <MDBSelectOption value='1'>Insurance</MDBSelectOption>
                    <MDBSelectOption value='2'>Investigation</MDBSelectOption>
                    <MDBSelectOption value='3'>Law Firm</MDBSelectOption>
                  </MDBSelectOptions>
                </MDBSelect>
                {clients.map(client =>
                  // console.log({ clients, client })
                  (
                    <AddressCard
                      cardData={client}
                      clients={clients}
                      dataType='client'
                    />
                  )
                )}
              </MDBTabPane>
              <MDBTabPane tabId='2' role='tabpanel'>
                <MDBSelect>
                  <MDBSelectInput selected='Filter' />
                  <MDBSelectOptions>
                    <MDBSelectOption disabled>
                      Choose your option
                    </MDBSelectOption>
                    <MDBSelectOption value='1'>Medical</MDBSelectOption>
                    <MDBSelectOption value='2'>Court</MDBSelectOption>
                    <MDBSelectOption value='3'>Qualified</MDBSelectOption>
                  </MDBSelectOptions>
                </MDBSelect>
                {contractors.map(contractor => (
                  <AddressCard cardData={contractor} dataType='contractor' />
                ))}
              </MDBTabPane>
            </MDBTabContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Address;

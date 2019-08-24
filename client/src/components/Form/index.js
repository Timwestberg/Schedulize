import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdbreact";
import Input from "../UI/Input";
import API from "../../utils/API";

class Form extends React.Component {
  render(props) {
    const { apptForm, contrForm, clientForm } = { ...this.props.forms };

    const ApptElementsArray = [];
    for (let key in apptForm) {
      ApptElementsArray.push({
        id: key,
        config: apptForm[key]
      });
    }
    const ContrElementsArray = [];
    for (let key in contrForm) {
      ContrElementsArray.push({
        id: key,
        config: contrForm[key]
      });
    }
    const ClientElementsArray = [];
    for (let key in clientForm) {
      ClientElementsArray.push({
        id: key,
        config: clientForm[key]
      });
    }

    let modalView = null;
    switch (this.props.current) {
      case "Appointment":
        modalView = (
          <MDBContainer>
            <form onSubmit={this.props.submit}>
              <MDBRow>
                {ApptElementsArray.map(formElement => (
                  <MDBCol size="small" lg="6">
                    <Input
                      key={formElement.id}
                      inputValue={formElement.config.value}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      change={event => this.props.change(event, formElement.id)}
                      dateChange={this.handleDateChange}
                    />
                  </MDBCol>
                ))}
              </MDBRow>

              <MDBBtn type="submit">Submit</MDBBtn>
            </form>
          </MDBContainer>
        );
        break;
      case "Contractor":
        // const { options } = this.props;
        // const choices = [];
        // for (let option in options) {
        //   choices.push({
        //     text: option.text,
        //     value: option.value
        //   });
        //   console.log([option].text);
        // }
        // console.log({ options, choices });
        modalView = (
          <MDBContainer>
            <form onSubmit={this.props.submit}>
              <MDBRow>
                {ContrElementsArray.map(formElement => (
                  <MDBCol size="small" lg="6">
                    <Input
                      key={formElement.id}
                      value={formElement.config.value}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      change={event => this.props.change(event, formElement.id)}
                      dateChange={this.handleDateChange}
                      options={this.props.options}
                    />
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBBtn type="submit">Submit</MDBBtn>
            </form>
          </MDBContainer>
        );
        break;
      case "Client":
        modalView = (
          <MDBContainer>
            <form onSubmit={this.props.submit}>
              <MDBRow>
                {ClientElementsArray.map(formElement => (
                  <MDBCol size="small" lg="6">
                    <Input
                      key={formElement.id}
                      value={formElement.config.value}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      change={event => this.props.change(event, formElement.id)}
                      dateChange={this.handleDateChange}
                    />
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBBtn type="submit">Submit</MDBBtn>
            </form>
          </MDBContainer>
        );
        break;
      default:
        modalView = (
          <MDBContainer>
            <form onSubmit={this.props.submit}>
              <MDBRow>
                {ApptElementsArray.map(formElement => (
                  <MDBCol size="small" lg="6">
                    <Input
                      key={formElement.id}
                      value={formElement.config.value}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      change={event => this.props.change(event, formElement.id)}
                      dateChange={props.handleDateChange}
                    />
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBBtn type="submit">Submit</MDBBtn>
            </form>
          </MDBContainer>
        );
    }
    return <div>{modalView}</div>;
  }
}

export default Form;

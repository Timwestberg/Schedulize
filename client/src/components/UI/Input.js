import React from "react";
import {
  MDBInput,
  MDBDatePicker,
  MDBTimePicker,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions
} from "mdbreact";

const Input = props => {
  let inputElement = null;
  // console.log(props.options);
  switch (props.elementType) {
    case "Input":
      inputElement = (
        <MDBInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "MultiSelect":
      inputElement = (
        <MDBSelect
          // value={value}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        >
          {/* <MDBSelectOptions>
            {props.options.map(item => (
              <MDBSelectOption key={item.value} value={item.value}>
                {item.text}
              </MDBSelectOption>
            ))}
          </MDBSelectOptions>
          <MDBSelectInput selected="Choose your option" /> */}
        </MDBSelect>
      );
      break;
    case "DatePicker":
      inputElement = (
        <MDBDatePicker
          {...props.elementConfig}
          value={props.value}
          onChange={props.dateChange}
        />
      );
      break;
    case "TimePicker":
      inputElement = (
        <MDBTimePicker
          {...props.elementConfig}
          value={props.value}
          onChange={props.timeChange}
        />
      );
      break;
    case "Checkbox":
      inputElement = (
        <MDBInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.timeChange}
          type="checkbox"
          id="checkbox1"
        />
      );
      break;
    default:
      inputElement = (
        <MDBInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
  }

  return <div>{inputElement}</div>;
};

export default Input;

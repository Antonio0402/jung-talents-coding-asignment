import styled from "styled-components/macro";
import Input from "./Input";
import VisuallyHidden from "./VisuallyHidden";
import { useFormData } from "../hooks/useFormField";
import TextField from "./TextField";

const Form = () => {
  const formData = useFormData();

  return (
    <FormWrapper id="billing">
      <Split>
        <TextField
          field={formData.firstName}
          fieldName="firstName"
          type="text"
          labelText="First Name"
          placeholder="Join"
          pattern="([A-Z])[\w+.]{1,}"
          isRequired={true}
        />
        <TextField
          field={formData.lastName}
          fieldName="lastName"
          type="text"
          labelText="Last Name"
          placeholder="Doe"
          pattern="([A-Z])[\w+.]{1,}"
          isRequired={true}
        />
        <TextField
          field={formData.email}
          fieldName="email"
          type="email"
          labelText="Email"
          placeholder="JoinDoe@email.com"
        />
        <TextField
          field={formData.phone}
          fieldName="phone"
          type="tel"
          labelText="Phone"
          placeholder="0400000001"
          isRequired={true}
        />
      </Split>

      <TextField
        field={formData.country}
        fieldName="country"
        type="text"
        labelText="Country/Region"
        placeholder="Italy"
        pattern="[\w+.]{2,}"
        isRequired={true}
      />

      <Split>
        <TextField
          field={formData.countryCode}
          fieldName="countryCode"
          type="text"
          labelText="Country Code"
          placeholder="IT"
          pattern="[\w+]{2}"
          isRequired={true}
        />
        <TextField
          field={formData.postCode}
          fieldName="postCode"
          type="text"
          labelText="Postal Zip"
          placeholder="50056"
          pattern="[\d]{5,}"
          isRequired={true}
        />
      </Split>
      <TextField
        field={formData.streetAddress1}
        fieldName="streetAddress1"
        type="text"
        labelText="Street Address"
        placeholder="Via della Rosa, 58"
        pattern="[\w\d\s.#,\-]{2,}"
        isRequired={true}
      >
        <VisuallyHidden>
          <label htmlFor="streetAddress2">2nd Address line</label>
        </VisuallyHidden>
        <Input
          type="text"
          id="streetAddress2"
          name="streetAddress2"
          placeholder="Apt. 2"
          pattern="[\w\d\s.#]+"
          initialValue={formData.streetAddress2}
        />
      </TextField>
      <TextField
        field={formData.city}
        fieldName="city"
        type="text"
        labelText="City/Town"
        placeholder="Montelupo Fiorentino"
        pattern="([A-Z])[\w\s.]{1,}"
        isRequired={true}
      ></TextField>
    </FormWrapper>
  );
};

export default Form;

const FormWrapper = styled.form`
  & > * + * {
    margin-top: 2rem;
  }
`;

const Split = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  & > * {
    flex: 1 1 30%;
  }
`;

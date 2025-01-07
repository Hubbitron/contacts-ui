import React, { useEffect, useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router'
import { callFetch, callFetchMultipart } from '../helper/Global';
import { Contact } from './model/Contact';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { State } from '../model/State';

const ContactEdit = () => {
  
  let {paramId} = useParams();
  paramId = !paramId ? "" : paramId;
  
  let navigate: NavigateFunction = useNavigate();

  const [stateList, setStateList] = useState<State[]>([]);

  const [id] = useState(paramId);
  const form = useForm<Contact>({
    defaultValues: async (): Promise<Contact> => {
      let form: Contact = new Contact();
      if(id === '0'){
        return form;
      }
      const response = await callFetch("/getSingle/" + id, "GET", "");
      const rowFromServer = await response.json();
      form = rowFromServer;
      return form;
    },
    mode: "all",
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;
  
  useEffect(() => {
    const getStates = async(): Promise<void> => {
      const response = await callFetch("/getStates", "GET", "");
      const rowsFromServer: State[] = await response.json();

      setStateList(rowsFromServer);
    };

    getStates();

  },[]);

  const onSubmit = async (formObj: any): Promise<void> => {
    const contact = new Contact();
    contact.id = formObj.id;
    contact.lastName = formObj.lastName;
    contact.middleName = formObj.middleName;
    contact.firstName = formObj.firstName;
    contact.dob = formObj.dob;
    contact.addressLine1 = formObj.addressLine1;
    contact.addressLine2 = formObj.addressLine2;
    contact.city = formObj.city;
    contact.stateId = formObj.stateId;
    contact.zipCode = formObj.zipCode;
    contact.homePhone = formObj.homePhone;
    contact.workPhone = formObj.workPhone;
    contact.cellPhone = formObj.cellPhone;

    const formData: FormData = new FormData();
    if (formObj.profilePic) {
      formData.append('file', formObj.profilePic[0]);
    }
    
    formData.append('json', JSON.stringify(contact));
    


    const httpMethod = formObj.id === 0 ? "POST" : "PUT";
    const endpoint = formObj.id === 0 ? "/insert" : "/update";
    const response = await callFetchMultipart(endpoint, httpMethod, formData);
    if (!response.ok && response.status !== 201) {
      alert("Update failed" + " " + response.status);
      return;
    }

    navigate("/contactlist");
  }

  const stateDropdownList = stateList.map((item: any) => 
    <option key = {item.id} value = {item.id}>
      {item.stateName}
    </option>
  );

  
  return (
    <div className = "App">
      <h2 className='page header'>
        Contact Edit Page
      </h2>
      <form name="ContactEdit" id="ContactEdit" onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td className='label-align'>
                Last Name
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="lastName"
                    {...register("lastName")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Middle Name
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="middleName"
                    {...register("middleName")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                First Name
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="firstName"
                    {...register("firstName")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                DOB
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "date" className='textbox-large' id="dob"
                    {...register("dob", {valueAsDate: true})}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Address Line 1
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="addressLine1"
                    {...register("addressLine1")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Address Line 2
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="addressLine2"
                    {...register("addressLine2")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                City
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="city"
                    {...register("city")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                State
              </td>
              <td className='label-align'>
                <div className='field-align-char'>
                  <select
                    {...register("stateId")} 
                    value = {watch("stateId")}
                  >
                    {stateDropdownList}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Zip Code
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="zipCode"
                    {...register("zipCode")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Home Phone
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="homePhone"
                    {...register("homePhone")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Work Phone
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="workPhone"
                    {...register("workPhone")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                Cell Phone
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "text" className='textbox-large' id="cellPhone"
                    {...register("cellPhone")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className='label-align'>
                File
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "file" className='textbox-large' id="profilePic"
                    {...register("profilePic")}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant = "secondary" type = "submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
export default ContactEdit
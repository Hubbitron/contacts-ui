import React, { useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router'
import { callFetch } from '../helper/Global';
import { Contact } from './model/Contact';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';

const ContactEdit = () => {
  
  let {paramId} = useParams();
  paramId = !paramId ? "" : paramId;
  
  let navigate: NavigateFunction = useNavigate();

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
  
  const onSubmit = async (formData: Contact): Promise<void> => {
    const contact = new Contact();
    contact.id = formData.id;
    contact.lastName = formData.lastName;
    contact.firstName = formData.firstName;

    const httpMethod = formData.id === 0 ? "POST" : "PUT";
    const endpoint = formData.id === 0 ? "/insert" : "/update";
    const response = await callFetch(endpoint, httpMethod, JSON.stringify(contact));
    if (!response.ok && response.status !== 201) {
      alert("Update failed" + " " + response.status);
      return;
    }

    navigate("/");
  }

  

  
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
                Contact ID
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "hidden" className='textbox-small' id="id" 
                    {...register("id")}
                  />
                  {watch("id")}
                </div>
              </td>
            </tr>
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
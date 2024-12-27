import React, { useState } from 'react'
import { useParams } from 'react-router'
import { callFetch } from '../helper/Global';
import { Contact } from './model/Contact';
import { useForm } from 'react-hook-form';

const ContactEdit = () => {
  
  let {paramId} = useParams();
  paramId = !paramId ? "" : paramId;
  
  const [id] = useState(paramId);
  const form = useForm<Contact>({
    defaultValues: async (): Promise<Contact> => {
      let form: Contact = new Contact();
      const response = await callFetch("http://localhost:8080/ContactsApi/api/getSingle/" + id, "GET", "");
      const rowFromServer = await response.json();
      form = rowFromServer;
      return form;
    },
    mode: "all",
  });
  
  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;
  
  return (
    <div className = "App">
      <h2 className='page header'>
        Contact Edit Page
      </h2>
      <form name="ContactEdit" id="ContactEdit">
        <table>
          <tbody>
            <tr>
              <td className='label-align'>
                Contact ID
              </td>
              <td className='label-align'>
                <div className='field-label'>
                  <input type = "number" className='textbox-small' id="id" 
                    {...register("id")}
                  />
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
      </form>
    </div>
  )
}

export default ContactEdit
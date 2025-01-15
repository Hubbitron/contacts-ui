import { NavigateFunction, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Contact } from './model/Contact';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { State } from '../model/State';
import { callFetch } from '../helper/Global';

const ContactSearch = () => {
    
  let navigate: NavigateFunction = useNavigate();

  const form = useForm<Contact>({
    defaultValues: async (): Promise<Contact> => {
      let form: Contact = new Contact();
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
      const blankState: State = new State();
      const stateListBlank: State[] = [blankState, ...rowsFromServer];

      setStateList(stateListBlank);
    };

    getStates();

  },[]);


  const onSubmit = async (formObj: any): Promise<void> => {        
      let queryString: string = '';

      if (formObj.lastName) {
        queryString += '&lastName=' + formObj.lastName;
      }
            
      if (formObj.firstName) {
        queryString += '&firstName=' + formObj.firstName;
      }

      if (formObj.stateId) {
        queryString += '&stateId=' + formObj.stateId;
      }

      queryString = queryString.length > 0 ? queryString.substring(1) : '';
      queryString = '?' + queryString;

      navigate("/contactlist" + queryString);
  }
  
  const [stateList, setStateList] = useState<State[]>([]);

  const stateDropdownList = stateList.map((item: any) => 
    <option key = {item.id} value = {item.id}>
      {item.stateName}
    </option>
  );

  return(
    <div>
        <h2>Enter Search Criteria</h2>
        <form name="SearchContact" id="SearchContact" onSubmit={handleSubmit(onSubmit)}>
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
                          State
                        </td>
                        <td className='label-align-char'>
                          <select
                            {...register("stateId", {
                            validate: (fieldValue: number) => {
                            return (
                            fieldValue > 0 || "Must select state"
                            );
                          }
                      })}
                    value = {watch("stateId")}>
                    {stateDropdownList}
                  </select>
                  <p className='error-message'>
                    {errors.stateId?.message}
                  </p>
              </td>
            </tr>

                </tbody>
            </table>
            <Button variant = "secondary" type = "submit">
                Submit
            </Button>
        </form>
    </div>
  );
}
export default ContactSearch
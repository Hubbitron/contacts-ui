import { NavigateFunction, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Contact } from './model/Contact';
import { Button } from 'react-bootstrap';

const ContactSearch = () => {
    
  let navigate: NavigateFunction = useNavigate();

  const form = useForm<Contact>({
    defaultValues: async (): Promise<Contact> => {
      let form: Contact = new Contact();
        return form;
      },
      mode: "all",
  });
    
  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (formObj: any): Promise<void> => {        
      let queryString: string = '';

      if (formObj.lastName) {
        queryString += '&lastName=' + formObj.lastName;
      }
            
      if (formObj.firstName) {
        queryString += '&firstName=' + formObj.firstName;
      }

      queryString = queryString.length > 0 ? queryString.substring(1) : '';
      queryString = '?' + queryString;

      navigate("/contactlist" + queryString);
  }
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
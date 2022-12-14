import { http } from '~/packages/http';
import { Employee } from '~/models/Employee';
import { isBadResponse } from '~/helpers/isBadResponse';
import { handleBadResponse } from '~/helpers/handleBadResponse';

export const createEmployee = async (employeeId, {
  name,
  surname,
  email,
  birthDate,
  nroDocument,
  imageURL,
  type,
  accessCode,
  phone
})=> {
  const response = await http.put(
    `${config.EMPLOYEES_SERVICE_URI}/employee?employeeId=${employeeId}`,
    {
      name,
      surname,
      email,
      birthDate,
      nroDocument,
      imageURL,
      type,
      accessCode,
      phone
    }
  ); 

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const employee = new Employee(data.employee);

  return employee;
}

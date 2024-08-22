const api = '/api';

export const endPoint = {
  usersList: `${api}/users`,
  deleteUser: (userId: number) => `${api}/users/${userId}`,
  customersList: `${api}/customers`,
  updateCustomer: (customerId: number) => `${api}/customers/${customerId}`,

  employeesList: (pageIndex: number, pageSize: number) =>
    `${api}/employees?pageIndex=${pageIndex}&pageSize=${pageSize}`,

  employeesByVendorId: `${api}/employees/list`,

  newEmployee: `${api}/saveNewEmp`,
  updateEmpAvailability: `${api}/updateEmpAvailability`,
  getEmpInfo: (empId: string) => `${api}/employees/${empId}`,

  newJob: `${api}/jobs/new`,
  jobsList: (pageIndex: number, pageSize: number) =>
    `${api}/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`,
  applyForJob: `${api}/job/apply`,
};

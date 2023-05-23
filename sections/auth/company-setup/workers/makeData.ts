export default function makeData() {
  const data: {
    firstName: string
    lastName: string
    email: string
    position: string
  }[] = [{ email: '', firstName: '', lastName: '', position: '' }]

  const columns = [
    {
      id: 'email',
      label: 'Email',
      accessor: 'email',
      minWidth: 100,
      dataType: 'email',
      placeholder: 'Enter the Email',
      align: 'left',
    },
    {
      id: 'firstName',
      label: 'First Name',
      accessor: 'firstName',
      minWidth: 100,
      dataType: 'text',
      placeholder: 'Enter the First Name',
      align: 'left',
    },
    {
      id: 'lastName',
      label: 'Last Name',
      accessor: 'lastName',
      minWidth: 100,
      dataType: 'text',
      placeholder: 'Enter Last Name',
      align: 'left',
    },
    {
      id: 'position',
      label: 'Affectation',
      accessor: 'position',
      minWidth: 100,
      dataType: 'select',
      placeholder: 'Choose affectation',
      align: 'right',
      options: [
        {
          label: 'Customer Relationship Manager',
          value: 'CRM',
        },
        {
          label: 'Project Manager',
          value: 'PM',
        },
        {
          label: 'Finance Manager',
          value: 'FM',
        },
        {
          label: 'Supply chain & Inventory  Manager',
          value: 'SCM',
        },
        {
          label: 'Human Resources Manager',
          value: 'HRM',
        },
      ],
    },
  ]
  return { columns, data }
}

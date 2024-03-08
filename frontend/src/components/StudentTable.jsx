import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'Advisor',
    headerName: 'Advisor',
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, Advisor: "Advisor A"},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31,Advisor: "Advisor C" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31,Advisor: "Advisor B" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11,Advisor: "Advisor A" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,Advisor: "Advisor B" },
  { id: 6, lastName: 'Melisandre', firstName: 'Daenerys', age: 150, Advisor: "Advisor A" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, Advisor: "Advisor C" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, Advisor: "Advisor A" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, Advisor: "Advisor A" },

];


//From https://mui.com/material-ui/react-table/
export default function StudentTable() {
  return (
    <Box sx={{ height: 320, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

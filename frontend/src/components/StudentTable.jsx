import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useParams,useCallback } from 'react';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
  },
  {
    field: 'major',
    headerName: 'Major',
    width: 300,
    editable: true,
  },
  {
    field: 'assignedAdvisor',
    headerName: 'Assigned Advisor',
    width: 300,
    editable: true,
  },
  {
    field: 'assignedAdvisorId',
    headerName: 'Assigned Advisor\'s ID',
    width: 300,
    editable: true,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, Advisor: "Advisor A" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, Advisor: "Advisor C" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, Advisor: "Advisor B" },

];




//From https://mui.com/material-ui/react-table/

// Need to refactor to allow data passing to the parent 
export default function StudentTable({onSelect}) {
  const [students, setStudents] = useState([]);
  
  //fetch the student from the server and db
  useEffect(() => {
    axios.get(`http://localhost:4000/advisor/fetchAllStudent/`)
      .then((response) => {
        const studentsWithIds = response.data.individualStudent.map(student => ({
          ...student,
          id: student._id,
        }));
        setStudents(studentsWithIds);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  //fetch student id and advisor id for the other components
  const handleRowSelection = (selection) => {
    const selectedStudents = selection.map(selectedStudentId => {
        // Find the student object in the data array based on the selected student ID
        const selectedStudent = students.find(student => student.id === selectedStudentId);
        // Extract the advisor ID from the selected student object
        const advisorId = selectedStudent ? selectedStudent.assignedAdvisorId : null;
        // Return an object containing the student ID and advisor ID
        return {
            studentId: selectedStudentId,
            advisorId: advisorId,
        };
    });
    //console.log('Selected Students:', selectedStudents);
    onSelect(selectedStudents);
};

  


  return (
    <Box sx={{ height: 320, width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns}

        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          }
        }}
        onRowSelectionModelChange={handleRowSelection}
        pageSizeOptions={[4]}
        checkboxSelection={false}


      />
    </Box>
  );
}

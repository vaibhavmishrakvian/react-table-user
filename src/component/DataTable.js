import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  
  { field: 'avatar', headerName: 'IMAGE', width: 300, renderCell:(params) => <img src={params.value}/> },
  { field: 'id', headerName: 'ID' },
  { field: 'first_name', headerName: 'FIRSTNAME', width: 200 },
  { field: 'last_name', headerName: 'LASTNAME', width: 200 },
  { field: 'email', headerName: 'EMAIL', width: 200 }
  
  
]

const DataTable = () => {

  const [tableData, setTableData] = useState([])

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);
  

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((data) => data.json())
      .then((data) => setTableData(data.data))


  }, [])

  console.log(tableData);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        
        onSelectionModelChange={({ selectionModel }) => {
          const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
         const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
        }}
      />
    </div>
  )
}

export default DataTable

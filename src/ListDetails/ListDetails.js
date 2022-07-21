import { useEffect, useState } from 'react';
import { initDB, useIndexedDB } from 'react-indexed-db';
import DownloadIcon from '@mui/icons-material/Download';
import { ToastContainer, toast } from 'react-toastify';
import SearchBar from "material-ui-search-bar";
import { CSVLink } from "react-csv";
import { convertFromHTML, ContentState, convertFromRaw } from 'draft-js'

import 'react-toastify/dist/ReactToastify.css';
import './ListDetails.css';
const cols = [{
    title: "Employee Name",
    key: "emp_name"
},{
    title: "Subject",
    key: "subject"
},{
    title: "Manager Name",
    key: "manager_name"
},{
    title: "Date",
    key: "date"
}, 
{
    title:"Comments",
    key:"comments"}, 
{ 
    title:"Employee Email", 
    key:"empl_email"}
]
let copyRows = [], newCopyForRows =[];

function ListDetails(props) {
const {create, edit} =  props;
const { getByIndex, getAll, deleteRecord } = useIndexedDB('Performance');
  const [col, setCol] = useState(cols);
  const [rows, setRows] = useState([]);
  const [searchStr, setSearchStr] =  useState("");
  useEffect(()=>{
     const column = col.slice(0, 4);
    setCol(column);
    getAll().then(data=>{
        data = data.reverse();
        copyRows = data;
        newCopyForRows = structuredClone(data);
        newCopyForRows.map(item => (item.comments = convertFromRaw(JSON.parse(item.comments))))
        setRows(data);
    }, error=>{

    })
  }, [])
  const search = (str) =>{
    console.log(str);
  }
  const cancelSearch =()=>{
      setRows(copyRows);
  }
  const changeHandler=(str)=>{
    const res = copyRows.filter(obj => obj.subject.toLowerCase().indexOf(str.toLowerCase())>-1 || 
        obj.emp_name.toLowerCase().indexOf(str.toLowerCase())>-1);
    setRows(res)
  }
  return (
    <div class="right-side update-right">
        <h2>Employee Intraction Details</h2>
        <SearchBar
          value={searchStr}
          onChange={(searchVal) => changeHandler(searchVal)}
          onCancelSearch={() => cancelSearch()}
          className='search-bar'
        />
        <br/>
        <table className="employee-table outer-border">
            <thead>
            <tr>
                {col.length && col.map((column)=><th>{column.title}</th>)}
                <th><button onClick={()=>{
                    create();
                }}>Add</button> 
                    <CSVLink data={newCopyForRows} headers={cols}>
                         <DownloadIcon sx={{ fontSize: 25 }} className='icon-download'/>
                    </CSVLink>
                </th>
            </tr>
            </thead>
            <tbody>
            {rows.length && rows.map((row)=><tr>
                <td>{row.emp_name}</td>
                <td>{row.subject}</td>
                <td>{row.manager_name}</td>
                <td>{new Date(row.date).getDate() + "-" + (new Date(row.date).getMonth()+1) +  "-" + new Date(row.date).getFullYear()}</td>
                <td><button onClick={()=>{edit(row)}}>Edit</button> <button onClick={()=>{
                         deleteRecord(row.id).then((event)=>{
                            toast.success("Deleted Successfully !", {
                                position: toast.POSITION.TOP_CENTER
                              });
                              setTimeout(()=>{
                                 window.location.reload();
                              },500)
                         }, err=>{
                            toast.error("Error while processing !", {
                                position: toast.POSITION.TOP_CENTER
                              });
                         });
                }
                } disabled>Delete</button></td>
            </tr>) || <td colSpan={5} className='no-records'>No Records Found</td>}
            </tbody>
        </table>
   </div> 
  );
}

export default ListDetails;

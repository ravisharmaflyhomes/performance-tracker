import { useEffect, useState, useRef } from 'react';
import './PerformanceForm.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import { useForm } from "react-hook-form";
import Logout from '../Logout/Logout';
import {DBConfig} from '../db/DBConfig';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'
import ListDetails from '../ListDetails/ListDetails';
import ClearIcon from '@mui/icons-material/Clear';
const defaultTheme = createTheme();
let content = ''
Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                marginTop: 20,
                width: "100%",
                fontSize:18
            },
            editor: {
                borderBottom: "1px solid #e0e0e0",
                minHeight:200,
                fontSize:18
            }
        }
    }
})

function PerformanceForm(props) {
  const { getByIndex, add, update } = useIndexedDB('Performance');
  const {user} = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const [value, setValue] = useState(null)
  const [isCreate, setIsCreate] = useState(false);
  const [mode, setMode] = useState('');
  const ref = useRef(null);
  const onSubmit = (data) => {
    ref.current?.save()
    if(data){
      data["comments"] =  content;
      data["date"] = new Date()
      data["manager_email"] = user.email
      if(mode === 'add'){
        add(data).then(
          event => {
            toast.success("Recorded Successfully !", {
              position: toast.POSITION.TOP_CENTER
            });
            setIsCreate(false);
          },
          error => {
            toast.error("Error while processing !", {
              position: toast.POSITION.TOP_CENTER
            });
          }
        );
      }else if(mode === 'edit'){
        update(data).then(res=>{
          toast.success("Recorded updated Successfully !", {
            position: toast.POSITION.TOP_CENTER
          });
          setIsCreate(false);
        }, err=>{
          toast.error("Error while processing !", {
            position: toast.POSITION.TOP_CENTER
          });
        })
      }
     
    }
  }; // your form submit function which will invoke after successful validation

  const handleSave = (data) => {
    content = data;
  }

  useEffect(()=>{
    //updateRichContentEditor();
  }, []);


  const createRecord = (data)=>{
    setIsCreate(true);
    setMode('add');
  }

  const editRecord = (data)=>{
    setIsCreate(true);
    reset({ ...data });
    setValue(data.comments);
    // updateRichContentEditor(JSON.stringify(data.comments));
    setMode('edit');
  }

  return (<>
      <Logout user={user}/>
      {isCreate && <form onSubmit={handleSubmit(onSubmit)}>
      <div className="cancel-form"><a href="" onClick={()=>{
        setIsCreate(false);
      }}><ClearIcon sx={{ fontSize: 25 }}/></a></div>
    <div className='right-side update-right'>
        <h2>Employee Performance Form</h2>
          <span className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="text" id="emp-name" {...register("emp_name", { required: true})} />
            <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="emp-name">
              <span className="input__label-content input__label-content--hoshi">Employee Name</span>
            </label>
          </span>
          {errors.emp_name && <p className='redText'>Please enter a valid Employee Name</p>}
          <span className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="text" id="emp-email" {...register("emp_email", { required: true, pattern:{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}})} />
            <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="emp-email">
              <span className="input__label-content input__label-content--hoshi">Employee Email</span>
            </label>
          </span>
          {errors.emp_email && <p className='redText'>Please enter a valid Employee Email Address</p>}
          <span className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="text" id="emp-email" {...register("subject", { required: true})} />
            <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="emp-email">
              <span className="input__label-content input__label-content--hoshi">Subject</span>
            </label>
          </span>
          {errors.subject && <p className='redText'>Please enter a valid Subject</p>}
          <span className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="text" id="manager_name" defaultValue={user.name} {...register("manager_name", { required: true})}/>
            <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="manager_name">
              <span className="input__label-content input__label-content--hoshi">Manager Name</span>
            </label>
          </span>
          {errors.manager && <p className='redText'>Please enter a valid Manager Name</p>}
          <div className="bottom_bottom">
          <ThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor label="Start typing here..." defaultValue={value} onSave={handleSave} ref={ref} customControls={[
                    {
                        name: "performance-control-editor",
                        inlineStyle: {
                            fontSize:18
                        }
                    }
                ]}/>
            </ThemeProvider>
          </div>
          <div className="cta">
          <button className="btn btn-primary pull-left" type="submit">
              {mode=='add' ? "Save" : "Update"}
          </button>
        </div>
</div> 
</form> || <ListDetails create={createRecord} edit={editRecord}/>}</>
  );
}

export default PerformanceForm;
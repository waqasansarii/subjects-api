import React, { useState, useEffect } from 'react'
import CustomizedTables from './table/table'
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const DataComp = () => {

    const classes = useStyles()
 
    // state to show  id and title 
    let [apiData, setApiData] = useState([])


  //state for display data in table according to id 
    let [tableData, settableData] = useState([])

    useEffect(() => {
        const showData = async () => {
            let res = await fetch('https://api.test.datacite.org/dois?query=prefix:10.5517')  
            let json = await res.json()   // data format convert into json
            let { data } = json           //destructure data 
            setApiData(data)              // data save in state 
        }
        showData()
    }, [])

    const handelKey = (e) => {
        let filter = apiData.filter((value) => value.id === e) // filter data 
        settableData(filter)   // filter data save in state
    }

    // loading status if api data is loading
    if (!apiData.length) {
        return (

            <div className={classes.root} >
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className='calender_container'>
            <div >
                {apiData.map((value) => {
                    return (
                        <div className='main_div' key={value.id} onClick={() => handelKey(value.id)}>
                            <p className='id'>ID : {value.id}</p>
                            {value.attributes.titles.map((val) => {
                                return (
                                    <div key={val.title}>

                                        <p className='title'>TiTle : {val.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className='div2'>
                {tableData.length ?
                    <CustomizedTables data={tableData} />
                    :
                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2em' }}>Please Select id </div>
                }

            </div>

        </div>
    )
}

export default DataComp
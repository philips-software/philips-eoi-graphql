import React from 'react';
import { Table } from 'reactstrap';
import './DisplayTable.css';
const DisplayTable = (props) => {
   return props.data && props.data.length > 0 ? 
   <div>
       <h3 className="table-heading">{`${props.data[0].__typename} Table`}</h3>
   <Table>
   <thead>
     <tr>
       <th>S. No.</th>
       { Object.keys(props.data[0]).map((d, index) => { 
           return <td key = {index}>{d}</td>
       }) }
     </tr>
   </thead>
   <tbody>
       {props.data.map((rowData, index) => {
           return <tr key = {rowData.id}>
                <th >{index + 1}</th>
                    { Object.values(props.data[index]).map((columnData, i) => { 
                        return <td key = {i}>{columnData}</td>
                    }) }
               </tr>
       })}
   </tbody>
 </Table>
 </div>: null
}

export default DisplayTable;
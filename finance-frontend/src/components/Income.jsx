import React, { useEffect, useState } from "react";
import axios from "axios";

function Income() {

const [income, setIncome] = useState([]);

const [source, setSource] = useState("");
const [amount, setAmount] = useState("");
const [frequency, setFrequency] = useState("");
const [income_date, setIncomeDate] = useState("");

const [editId, setEditId] = useState(null);
const [editDate, setEditDate] = useState("");
const [editSource, setEditSource] = useState("");
const [editFreq, setEditFreq] = useState("");
const [editAmt, setEditAmt] = useState("");

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  }
};

useEffect(()=>{
    fetchIncome();
},[]);

const fetchIncome = async ()=>{
    const res = await axios.get("http://127.0.0.1:8000/api/income",config);
    setIncome(res.data);
}

const addIncome = async (e) => {

e.preventDefault();

await axios.post("http://127.0.0.1:8000/api/income",{
    source:source,
    amount:amount,
    frequency:frequency,
    income_date:income_date
},config);


fetchIncome();
e.target.reset();
}

const deleteIncome = async (id) => {

await axios.delete(`http://127.0.0.1:8000/api/income/${id}`,config);

fetchIncome();

}

const updateIncome = async (e) => {

e.preventDefault();

await axios.put(`http://127.0.0.1:8000/api/income/${editId}`,{
    income_date: editDate,
    source: editSource,
    frequency: editFreq,
    amount: editAmt
},config);


fetchIncome();


}

const openEditModal = (item) => {

setEditId(item.id);
setEditDate(item.income_date);
setEditSource(item.source);
setEditFreq(item.frequency);
setEditAmt(item.amount);

}

return(
<div>
<form onSubmit={addIncome}>

<br/><h3>Add Income</h3><br/>

<div className="form-group">
<label htmlFor="incomeDt">
Received date <sup style={{color:"red"}}>*</sup>
</label>

<input
type="date"
className="form-control"
id="incomeDt"
onChange={(e)=>setIncomeDate(e.target.value)}
required
/>
</div>


<div className="form-group">
<label htmlFor="source">
Source <sup style={{color:"red"}}>*</sup>
</label>
<input
type="text"
className="form-control"
id="source"
onChange={(e)=>setSource(e.target.value)}
required
/>
</div>


<div className="form-group">
<label>
Frequency <sup style={{color:"red"}}>*</sup>
</label>

<select
className="form-control"
onChange={(e)=>setFrequency(e.target.value)}
required
>

<option value="">Select Frequency</option>
<option value="Yearly">Yearly</option>
<option value="Monthly">Monthly</option>
<option value="Weekly">Weekly</option>
<option value="One-time">One-time</option>

</select>

</div>


<div className="form-group">
<label htmlFor="amt">
Amount <sup style={{color:"red"}}>*</sup>
</label>

<input
type="text"
className="form-control"
id="amt"
onChange={(e)=>setAmount(e.target.value)}
required
/>

</div>

<br/>

<button type="submit" className="btn btn-success">
Add
</button>

</form>

<br /><br />
<table className="table table-bordered table-hover">
<thead>
<tr>
<th>Date</th>
<th>Source</th>
<th>Amount</th>
<th>Frequency</th>
<th>Action</th>

</tr>
</thead>

<tbody>
{income.map((item)=>(
<tr key={item.id}>
<td>{item.income_date}</td>
<td>{item.source}</td>
<td>{item.amount}</td>
<td>{item.frequency}</td>
<td>
<button 
className="btn btn-primary btn-sm"
data-bs-toggle="modal"
data-bs-target="#editModal"
onClick={()=>openEditModal(item)}
>
Edit
</button>&nbsp;
<button onClick={()=>deleteIncome(item.id)}>
Delete
</button>
</td>
</tr>
))}
</tbody>

</table>

<div className="modal fade" id="editModal">
<div className="modal-dialog">
<div className="modal-content">

<div className="modal-header">
<h5 className="modal-title">Edit Income</h5>
<button className="btn-close" data-bs-dismiss="modal"></button>
</div>

<div className="modal-body">

<form onSubmit={updateIncome}>

<div className="form-group mb-3">
<label>Received Date</label>
<input
type="date"
className="form-control"
value={editDate}
onChange={(e)=>setEditDate(e.target.value)}
/>
</div>

<div className="form-group mb-3">
<label>Source</label>
<input
type="text"
className="form-control"
value={editSource}
onChange={(e)=>setEditSource(e.target.value)}
/>
</div>

<div className="form-group mb-3">
<label>Frequency</label>
<select
className="form-control"
value={editFreq}
onChange={(e)=>setEditFreq(e.target.value)}
>
<option>Yearly</option>
<option>Monthly</option>
<option>Weekly</option>
<option>One-time</option>
</select>
</div>

<div className="form-group mb-3">
<label>Amount</label>
<input
type="text"
className="form-control"
value={editAmt}
onChange={(e)=>setEditAmt(e.target.value)}
/>
</div>

<button className="btn btn-success" data-bs-dismiss="modal">
Update
</button>

</form>

</div>

</div>
</div>
</div>

</div>
)

}

export default Income;
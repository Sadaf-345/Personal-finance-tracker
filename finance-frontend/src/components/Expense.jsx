import React, { useEffect, useState } from "react";
import axios from "axios";



function Expense() {

const [expense, setExpense] = useState([]);

const [category, setCategory] = useState("");
const [amount, setAmount] = useState("");
const [description, setDescription] = useState("");
const [expense_date, setExpenseDate] = useState("");

const [editId, setEditId] = useState(null);
const [editDate, setEditDate] = useState("");
const [editCategory, setEditCategory] = useState("");
const [editDescp, setEditDescp] = useState("");
const [editAmt, setEditAmt] = useState("");

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  }
};

useEffect(()=>{
    fetchExpense();
},[]);

const fetchExpense = async ()=>{
    const res = await axios.get("http://127.0.0.1:8000/api/expense",config);
    setExpense(res.data);
}

const addExpense = async (e) => {

e.preventDefault();

await axios.post("http://127.0.0.1:8000/api/expense",{
    category:category,
    amount:amount,
    description:description,
    expense_date:expense_date
},config);


fetchExpense();
e.target.reset();
}

const deleteExpense = async (id) => {

await axios.delete(`http://127.0.0.1:8000/api/expense/${id}`,config);

fetchExpense();

}

const updateExpense = async (e) => {

e.preventDefault();

await axios.put(`http://127.0.0.1:8000/api/expense/${editId}`,{
    expense_date: editDate,
    category: editCategory,
    description: editDescp,
    amount: editAmt
},config);


fetchExpense();


}

const openEditModal = (item) => {

setEditId(item.id);
setEditDate(item.expense_date);
setEditCategory(item.category);
setEditDescp(item.description);
setEditAmt(item.amount);

}

return(
<div>

<form onSubmit={addExpense}>

<br/><h3>Add Expense</h3><br/>

<div className="form-group">
<label htmlFor="expenseDt">
Expense date <sup style={{color:"red"}}>*</sup>
</label>

<input
type="date"
className="form-control"
id="expenseDt"
onChange={(e)=>setExpenseDate(e.target.value)}
required
/>
</div>



<div className="form-group">
<label>
Category <sup style={{color:"red"}}>*</sup>
</label>

<select
className="form-control"
onChange={(e)=>setCategory(e.target.value)}
required
>

<option value="">Select Category</option>
<option value="dining-out">Dining-out</option>
<option value="fee">Fee</option>
<option value="party">Party</option>
<option value="loan">Loan</option>

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

<div className="form-group">
<label htmlFor="description">
Description <sup style={{color:"red"}}>*</sup>
</label>
<input
type="text"
className="form-control"
id="description"
onChange={(e)=>setDescription(e.target.value)}
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
<th>Category</th>
<th>Amount</th>
<th>Description</th>
<th>Action</th>

</tr>
</thead>

<tbody>
{expense.map((item)=>(
<tr key={item.id}>
<td>{item.expense_date}</td>
<td>{item.category}</td>
<td>{item.amount}</td>
<td>{item.description}</td>
<td>
<button 
className="btn btn-primary btn-sm"
data-bs-toggle="modal"
data-bs-target="#editModal"
onClick={()=>openEditModal(item)}
>
Edit
</button>&nbsp;
<button onClick={()=>deleteExpense(item.id)}>
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
<h5 className="modal-title">Edit Expense</h5>
<button className="btn-close" data-bs-dismiss="modal"></button>
</div>

<div className="modal-body">

<form onSubmit={updateExpense}>

<div className="form-group mb-3">
<label>Expense Date</label>
<input
type="date"
className="form-control"
value={editDate}
onChange={(e)=>setEditDate(e.target.value)}
/>
</div>

<div className="form-group mb-3">
<label>Category</label>
<select
className="form-control"
value={editCategory}
onChange={(e)=>setEditCategory(e.target.value)}
>
<option value="dining-out">Dining-out</option>
<option value="fee">Fee</option>
<option value="party">Party</option>
<option value="loan">Loan</option>
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

<div className="form-group mb-3">
<label>Description</label>
<input
type="text"
className="form-control"
value={editDescp}
onChange={(e)=>setEditDescp(e.target.value)}
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

export default Expense;
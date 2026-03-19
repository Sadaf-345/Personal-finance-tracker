import React, { useEffect, useState } from "react";
import axios from "axios";

function Transaction()
{

const [transactions, setTransaction] = useState([]);

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  }
};

useEffect(()=>{
    fetchTransaction();
},[]);

const fetchTransaction = async ()=>{
    const res = await axios.get("http://127.0.0.1:8000/api/transactions",config);
    setTransaction(res.data);
}
return(
<div>
    <br /><br />
<table className="table table-bordered table-hover">
<thead>
<tr>
<th>Date</th>
<th>Type</th>
<th>Category</th>
<th>Amount</th>
</tr>
</thead>

<tbody>
{transactions.map((item)=>(
<tr key={item.id}>
<td>{item.tdate}</td>
<td>{item.ttype}</td>
<td>{item.category}</td>
<td>{item.amount}</td>
</tr>
))}
</tbody>

</table>
</div>
);

}

export default Transaction;
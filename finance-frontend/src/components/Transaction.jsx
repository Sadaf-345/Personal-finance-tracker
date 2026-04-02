import React, { useEffect, useState } from "react";
import axios from "axios";

function Transaction() {

  const [transactions, setTransaction] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/transactions", config);
    setTransaction(res.data);
  }

  const filteredTransactions = transactions.filter((item) =>
    item.category?.toLowerCase().includes(search.toLowerCase()) ||
    item.ttype?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <br /><h3>Transaction History</h3>
      <br /><br />

      <div className="mb-3">
        <input type="text" className="form-control" placeholder="search by category" value={search} onChange={(e) => setSearch(e.target.value)} />

      </div>

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
          {filteredTransactions.map((item) => (
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
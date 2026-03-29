import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    fetchIncome();
    fetchExpense();
  }, []);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });

  const fetchIncome = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/income", getConfig());
      setIncome(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Income fetch error:", error);
      setIncome([]);
    }
  };

  const fetchExpense = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/expense", getConfig());
      setExpense(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Expense fetch error:", error);
      setExpense([]);
    }
  };

  const filteredIncome = selectedMonth
  ? income.filter((item) => item.income_date?.startsWith(selectedMonth))
  : income;

const filteredExpense = selectedMonth
  ? expense.filter((item) => item.expense_date?.startsWith(selectedMonth))
  : expense;

  const totalIncome = filteredIncome.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const totalExpense = filteredExpense.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);
  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
    { name: "Balance", amount: balance },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Total Income</h5>
            <h3 className="text-success">₹ {totalIncome}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Total Expense</h5>
            <h3 className="text-danger">₹ {totalExpense}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Balance</h5>
            <h3 className={balance >= 0 ? "text-primary" : "text-danger"}>
              ₹ {balance}
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-4">
  <label className="form-label fw-bold">Filter by Month</label>
  <input
    type="month"
    className="form-control"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
  />
</div>

      <div className="card shadow p-4 mt-4">
        <h4 className="mb-3 text-center">Finance Overview</h4>

        <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="amount">
      <Cell fill="#198754" /> 
      <Cell fill="#dc3545" /> 
      <Cell fill="#0d6efd" /> 
    </Bar>
  </BarChart>
</ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
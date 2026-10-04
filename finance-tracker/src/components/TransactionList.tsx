import { useState, useEffect } from "react";
import { collection, 
  onSnapshot, 
  query, 
  orderBy, 
  where, doc, 
  deleteDoc, } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { FaReceipt, FaTrash } from "react-icons/fa6";
import Chart from "./Chart";
import categories from "../data/categories";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../components/TransactionList.css";

type Transaction = {
  id: string;
  title: string;
  category: string;
  type: "income" | "expense";
  amount: number | string;
};

function TransactionList({ transactions = [] }: { transactions?: Transaction[] }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    

    const filteredTransactions = transactions.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "income" && item.type ==="income") ||
        (filter === "expense" && item.type ==="expense");

      return matchesSearch && matchesFilter;
    });

const income = transactions
  .filter(t => t.type === "income")
  .reduce((total, t) => total + Number(t.amount), 0);

const expense = transactions
  .filter(t => t.type === "expense")
  .reduce((total, t) => total + Number(t.amount), 0);

  const balance = income - expense;

const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) {
    console.log(error);
  }
};

const getCategoryIcon = (categoryName) => {
  const found = categories.find((cat) => cat.value === categoryName);
  return found?.icon || null;
};

  return (
      <div className="transaction">
        <div className="transaction-header">
          <h2>Recent Transactions</h2>
          <div className="transaction-actions">
            <FaMagnifyingGlass className="search-icon"/>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div className="transaction-list">
          {filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <FaReceipt className="empty-icon"/>
              <p>No transactions found.</p>
            </div>
          ) : (
            filteredTransactions.map((item :any) => {
            const Icon = getCategoryIcon(item.category);

            return (
              <div
                key={item.id}
                className={`transaction-card ${item.type === "income" ? "income" : "expense"}`}>

                <div className="transaction-left">
                  {Icon && 
                  <div className="category-icon">
                    <Icon size={18} />
                  </div>}
                    <div>
                     <h4 className="transaction-title">
                        {item.title}</h4>
                      <p className="transaction-category">
                        {item.category}
                      </p>
                    </div>
                  </div>

                <div className="transaction-right">
                  <span className="amount">
                    {item.type === "income" ? "+" : "-"}
                    ${item.amount}
                  </span>

                  <button className="delete-btn"
                    onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default TransactionList;
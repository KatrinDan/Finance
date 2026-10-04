import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import {db, auth } from "../services/firebase.ts"
import CategorySelect from "./CategorySelect";
import "../components/AddTransaction.css";

type AddTransactionProps = {
  addTransaction: (transaction: {
    title: string;
    amount: number;
    category: string;
    type: string;
    uid: string;
  }) => void;
};

function AddTransaction({ addTransaction }: AddTransactionProps) {
    const [ title, setTitle ] = useState("");
    const [ amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("expense");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

        if (!title || !amount || !category) {
          alert("Please fill in all fields");
          return;
        }

        if (!auth.currentUser) {
          alert("User not authorized");
          return;
        }

        try{
          console.log({ title, amount, category, type,});
          const transaction = {
            title,
            amount:Number(amount),
            category,
            type,
            uid:auth.currentUser.uid,
            createdAt:serverTimestamp(),
          };
          await addDoc(collection(db, "transactions"), transaction);
          addTransaction({ title, amount: Number(amount), category, type, uid: auth.currentUser.uid });

          alert("Transaction added successfully!");

          setTitle("");
          setAmount("");
          setCategory("");
        } catch (error: unknown) {
          console.error(error);
          if (error instanceof Error) {
            alert(error.message);
            return;
          }
          alert("An unknown error occurred");
        }
      };

    return (
      <div>
        <form className="transaction-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

           < div className="type-switcher">
            <button
              type="button"
              className={`type-btn income-btn ${type === "income" ? "active" : ""}`}
              onClick={() => setType("income")}
            >
              Income
            </button>
            <button
              type="button"
              className={`type-btn expense-btn ${type === "expense" ? "active" : ""}`}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
          </div>

          <CategorySelect
            value={category}
            onChange={setCategory}
          />

          <button type="submit" className="submit-btn">
            Add Transaction
          </button>
        </form>
        
      </div>
    );
}
export default AddTransaction;



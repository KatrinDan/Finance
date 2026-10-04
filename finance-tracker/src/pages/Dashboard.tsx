import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import "./Dashboard.css";
import StateCards from "../components/StateCards";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Chart from "../components/Chart";
import { FaDollarSign, FaCalendar } from "react-icons/fa";

function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const addTransaction = (transaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    };
    const [transactions, setTransactions] = useState<{ id: string; type: string; [key: string]: any }[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        console.log("AUTH USER:", user);
        console.log("AUTH UID:", user?.uid);
        if (!user) {
            setTransactions([]);
            setLoading(false);
            navigate("/login", { replace: true });
            return;
        }
        console.log("QUERY UID:", user.uid);
        const q = query(
            collection(db, "transactions"),
            where("uid", "==", user.uid)
        );

    const unsubscribeTransactions = onSnapshot(q, (snapshot) => {
        console.log("SNAPSHOT SIZE:", snapshot.size);
        const data = snapshot.docs.map((doc) => {
            const transaction = doc.data();
            return {
                id: doc.id,
                ...transaction,
                type: transaction.type ||
                (Number(transaction.amount) >= 0 ? "income" : "expense")
            };
        });
        console.log("Transactions loaded:", data);
        setTransactions(data);
        setLoading(false);
    });
    return () => {
        unsubscribeTransactions();
    };
    });
    return unsubscribeAuth;
}, []);

const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});

const income = transactions
    .filter((t: any) => t.type === "income") 
    .reduce((sum, t: any) => sum + Number(t.amount), 0);

    const expense = transactions
    .filter((t: any) => t.type ==="expense") 
    .reduce((sum, t: any) => sum + (Number(t.amount)), 0);

    return (
        <div className="dashboard">
            <header 
            className="dashboard-header">
                <div className="header-left">
                    <div className="brand-icon"> {<FaDollarSign />}</div>
                    <h1>Welcome to Your Dashboard</h1>
                    <p>Manage your finances with confidence</p>
                </div>
                <div className="header-right">
                    <div className="current-date">
                        <span className="date-icon"> {<FaCalendar />}</span>
                        {today}
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

           {loading ? (
            <div className="loading">Loading transactions...</div>
            ) : (
             <StateCards transactions={transactions as never[]}/> )}

            <Chart income={income}
            expense={expense}/>

            <AddTransaction addTransaction={addTransaction} />

            <TransactionList transactions={transactions as never[]} />
        </div>
    );
}
export default Dashboard;
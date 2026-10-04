import React from "react";
import "./StateCards.css";

function StateCards({ transactions = [] }) {
    console.log( "StateCards transactions:", transactions);
    console.log(transactions.map((t:any) => (({
        title: t.title,
        type: t.type,
        amount: t.amount,
    }))));
    const income = transactions
        .filter((t:any) => t.type === "income")
        .reduce((sum, t:any) => sum + Number(t.amount), 0);

    const expense = transactions
        .filter((t:any) => t.type === "expense")
        .reduce((sum, t:any) => sum + Number(t.amount), 0);

    const balance = income - expense;

    return (
        <div className="stats-cards">
            <div className="stat-card">
                <h4>Balance</h4>
                <h2>${balance}</h2>
            </div>
            <div className="stat-card income">
                <h4>Income</h4>
                <h2>${income}</h2>
            </div>
            <div className="stat-card expense">
                <h4>Expenses</h4>
                <h2>${expense}</h2>
            </div>
        </div>
    );
}
export default StateCards;
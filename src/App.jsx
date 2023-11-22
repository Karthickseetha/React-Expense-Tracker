import { useState,useContext } from "react";

import {useExpensesContext} from './context/expenses.context'

const App = () => {

    const {transactions,addTransaction,deleteTransaction,
        income,expenses,balance} = useExpensesContext();

    // const [transaction,setTransaction]=useState('');

    // const [amount,setAmount]=useState('');

    const [item,setItem]=useState({
        transaction:'',
        amount:''
    })
    const {transaction,amount}=item;

    const changeHandler=(e)=>{
        const key=e.target.name;
        const value=e.target.value;

        console.log(`${key}`,`${value}`);

        setItem({...item, [key]:value});

    };

    const submitHandler =(e)=>{
        e.preventDefault();
        
        if(transaction && amount){
            
        const newTransaction = {
            id: Date.now(),
            transaction,
            amount:Number(amount),
        };
       
        addTransaction(newTransaction)

        setItem({
            transaction:'',
            amount:'',
        })

        }
    };
  return ( 
  <>
  <h1>Expense Tracker </h1>
    
    <div className="container">
        <h4>Your Balance</h4>
        <h2 id="balance">₹{balance}</h2>
    </div>
    <div className="inc-exp-container">
        <div className="money">
            <h4>Income</h4>
            <p 
            id="money-plus"
            className="money-plus">
        +{income}
        </p>
        </div>  
        <div className="money">
            <h4>Expenses</h4>
            <p 
            className="money-minus">
            {expenses}
        </p>
        </div>    
    </div>
    <h3>History</h3>


    <br />

   {transactions.length>0 && (
    
    <ul
     id="list"
     className="list">
        {transactions.map((item)=>{

            const {id,transaction,amount}=
            item;
            const transactionType = amount > 0 ? 'plus' : 'minus';
            return (

                <li 
                key={id}
                className={transactionType}
                >
            {transaction} <span>₹{amount}</span>
            <button
            className="delete-btn"
            onClick={()=>
                deleteTransaction(id)}
            >
                X
            </button>
        </li>
            )

        })}
        
    </ul>

   ) }


    <h3>Add New Transaction</h3>
    <form 
    onSubmit={submitHandler}
    action="#"
    id="form"
    >
    <div className="form-control">
        <label htmlFor="Transaction" >Transaction    
        </label>
        <input type="text"
        id="transaction"
        name="transaction"
        value={transaction}
        placeholder="Enter Transaction"
        onChange={changeHandler}

       />
    </div>
    <div className="form-control">
        <label htmlFor="amount" >
            Amount (negative - expense, positive - income)

        </label>
        <input 
        type="number"
        id="amout"
        name="amount"
        placeholder="Enter Amount..."
        value={amount}
        onChange={changeHandler}

       />
    </div>
    <button 
    className="btn"
    id="btn-submit"
    type="submit"
    >
        Add Transaction
    </button>
</form>
  </>
    
   );
}
 
export default App;
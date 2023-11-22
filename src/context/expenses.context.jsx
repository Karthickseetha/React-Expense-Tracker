import {  createContext,useContext,useState,useEffect} from "react";


const ExpensesContext = createContext();

const data=localStorage.getItem('transaction') 
? JSON.parse(localStorage.getItem('transactions')) 
: [];

const ExpensesContextProvider = ({children})=>{
    const [transactions,setTransactions] = 
    useState(data);
    const [balance,setBalance]=useState(0);
    const [expenses,setExpenses]=useState(0);
    const [income,setIncome]=useState(0);

    const updateTotals =()=>{
        const incomeVal = transactions.filter((transaction)=>
        transaction.amount>0)
        .map((transaction)=> transaction.amount)
        .reduce((curr,val)=> curr + val, 0);

        const expensesVal = transactions.filter((transaction)=>
        transaction.amount<0)
        .map((transaction)=> transaction.amount)
        .reduce((curr,val)=> curr + val, 0);

        const balanceVal =transactions
        .map((transaction)=> transaction.amount)
        .reduce((curr,val)=> curr + val, 0);

        setIncome(incomeVal);
        setExpenses(expensesVal);
        setBalance(balanceVal);
  
    };
    useEffect(()=>{
        updateTotals();
    },[transactions , updateTotals])

    useEffect(()=>{
        localStorage.setItem('transaction',JSON.stringify(transactions))

    },[transactions])

    const addTransaction = (transaction)=>{
        setTransactions([...transactions,transaction]);

    };
    const deleteTransaction = (id)=>{
        const updatedTransactions = transactions.filter((item)=> 
        item.id !== id);

        setTransactions(updatedTransactions);
    };


    const values ={
        transactions,
        balance,
        expenses,
        income,
        addTransaction,
        deleteTransaction,
    }

    return(
        <ExpensesContext.Provider value={values}>
            {children}
        </ExpensesContext.Provider>
    );

};

// Custom hook for context export

const useExpensesContext  =()=>{
    return useContext(ExpensesContext);
}


export {ExpensesContextProvider,useExpensesContext};
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

import {ExpensesContextProvider} from './context/expenses.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExpensesContextProvider>
    <App />
    </ExpensesContextProvider>
  </React.StrictMode>,
)

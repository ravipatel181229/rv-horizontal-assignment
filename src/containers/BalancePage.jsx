import React, { useContext, useEffect, useState } from 'react';
import ExpensesList from './../components/ExpensesList';
import RVDialog from './../components/Dialog';
import AddExpenseDialog from '../components/AddExpenseDialog';
import { GlobalContext } from '../context/GlobalState';

function BalancePage() {
    const [balance, setBalance] = useState(0) // For Balance 
    const [expenseTotal, setExpenseTotal] = useState(0) // For Expense
    const [showDialog, setShowDialog] = useState(false) // For Dialog
    const [updateItem, setUpdateItem] = useState() // For Edit Item Flag

    const { addTransaction, deleteTransaction, transactions, updateTransaction } = useContext(GlobalContext);

    /**
     * 
     * @param {*} item Item Passes from Expense Form / Amount Form 
     * @returns When Error occurs
     */
    const updateBalance = (itemToAdd) => {

        if (showDialog == "EXPENSE") {
            itemToAdd.amount = itemToAdd.amount * -1 // To covert to negative
        }


        if (updateItem) { // Updating item

            // Validation
            const afterUpdate = transactions.map((item, i) => {
                return itemToAdd.id === item.id ? itemToAdd : item
            })
            const afterUpdateBal = afterUpdate.reduce((acc, item) => (acc += Number(item.amount)), 0);
            if (afterUpdateBal < 0) {
                alert("Invalid Operation! This operation can be turned into negative balace.")
                return
            }
            // End of Validation

            updateTransaction(itemToAdd)
        }
        else {

            // Validation
            const afterUpdate = [...transactions, itemToAdd]
            const afterUpdateBal = afterUpdate.reduce((acc, item) => (acc += Number(item.amount)), 0);
            if (afterUpdateBal < 0) {
                alert("Invalid Operation! This operation can be turned into negative balace.")
                return
            }
            // End of Validation

            addTransaction(itemToAdd)
        }

        setShowDialog(false) // Closing dialog
    }

    /**
     * 
     * @param {*} index Enabling flag for expense updation
     */
    const updateHistory = (item) => {
        setUpdateItem(item)
        setShowDialog(item.amount > 0 ? "AMOUNT" : "EXPENSE")
    }

    /**
     * Deleting Balance Entry from list
     */
    const deleteHistory = () => {

        // Validation
        const afterUpdate = transactions.filter((item, i) => {
            return item.id !== updateItem.id
        })
        const afterUpdateBal = afterUpdate.reduce((acc, item) => (acc += Number(item.amount)), 0);
        if (afterUpdateBal < 0) {
            alert("Invalid Operation! This operation can be turned into negative balace.")
            return
        }
        // End of Validation

        deleteTransaction(updateItem.id)
        setShowDialog(false)
    }


    // Cleaing Edit item on close dialog
    useEffect(() => {
        if (!showDialog)
            setUpdateItem(null)
    }, [showDialog])

    // To Calculate Balance and Total Expense
    useEffect(() => {
        const totalBal = transactions.reduce((acc, item) => (acc += Number(item.amount)), 0);
        const totalExp = transactions.filter(item => item.amount < 0).reduce((acc, item) => (acc += Number(item.amount)), 0);
        setBalance(totalBal)
        setExpenseTotal(Math.abs(totalExp))
    }, [transactions]);


    return <>
        {
            showDialog &&
            <RVDialog onClose={() => { setShowDialog(false) }}
                element={
                    // showDialog == "AMOUNT"
                    //     ?
                    //     <AddBalanceDialog updateBalance={updateBalance} />
                    //     :
                    <AddExpenseDialog action={showDialog} updateBalance={updateBalance} item={updateItem} deleteHistory={deleteHistory} />
                }
            />
        }
        <div className='space-y-2'>
            <div className='border border-slate-400 grid grid-cols-2 divide-x-4 divide-slate-700 text-2xl mt-5 p-5'>
                <div className='flex flex-col text-center'>
                    <span>BALANCE</span>
                    <strong>${balance && balance.toFixed(2)}</strong>
                </div>
                <div className='flex flex-col text-center'>
                    <span>EXPENSE</span>
                    <strong>${expenseTotal && expenseTotal.toFixed(2)}</strong>
                </div>
            </div>
            <div className='md:flex gap-2 space-y-2 md:space-y-0'>
                <button type='button' className='rv-btn w-full' onClick={() => setShowDialog("AMOUNT")}>Add Amout</button>
                <button type='button' className='rv-btn w-full' onClick={() => setShowDialog("EXPENSE")} >Add Expense</button>
            </div>
        </div>
        <ExpensesList balanceHistory={transactions} updateHistory={updateHistory} />
    </>
}

export default BalancePage
import React from 'react';

function AddExpenseDialog({ updateBalance, item, deleteHistory, action }) {

    const submitForm = (e) => {
        e.preventDefault();
        const amount = Number(e.target[0].value)
        const desc = e.target[1].value
        const id = item ? item.id : Math.floor(Math.random() * 100000000)

        if (!amount || !desc) {
            if (isNaN(amount)) {
                alert("Please enter amount in numbers.")
                return
            }
            if (e.target[0].value == "0") {
                alert("Please enter Positive number as amount.")
                return
            }
            alert("Please enter required fields!!");
            return
        }

        updateBalance({ id, amount, desc })
    }

    console.log(item)

    return (
        <div>
            <h1 className='text-2xl text-center'>
                {action == "EXPENSE" ? "Expense" : "Amount"}
            </h1>
            <form action="" onSubmit={submitForm} className='flex flex-col gap-2 p-5'>
                <input type="number" name='amount' min={1} placeholder='Amount' defaultValue={item ? Math.abs(item.amount) : 0}
                    className='p-2 border border-slate-500' required />
                <input type="text" name='desc' placeholder='Desciption' defaultValue={item ? item.desc : ""}
                    className='p-2 border border-slate-500' required />
                {
                    item ?
                        <div className='md:grid grid-cols-2 gap-2 space-y-2 md:space-y-0'>
                            <button type='submit' className='rv-btn rv-btn-success w-full'  >Update Balance</button>
                            <button type='button' className='rv-btn rv-btn-danger w-full' onClick={() => deleteHistory()} >Delete Amount</button>
                        </div>
                        :
                        <input type="submit" className='rv-btn' />
                }
            </form>
        </div>
    )
}

export default AddExpenseDialog
import React from 'react';

function ExpensesList({ balanceHistory, updateHistory }) {

    return (
        <div className='flex-grow h-0 min-h-full overflow-y-auto'>
            <h1 className='text-2xl font-bold py-5'>Recent Transactions</h1>
            <ul className='rv-list'>
                {
                    (balanceHistory && balanceHistory.length > 0) &&
                    balanceHistory.map((item, index) => {
                        return <li key={index}
                            onClick={() => { updateHistory(item) }}
                            className={'rv-list-item ' + (item.amount > 0 ? " success-item" : " danger-item")}>
                            <span>
                                {
                                    item.amount > 0 ?
                                        <span className='text-green-700'>&#9650;</span> : <span className='text-orange-700'>&#9660;</span>
                                }
                                <span className='ml-2  text-wrap break-all'> {item.desc}</span>
                            </span>
                            <strong>$ {Math.abs(item.amount).toFixed(2)}</strong>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ExpensesList
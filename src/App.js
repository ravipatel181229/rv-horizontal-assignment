import './App.css';
import BalancePage from './containers/BalancePage';
import { TransactionProvider } from './context/GlobalState';

function App() {
  return (
    <div className="container md:m-auto flex flex-col gap-2 justify-start h-screen">
      <h1 className='text-3xl text-center p-5'>Expense Tracker</h1>
      <div className='lg:grid grid-cols-2 gap-5 h-full'>
        <TransactionProvider>
          <BalancePage />
        </TransactionProvider>
      </div>
    </div>
  );
}

export default App;

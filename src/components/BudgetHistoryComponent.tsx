interface BudgetHistoryProps {
    budgetHistory: { date: string; time: string; budget: number }[];
  }
  
  const BudgetHistoryComponent: React.FC<BudgetHistoryProps> = ({ budgetHistory }) => {
    return (
      <div className="budget-history">
        <h2>Budget History</h2>
        <ul>
          {budgetHistory.map((entry, index) => (
            <li key={index}>
              {entry.date} - {entry.time} - Budget: ${entry.budget}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BudgetHistoryComponent;
  
import React, { useState } from 'react';
import axios from 'axios';
import BudgetHistoryComponent from './components/BudgetHistoryComponent';
import BudgetInputComponent from './components/BudgetInputComponent';
import DailyHistoryReportComponent from './components/DailyHistoryReportComponent';
import './styles.css';

interface CostEntry {
  cost: number;
  time: string;
  budget_at_time: number;
  daily_total_after: number;
}

interface CostsGenerated {
  [date: string]: CostEntry[];
}

interface DailyReport {
  date: string;
  max_budget: number;
  total_cost: number;
}

interface BudgetReportResponse {
  costs_generated: CostsGenerated;
  daily_history_report: DailyReport[];
}

interface BudgetHistoryEntry {
  date: string;
  time: string;
  budget: number;
}

const App: React.FC = () => {
  const [budgetHistory, setBudgetHistory] = useState<BudgetHistoryEntry[]>([]);
  const [reportData, setReportData] = useState<BudgetReportResponse | null>(null);
  const [startDate, setStartDate] = useState('');
  const [period, setPeriod] = useState(1);

  const addBudgetChange = (date: string, time: string, newBudget: number) => {
    setBudgetHistory((prev) => [...prev, { date, time, budget: newBudget }]);
  };

  const fetchBudgetReport = async () => {
    try {
      const response = await axios.post<BudgetReportResponse>(
        'http://localhost:8741/api/budget-report',
        { budgetHistory, startDate, period },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching budget report:', error);
    }
  };

  return (
    <div className="container">
      <h1>AdWords Budget and Costs</h1>
      
      <section className="budget-input-section">
        <h2>Add a budget change</h2>
        <BudgetInputComponent addBudgetChange={addBudgetChange} />
        <BudgetHistoryComponent budgetHistory={budgetHistory} />
      </section>

      <section className="report-section">
        <h3>Select a date to start and a number of months for the report: </h3>
        <div className="report-form">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <label>
            Period (Months):
            <input
              type="number"
              min="1"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
            />
          </label>
        </div>

        <button 
          onClick={fetchBudgetReport}
          className="generate-report-btn"
        >
          Generate Budget Report
        </button>

        {reportData && (
          <>
            <DailyHistoryReportComponent 
              dailyCosts={reportData.daily_history_report}
              costsGenerated={reportData.costs_generated}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default App;
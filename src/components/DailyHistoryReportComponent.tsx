import React, { useState } from 'react';

interface CostEntry {
  cost: number;
  time: string;
  budget_at_time: number;
  daily_total_after: number;
}

interface CostsGenerated {
  [date: string]: CostEntry[];
}

interface DailyHistoryReportProps {
  dailyCosts: { date: string; max_budget: number; total_cost: number }[];
  costsGenerated: CostsGenerated;
}

const DailyHistoryReportComponent: React.FC<DailyHistoryReportProps> = ({ 
  dailyCosts,
  costsGenerated 
}) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const toggleDateDetails = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="daily-history-report">
      <h2>Daily History Report</h2>
      <table className="daily-report-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Max Budget</th>
            <th>Total Cost</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {dailyCosts.map((entry) => (
            <React.Fragment key={entry.date}>
              <tr className={expandedDate === entry.date ? 'expanded' : ''}>
                <td>{entry.date}</td>
                <td>${entry.max_budget.toFixed(2)}</td>
                <td>${entry.total_cost.toFixed(2)}</td>
                <td>
                  {costsGenerated[entry.date]?.length > 0 && (
                    <button
                      onClick={() => toggleDateDetails(entry.date)}
                      className="toggle-details-btn"
                    >
                      {expandedDate === entry.date ? 'Hide' : 'Show'} Details
                    </button>
                  )}
                </td>
              </tr>
              {expandedDate === entry.date && costsGenerated[entry.date]?.length > 0 && (
                <tr className="details-row">
                  <td colSpan={4}>
                    <table className="costs-details-table">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Cost</th>
                          <th>Budget at Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costsGenerated[entry.date].map((cost, index) => (
                          <tr key={`${entry.date}-${index}`}>
                            <td>{formatTime(cost.time)}</td>
                            <td>${cost.cost.toFixed(2)}</td>
                            <td>${cost.budget_at_time.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyHistoryReportComponent;
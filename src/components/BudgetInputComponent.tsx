import React, { useState } from 'react';

interface BudgetInputProps {
  addBudgetChange: (date: string, time: string, newBudget: number) => void;
}

const BudgetInputComponent: React.FC<BudgetInputProps> = ({ addBudgetChange }) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [budget, setBudget] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || budget < 0) {
      alert("Please enter valid inputs.");
      return;
    }
    addBudgetChange(date, time, budget);
    setDate('');
    setTime('');
    setBudget(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <label>Time</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <label>Budget</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        required
      />
      <button type="submit">Add Budget Change</button>
    </form>
  );
};

export default BudgetInputComponent;

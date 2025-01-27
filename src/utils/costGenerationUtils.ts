export const generateCostForDay = (budget: number) => {
    let dailyCost = 0;
    const maxCost = 2 * budget;
    const maxRandomUpdates = 10;
  
    for (let i = 0; i < maxRandomUpdates; i++) {
      if (dailyCost < maxCost) {
        let randomCost = Math.random() * (maxCost - dailyCost);
        dailyCost += randomCost;
      }
    }
  
    return dailyCost.toFixed(2);
  };
  
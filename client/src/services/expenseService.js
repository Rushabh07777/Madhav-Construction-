const EXPENSE_KEY = 'madhav_construction_expenses';

// બધા ખર્ચ મેળવો
export const getExpenses = () => {
  try {
    const data = localStorage.getItem(EXPENSE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

// ખર્ચ સેવ કરો
export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

// નવો ખર્ચ ઉમેરો
export const addExpense = (expenseData) => {
  const expenses = getExpenses();
  const newExpense = {
    id: Date.now().toString(),
    date: expenseData.date || new Date().toISOString().split('T')[0],
    description: expenseData.description,
    amount: parseFloat(expenseData.amount) || 0,
    category: expenseData.category || 'અન્ય',
    createdAt: new Date().toISOString()
  };
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
};

// ખર્ચ અપડેટ કરો
export const updateExpense = (id, updatedData) => {
  const expenses = getExpenses();
  const index = expenses.findIndex(expense => expense.id === id);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updatedData };
    saveExpenses(expenses);
    return expenses[index];
  }
  return null;
};

// ખર્ચ ડિલીટ કરો
export const deleteExpense = (id) => {
  const expenses = getExpenses();
  const filtered = expenses.filter(expense => expense.id !== id);
  saveExpenses(filtered);
  return filtered;
};

// દિવસ મુજબ ખર્ચ મેળવો
export const getExpensesByDate = (date) => {
  const expenses = getExpenses();
  return expenses.filter(expense => expense.date === date);
};

// આજનો ખર્ચ
export const getTodayExpenses = () => {
  const today = new Date().toISOString().split('T')[0];
  return getExpensesByDate(today);
};

// આજનો કુલ ખર્ચ
export const getTodayTotalExpense = () => {
  const todayExpenses = getTodayExpenses();
  return todayExpenses.reduce((total, expense) => total + expense.amount, 0);
};

// મહિનાનો કુલ ખર્ચ
export const getMonthlyTotalExpense = (month, year) => {
  const expenses = getExpenses();
  return expenses
    .filter(exp => {
      const date = new Date(exp.date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .reduce((total, exp) => total + exp.amount, 0);
};

// કેટેગરી મુજબ ખર્ચ
export const getExpensesByCategory = () => {
  const expenses = getExpenses();
  const categories = {};
  expenses.forEach(exp => {
    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
  });
  return categories;
};
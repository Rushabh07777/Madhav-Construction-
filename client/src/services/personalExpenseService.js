const PERSONAL_EXPENSE_KEY = 'madhav_personal_expenses';

// બધા ખર્ચ મેળવો
export const getPersonalExpenses = () => {
  try {
    const data = localStorage.getItem(PERSONAL_EXPENSE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading personal expenses:', error);
    return [];
  }
};

// ખર્ચ સેવ કરો
export const savePersonalExpenses = (expenses) => {
  try {
    localStorage.setItem(PERSONAL_EXPENSE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving personal expenses:', error);
  }
};

// નવો ખર્ચ ઉમેરો
export const addPersonalExpense = (expenseData) => {
  const expenses = getPersonalExpenses();
  const newExpense = {
    id: Date.now().toString(),
    date: expenseData.date || new Date().toISOString().split('T')[0],
    description: expenseData.description,
    amount: parseFloat(expenseData.amount) || 0,
    category: expenseData.category || 'અન્ય',
    paymentMode: expenseData.paymentMode || 'રોકડ',
    note: expenseData.note || '',
    createdAt: new Date().toISOString()
  };
  expenses.push(newExpense);
  savePersonalExpenses(expenses);
  return newExpense;
};

// ખર્ચ અપડેટ કરો
export const updatePersonalExpense = (id, updatedData) => {
  const expenses = getPersonalExpenses();
  const index = expenses.findIndex(expense => expense.id === id);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updatedData };
    savePersonalExpenses(expenses);
    return expenses[index];
  }
  return null;
};

// ખર્ચ ડિલીટ કરો
export const deletePersonalExpense = (id) => {
  const expenses = getPersonalExpenses();
  const filtered = expenses.filter(expense => expense.id !== id);
  savePersonalExpenses(filtered);
  return filtered;
};

// દિવસ મુજબ ખર્ચ મેળવો
export const getPersonalExpensesByDate = (date) => {
  const expenses = getPersonalExpenses();
  return expenses.filter(expense => expense.date === date);
};

// આજનો ખર્ચ
export const getTodayPersonalExpenses = () => {
  const today = new Date().toISOString().split('T')[0];
  return getPersonalExpensesByDate(today);
};

// આજનો કુલ ખર્ચ
export const getTodayTotalPersonalExpense = () => {
  const todayExpenses = getTodayPersonalExpenses();
  return todayExpenses.reduce((total, expense) => total + expense.amount, 0);
};

// અઠવાડિયાનો કુલ ખર્ચ
export const getWeeklyTotalPersonalExpense = () => {
  const expenses = getPersonalExpenses();
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  return expenses
    .filter(exp => {
      const expDate = new Date(exp.date);
      return expDate >= weekStart && expDate <= today;
    })
    .reduce((total, exp) => total + exp.amount, 0);
};

// મહિનાનો કુલ ખર્ચ
export const getMonthlyTotalPersonalExpense = (month, year) => {
  const expenses = getPersonalExpenses();
  return expenses
    .filter(exp => {
      const date = new Date(exp.date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .reduce((total, exp) => total + exp.amount, 0);
};

// કેટેગરી મુજબ ખર્ચ
export const getPersonalExpensesByCategory = () => {
  const expenses = getPersonalExpenses();
  const categories = {};
  expenses.forEach(exp => {
    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
  });
  return categories;
};
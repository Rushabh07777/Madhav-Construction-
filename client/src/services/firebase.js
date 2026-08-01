import { initializeApp } from "firebase/app";
import { 
  getDatabase, 
  ref, 
  set, 
  onValue, 
  remove, 
  update,
  push,
  child
} from "firebase/database";

// ===== 🔥 તમારો Firebase Config અહીં મૂકો =====
const firebaseConfig = {
  apiKey: "AIzaSyD...",  // ← તમારો API Key
  authDomain: "madhav-construction.firebaseapp.com",
  databaseURL: "https://madhav-construction-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "madhav-construction",
  storageBucket: "madhav-construction.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// =============================================
// 📌 DATABASE FUNCTIONS
// =============================================

// 1️⃣ બધો ડેટા સેવ કરો (Sync)
export const syncAllData = (labours, expenses, personalExpenses) => {
  set(ref(db, 'madhavData'), {
    labours: labours || [],
    expenses: expenses || [],
    personalExpenses: personalExpenses || []
  });
};

// 2️⃣ Real-time ડેટા મેળવો (Auto-update)
export const listenAllData = (callback) => {
  onValue(ref(db, 'madhavData'), (snapshot) => {
    const data = snapshot.val() || { 
      labours: [], 
      expenses: [], 
      personalExpenses: [] 
    };
    callback(data);
  });
};

// 3️⃣ લેબર ઉમેરો
export const addLabourToFirebase = (labour) => {
  const laboursRef = ref(db, 'madhavData/labours');
  onValue(laboursRef, (snapshot) => {
    const labours = snapshot.val() || [];
    labours.push(labour);
    set(laboursRef, labours);
  }, { onlyOnce: true });
};

// 4️⃣ લેબર ડિલીટ કરો
export const deleteLabourFromFirebase = (index) => {
  const labourRef = ref(db, `madhavData/labours/${index}`);
  remove(labourRef);
};

// 5️⃣ ખર્ચ ઉમેરો (Site Expense)
export const addExpenseToFirebase = (expense) => {
  const expensesRef = ref(db, 'madhavData/expenses');
  onValue(expensesRef, (snapshot) => {
    const expenses = snapshot.val() || [];
    expenses.push(expense);
    set(expensesRef, expenses);
  }, { onlyOnce: true });
};

// 6️⃣ ખર્ચ ડિલીટ કરો
export const deleteExpenseFromFirebase = (index) => {
  const expenseRef = ref(db, `madhavData/expenses/${index}`);
  remove(expenseRef);
};

// 7️⃣ Personal ખર્ચ ઉમેરો
export const addPersonalExpenseToFirebase = (expense) => {
  const personalRef = ref(db, 'madhavData/personalExpenses');
  onValue(personalRef, (snapshot) => {
    const expenses = snapshot.val() || [];
    expenses.push(expense);
    set(personalRef, expenses);
  }, { onlyOnce: true });
};

// 8️⃣ Personal ખર્ચ ડિલીટ કરો
export const deletePersonalExpenseFromFirebase = (index) => {
  const expenseRef = ref(db, `madhavData/personalExpenses/${index}`);
  remove(expenseRef);
};

// 9️⃣ બધો ડેટા રીસેટ કરો (જો જરૂર હોય તો)
export const resetAllData = () => {
  set(ref(db, 'madhavData'), {
    labours: [],
    expenses: [],
    personalExpenses: []
  });
};
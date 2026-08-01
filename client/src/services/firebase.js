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

// ===== 🔥 તમારો Firebase Config =====
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATkGW2da0VyRwKP2LuskJR194XqtzVGcc",
  authDomain: "madhav-construction-8bd91.firebaseapp.com",
  databaseURL: "https://madhav-construction-8bd91-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "madhav-construction-8bd91",
  storageBucket: "madhav-construction-8bd91.firebasestorage.app",
  messagingSenderId: "1081216319569",
  appId: "1:1081216319569:web:a869be2446cd81f2997870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
  const dataRef = ref(db, 'madhavData');
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val() || { 
      labours: [], 
      expenses: [], 
      personalExpenses: [] 
    };
    callback(data);
  }, (error) => {
    console.error("❌ Firebase Error:", error);
    callback({ labours: [], expenses: [], personalExpenses: [] });
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

// 4️⃣ લેબર ડિલીટ કરો (ID વડે)
export const deleteLabourFromFirebase = (id) => {
  const laboursRef = ref(db, 'madhavData/labours');
  onValue(laboursRef, (snapshot) => {
    const labours = snapshot.val() || [];
    const filtered = labours.filter(labour => labour.id !== id);
    set(laboursRef, filtered);
  }, { onlyOnce: true });
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

// 6️⃣ ખર્ચ ડિલીટ કરો (ID વડે)
export const deleteExpenseFromFirebase = (id) => {
  const expensesRef = ref(db, 'madhavData/expenses');
  onValue(expensesRef, (snapshot) => {
    const expenses = snapshot.val() || [];
    const filtered = expenses.filter(expense => expense.id !== id);
    set(expensesRef, filtered);
  }, { onlyOnce: true });
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

// 8️⃣ Personal ખર્ચ ડિલીટ કરો (ID વડે)
export const deletePersonalExpenseFromFirebase = (id) => {
  const personalRef = ref(db, 'madhavData/personalExpenses');
  onValue(personalRef, (snapshot) => {
    const expenses = snapshot.val() || [];
    const filtered = expenses.filter(expense => expense.id !== id);
    set(personalRef, filtered);
  }, { onlyOnce: true });
};

// 9️⃣ Database Check - ડેટા છે કે નહીં
export const checkDatabase = () => {
  const dataRef = ref(db, 'madhavData');
  onValue(dataRef, (snapshot) => {
    console.log("📦 Firebase Data:", snapshot.val());
  }, { onlyOnce: true });
};
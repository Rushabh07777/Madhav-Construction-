// ડેટા Export કરો (JSON)
export const exportData = () => {
  const labours = localStorage.getItem('madhav_construction_labours');
  const expenses = localStorage.getItem('madhav_construction_expenses');
  const personalExpenses = localStorage.getItem('madhav_personal_expenses');
  
  const allData = {
    labours: labours ? JSON.parse(labours) : [],
    expenses: expenses ? JSON.parse(expenses) : [],
    personalExpenses: personalExpenses ? JSON.parse(personalExpenses) : [],
    exportedAt: new Date().toISOString()
  };
  
  return JSON.stringify(allData, null, 2);
};

// ડેટા Import કરો
export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.labours) {
      localStorage.setItem('madhav_construction_labours', JSON.stringify(data.labours));
    }
    if (data.expenses) {
      localStorage.setItem('madhav_construction_expenses', JSON.stringify(data.expenses));
    }
    if (data.personalExpenses) {
      localStorage.setItem('madhav_personal_expenses', JSON.stringify(data.personalExpenses));
    }
    
    return true;
  } catch (error) {
    console.error('Import failed:', error);
    return false;
  }
};

// ડાઉનલોડ કરો (ફાઇલ તરીકે)
export const downloadBackup = () => {
  const data = exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `madhav_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// અપલોડ કરો (ફાઇલમાંથી)
export const uploadBackup = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const success = importData(event.target.result);
        resolve(success);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
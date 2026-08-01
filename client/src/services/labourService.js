const STORAGE_KEY = 'madhav_construction_labours';

// બધા લેબર મેળવો
export const getLabours = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading labours:', error);
    return [];
  }
};

// લેબર સેવ કરો
export const saveLabours = (labours) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(labours));
  } catch (error) {
    console.error('Error saving labours:', error);
  }
};

// નવો લેબર ઉમેરો
export const addLabour = (labourData) => {
  const labours = getLabours();
  const newLabour = {
    id: Date.now().toString(),
    name: labourData.name,
    dailyWage: parseFloat(labourData.dailyWage) || 0,
    attendance: labourData.attendance || [],
    totalAmount: 0,
    createdAt: new Date().toISOString()
  };
  labours.push(newLabour);
  saveLabours(labours);
  return newLabour;
};

// લેબર અપડેટ કરો
export const updateLabour = (id, updatedData) => {
  const labours = getLabours();
  const index = labours.findIndex(labour => labour.id === id);
  if (index !== -1) {
    labours[index] = { ...labours[index], ...updatedData };
    // totalAmount recalculate
    const attendanceCount = (labours[index].attendance || []).length;
    labours[index].totalAmount = attendanceCount * (labours[index].dailyWage || 0);
    saveLabours(labours);
    return labours[index];
  }
  return null;
};

// લેબર ડિલીટ કરો
export const deleteLabour = (id) => {
  const labours = getLabours();
  const filtered = labours.filter(labour => labour.id !== id);
  saveLabours(filtered);
  return filtered;
};

// આજની હાજરી ટૉગલ કરો
export const toggleAttendance = (id) => {
  const today = new Date().toISOString().split('T')[0];
  const labours = getLabours();
  const index = labours.findIndex(labour => labour.id === id);
  
  if (index !== -1) {
    const labour = labours[index];
    const attendance = labour.attendance || [];
    const isPresent = attendance.includes(today);
    
    const newAttendance = isPresent 
      ? attendance.filter(date => date !== today)
      : [...attendance, today];
    
    labours[index].attendance = newAttendance;
    labours[index].totalAmount = newAttendance.length * (labour.dailyWage || 0);
    saveLabours(labours);
    return labours[index];
  }
  return null;
};

// આજની હાજરીની ગણતરી
export const getTodayAttendance = () => {
  const today = new Date().toISOString().split('T')[0];
  const labours = getLabours();
  return labours.filter(labour => 
    (labour.attendance || []).includes(today)
  );
};

// આજનો કુલ હિસાબ
export const getTodayTotalAmount = () => {
  const todayLabours = getTodayAttendance();
  return todayLabours.reduce((total, labour) => total + (labour.dailyWage || 0), 0);
};
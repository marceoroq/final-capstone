const fetchAPI = async (date) => {
  // Try to use the global function provided by the script
  if (typeof window.fetchAPI === 'function') {
    return window.fetchAPI(date);
  }

  // Fallback if script fails to load
  console.warn('API function not available, using fallback');
  return [
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ];
};

const submitAPI = async (formData) => {
  // Try to use the global function provided by the script
  if (typeof window.submitAPI === 'function') {
    return window.submitAPI(formData);
  }

  // Fallback if script fails to load
  console.warn('API function not available, using fallback');
  return true;
};

export { fetchAPI, submitAPI };

// Simulate API endpoints with random failures
const simulateRandomFailure = () => Math.random() > 0.7; // 30% chance of failure

export const fetchAPI = async (date) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (simulateRandomFailure()) {
    throw new Error('Failed to fetch available times');
  }

  // Default available times
  return ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
};

export const submitAPI = async (formData) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (simulateRandomFailure()) {
    throw new Error('Failed to submit reservation');
  }

  return true;
};

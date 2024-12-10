import { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { fetchAPI, submitAPI } from '../api/bookingApi';
import ReservationForm from '../components/reservations/ReservationForm';
import ReservationDetails from '../components/reservations/ReservationDetails';
import restaurantImage from '../assets/restaurant.jpg';
import {
  reservationReducer,
  initialState,
  actionTypes,
} from '../reducers/reservationReducer';

const STORAGE_KEY = 'littleLemonReservation';

const occasions = [
  'None',
  'Birthday',
  'Anniversary',
  'Engagement',
  'Business Dinner',
];

const Reservations = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, dispatch] = useReducer(reservationReducer, initialState);
  const [hasExistingReservation, setHasExistingReservation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load reservation from localStorage
  useEffect(() => {
    const savedReservation = localStorage.getItem(STORAGE_KEY);
    if (savedReservation) {
      dispatch({
        type: actionTypes.LOAD_RESERVATION,
        reservation: JSON.parse(savedReservation),
      });
      setHasExistingReservation(true);
    }
  }, []);

  // Initialize available times for current date
  useEffect(() => {
    const initializeTimes = async () => {
      const today = new Date().toISOString().split('T')[0];
      const times = await fetchAPI(today);
      setAvailableTimes(times);
    };

    initializeTimes();
  }, []);

  // Update available times when date changes
  const updateTimes = async (date) => {
    const times = await fetchAPI(date);
    setAvailableTimes(times);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: actionTypes.UPDATE_FIELD,
      field: name,
      value,
    });

    // Update available times if date changes
    if (name === 'date') {
      updateTimes(value);
    }

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    // Validate date
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else if (new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = 'Date cannot be in the past';
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    // Validate number of guests
    const guests = parseInt(formData.guests);
    if (!formData.guests || guests < 1) {
      newErrors.guests = 'At least 1 guest is required';
    } else if (guests > 10) {
      newErrors.guests = 'Maximum 10 guests allowed';
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name is too short';
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    const savedReservation = localStorage.getItem(STORAGE_KEY);
    if (savedReservation) {
      dispatch({
        type: actionTypes.LOAD_RESERVATION,
        reservation: JSON.parse(savedReservation),
      });
    }
    setIsEditing(false);
  };

  const handleCancelReservation = () => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      localStorage.removeItem(STORAGE_KEY);
      dispatch({ type: actionTypes.CLEAR_RESERVATION });
      setHasExistingReservation(false);
      showToast('Your reservation has been cancelled.', 'success');
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const success = await submitAPI(formData);

      if (!success) {
        throw new Error('Failed to submit reservation');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setHasExistingReservation(true);
      setIsEditing(false);

      showToast(
        isEditing
          ? 'Your reservation has been updated successfully!'
          : 'Your reservation has been confirmed!',
        'success'
      );

      window.scrollTo(0, 0);
      navigate('/');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      showToast(
        'Unable to process your reservation at this time. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasExistingReservation && !isEditing) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ReservationDetails
          formData={formData}
          onEdit={handleEdit}
          onCancel={handleCancelReservation}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1
        className="mb-8 text-center text-3xl font-bold"
        data-testid="main-heading"
      >
        {isEditing ? 'Edit Reservation' : 'Reserve a Table'}
      </h1>

      <div className="mx-auto mb-8 max-w-2xl overflow-hidden rounded-t-lg">
        <img
          src={restaurantImage}
          alt="Restaurant interior"
          className="h-64 w-full object-cover"
        />
      </div>

      <ReservationForm
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
        availableTimes={availableTimes}
        occasions={occasions}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Reservations;

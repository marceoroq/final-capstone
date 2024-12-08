export const initialState = {
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  seating: 'indoor',
  name: '',
  email: '',
  phone: '',
  specialRequests: '',
};

export const actionTypes = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  RESET_FORM: 'RESET_FORM',
  LOAD_RESERVATION: 'LOAD_RESERVATION',
  CLEAR_RESERVATION: 'CLEAR_RESERVATION',
};

export const reservationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case actionTypes.RESET_FORM:
      return initialState;
    case actionTypes.LOAD_RESERVATION:
      return action.reservation;
    case actionTypes.CLEAR_RESERVATION:
      return initialState;
    default:
      return state;
  }
};

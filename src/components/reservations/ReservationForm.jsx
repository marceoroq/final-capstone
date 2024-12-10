import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';

const ReservationForm = ({
  formData,
  errors,
  isSubmitting,
  isEditing,
  availableTimes,
  occasions,
  onSubmit,
  onChange,
  onCancel,
}) => {
  return (
    <form
      className="font-secondary mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg"
      onSubmit={onSubmit}
    >
      <h2 className="font-primary mb-8 text-center text-3xl font-bold">
        {isEditing ? 'Edit Reservation' : 'Reserve a Table'}
      </h2>
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <FormInput
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={onChange}
          error={errors.date}
          required
          min={new Date().toISOString().split('T')[0]}
        />

        <FormSelect
          label="Time"
          name="time"
          value={formData.time}
          onChange={onChange}
          options={availableTimes}
          error={errors.time}
          required
        />

        <FormInput
          label="Number of guests"
          name="guests"
          type="number"
          value={formData.guests}
          onChange={onChange}
          error={errors.guests}
          required
          min="1"
          max="10"
        />

        <FormSelect
          label="Occasion"
          name="occasion"
          value={formData.occasion}
          onChange={onChange}
          options={occasions}
        />

        {/* Seating preferences */}
        <div>
          <label className="mb-2 block font-bold text-gray-700">Seating</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="seating"
                value="indoor"
                checked={formData.seating === 'indoor'}
                onChange={onChange}
                className="mr-2"
              />
              Indoor
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="seating"
                value="outdoor"
                checked={formData.seating === 'outdoor'}
                onChange={onChange}
                className="mr-2"
              />
              Outdoor
            </label>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold text-gray-700">
          Contact Information
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            error={errors.name}
            required
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
            required
          />

          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            error={errors.phone}
            required
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Special Requests */}
      <div className="mb-8">
        <label className="mb-2 block font-bold text-gray-700">
          Special Requests
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={onChange}
          rows="3"
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#495E57] focus:outline-none"
          placeholder="Any allergies, dietary restrictions, or special occasions?"
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-[#495E57] px-6 py-3 font-bold text-white transition-all hover:bg-[#3e504a] disabled:bg-gray-400"
        >
          {isSubmitting
            ? 'Processing...'
            : isEditing
              ? 'Update Reservation'
              : 'Confirm Reservation'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-red-500 px-6 py-3 font-bold text-red-500 transition-all hover:bg-red-50"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Demo Disclaimer */}
      <div className="mt-8 rounded-lg bg-gray-50 p-4 text-xs text-gray-500">
        <p className="text-center">
          <span className="font-bold">Demo Features:</span>
          <br />
          • Reservations are stored in browser&apos;s local storage
          <br />
          • API calls are simulated with a 30% chance of failure
          <br />• Success/Error notifications demonstrate the toast system
        </p>
      </div>
    </form>
  );
};

export default ReservationForm;

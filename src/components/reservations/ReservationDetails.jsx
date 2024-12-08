import restaurantImage from '../../assets/restaurant.jpg';

const ReservationDetails = ({ formData, onEdit, onCancel }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Your Current Reservation
      </h1>

      <div className="overflow-hidden rounded-t-lg">
        <img
          src={restaurantImage}
          alt="Restaurant interior"
          className="h-64 w-full object-cover"
        />
      </div>

      <div className="rounded-b-lg bg-white p-6 shadow-lg">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-bold text-gray-700">Date & Time</h3>
            <p className="text-gray-600">
              {new Date(formData.date).toLocaleDateString()} at {formData.time}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-bold text-gray-700">Party Size</h3>
            <p className="text-gray-600">{formData.guests} guests</p>
          </div>

          <div>
            <h3 className="mb-2 font-bold text-gray-700">Occasion</h3>
            <p className="text-gray-600">
              {formData.occasion || 'No special occasion'}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-bold text-gray-700">Seating Preference</h3>
            <p className="text-gray-600">
              {formData.seating.charAt(0).toUpperCase() +
                formData.seating.slice(1)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-700">
            Contact Information
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-bold text-gray-700">Name</p>
              <p className="text-gray-600">{formData.name}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Email</p>
              <p className="text-gray-600">{formData.email}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Phone</p>
              <p className="text-gray-600">{formData.phone}</p>
            </div>
          </div>
        </div>

        {formData.specialRequests && (
          <div className="mb-8">
            <h3 className="mb-2 font-bold text-gray-700">Special Requests</h3>
            <p className="text-gray-600">{formData.specialRequests}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="flex-1 rounded-lg bg-[#495E57] px-6 py-3 font-bold text-white transition-all hover:bg-[#3e504a]"
          >
            Edit Reservation
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-red-500 px-6 py-3 font-bold text-red-500 transition-all hover:bg-red-50"
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;

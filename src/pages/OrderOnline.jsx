const OrderOnline = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-center text-3xl font-bold">Order Online</h1>

      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600">
            Choose your favorite dishes from our menu and have them delivered
            straight to your door.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-[#495E57] p-6 text-white">
            <h2 className="mb-4 text-xl font-bold">Delivery Hours</h2>
            <ul className="space-y-2">
              <li>Monday - Thursday: 5:30 PM - 9:30 PM</li>
              <li>Friday - Saturday: 5:30 PM - 10:30 PM</li>
              <li>Sunday: 5:30 PM - 8:30 PM</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-bold text-[#495E57]">
              Delivery Information
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Free delivery within 3 miles</li>
              <li>• $5 delivery fee for 3-5 miles</li>
              <li>• Minimum order: $20</li>
              <li>• Average delivery time: 30-45 minutes</li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-[#F4CE14] px-8 py-3 font-bold text-black transition-transform hover:scale-105"
            >
              Order Now on UberEats
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOnline;

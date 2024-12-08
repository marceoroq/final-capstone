const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">About Little Lemon</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#495E57]">Our Story</h2>
          <p className="text-gray-600">
            Little Lemon is a charming Mediterranean restaurant that brings the
            flavors of the Mediterranean coast to Chicago. Founded by two
            brothers with a passion for authentic cuisine, we've been serving
            our community since 2012.
          </p>

          <h2 className="text-xl font-bold text-[#495E57]">Our Philosophy</h2>
          <p className="text-gray-600">
            We believe in using the freshest ingredients and traditional cooking
            methods while adding our own modern twist to create unique and
            memorable dining experiences.
          </p>

          <h2 className="text-xl font-bold text-[#495E57]">Our Promise</h2>
          <p className="text-gray-600">
            Every dish that leaves our kitchen is prepared with care, attention
            to detail, and a commitment to authentic Mediterranean flavors.
          </p>
        </div>

        <div className="space-y-4 rounded-lg bg-[#495E57] p-6 text-white">
          <h2 className="text-xl font-bold">Restaurant Hours</h2>
          <ul className="space-y-2">
            <li>Monday - Thursday: 5:00 PM - 10:00 PM</li>
            <li>Friday - Saturday: 5:00 PM - 11:00 PM</li>
            <li>Sunday: 5:00 PM - 9:00 PM</li>
          </ul>

          <h2 className="mt-6 text-xl font-bold">Location</h2>
          <p>123 Town Street</p>
          <p>Chicago, Illinois</p>
        </div>
      </div>
    </div>
  );
};

export default About;

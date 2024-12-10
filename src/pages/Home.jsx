import { Link } from 'react-router-dom';
import greekSalad from '../assets/greek-salad.jpg';
import bruschetta from '../assets/bruchetta.svg';
import lemonDessert from '../assets/lemon-dessert.jpg';
import restaurantChefB from '../assets/restaurant-chef-B.jpg';

const specialItems = [
  {
    title: 'Greek salad',
    price: '12.99',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: greekSalad,
  },
  {
    title: 'Bruschetta',
    price: '5.99',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: bruschetta,
  },
  {
    title: 'Lemon Dessert',
    price: '5.00',
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: lemonDessert,
  },
];

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(9, 9, 9, 0.8), rgba(73, 94, 87, 0.8)), url(${restaurantChefB})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-xl text-white">
            <h1 className="font-primary text-6xl font-bold text-[#F4CE14]">
              Little Lemon
            </h1>
            <h2 className="font-primary text-4xl">Chicago</h2>
            <p className="mb-8 max-w-md text-white">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </p>
            <Link
              to="/reservations"
              className="w-fit rounded-lg bg-[#F4CE14] px-6 py-2 font-bold text-black transition-transform hover:scale-105"
            >
              Reserve a table
            </Link>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-primary text-3xl font-bold">
            This weeks specials!
          </h2>
          <Link
            to="/menu"
            className="rounded-lg bg-[#F4CE14] px-6 py-2 font-bold text-black transition-transform hover:scale-105"
          >
            Online Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {specialItems.map((item) => (
            <article
              key={item.title}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-grow flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className="text-orange-500">${item.price}</span>
                </div>
                <p className="mb-4 text-gray-600">{item.description}</p>
                <div className="mt-auto flex justify-end">
                  <Link
                    to="/order-online"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#495E57] px-6 py-2 font-bold text-white transition-transform hover:scale-105"
                  >
                    Order a delivery
                    <span>🛵</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

const menuItems = [
  {
    category: 'Starters',
    items: [
      {
        name: 'Greek Salad',
        price: '12.99',
        description:
          'Fresh vegetables, feta cheese, olives, and our house dressing',
        image:
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format',
      },
      {
        name: 'Bruschetta',
        price: '5.99',
        description: 'Grilled bread with garlic, tomatoes, and olive oil',
        image:
          'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&auto=format',
      },
      {
        name: 'Hummus Plate',
        price: '8.99',
        description: 'Classic hummus served with warm pita bread',
        image:
          'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=500&auto=format',
      },
    ],
  },
  {
    category: 'Main Courses',
    items: [
      {
        name: 'Grilled Salmon',
        price: '24.99',
        description: 'Fresh salmon with Mediterranean herbs and lemon',
        image:
          'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500&auto=format',
      },
      {
        name: 'Lamb Kebab',
        price: '22.99',
        description: 'Marinated lamb skewers with rice and vegetables',
        image:
          'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format',
      },
      {
        name: 'Moussaka',
        price: '18.99',
        description:
          'Traditional Greek casserole with layers of eggplant and meat',
        image:
          'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=500&auto=format',
      },
    ],
  },
  {
    category: 'Desserts',
    items: [
      {
        name: 'Lemon Dessert',
        price: '5.00',
        description: 'Traditional family recipe with a modern twist',
        image:
          'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=500&auto=format',
      },
      {
        name: 'Baklava',
        price: '6.99',
        description: 'Sweet pastry made of layers of filo with chopped nuts',
        image:
          'https://images.unsplash.com/photo-1599321955726-e048426594af?w=500&auto=format',
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-12 text-center text-3xl font-bold">Our Menu</h1>

      <div className="space-y-12">
        {menuItems.map((section) => (
          <div key={section.category}>
            <h2 className="mb-6 text-2xl font-bold text-[#495E57]">
              {section.category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <div className="h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="text-orange-500">${item.price}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

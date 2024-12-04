import logo from '../assets/logo.jpg';

const Navbar = (props) => {
  return (
    <nav
      className="container mx-auto flex items-center justify-between font-mono"
      {...props}
    >
      <div>
        <img src={logo} alt="logo little lemon" width={200} />
      </div>
      <div>
        <ul className="flex gap-5">
          <li>
            <a
              className="relative hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:h-[3px] hover:after:w-full hover:after:bg-red-500 hover:after:content-['']"
              href=""
            >
              Home
            </a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Menu</a>
          </li>
          <li>
            <a href="">Reservations</a>
          </li>
          <li>
            <a href="">Order Online</a>
          </li>
          <li>
            <a href="">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

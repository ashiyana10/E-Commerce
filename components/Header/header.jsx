export function Header() {
  return (
    <section>
      <div className="d-flex justify-content-between py-4">
        <div className="d-flex align-items-center">
          <p className="font-purple font-22px fw-bold mb-0">HOMELY</p>
        </div>
        <div className="d-flex">
          <nav className="navbar navbar-expand-lg navbar-light py-0">
            <div className="navbar-nav flex-row">
              <a className="nav-item nav-link text-black" href="#">
                Home
              </a>
              <a className="nav-item nav-link text-black" href="#">
                About
              </a>
              <a className="nav-item nav-link text-black" href="#">
                Shop
              </a>
              <a className="nav-item nav-link text-black" href="#">
                Contact
              </a>
              <a className="nav-item nav-link text-black" href="#">
                <img src="Images/cart.svg" alt="Cart" />
              </a>
              <a className="nav-item nav-link text-black pt-1 pe-0" href="#">
                <div className="border rounded-circle p-1 d-flex align-items-center">
                  <img
                    src="Images/user-icon.svg"
                    className="user-icon"
                    alt="User Image"
                  />
                </div>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

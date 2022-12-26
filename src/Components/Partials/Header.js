function Header() {
  return (
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/user/appointments">
                Appointments
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/user/prescriptions">
                Prescriptions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

function Header() {
  return (
    <header style={{ backgroundColor: '#2563eb', color: 'white', padding: '1rem' }}>
      <h1>My React App</h1>
      <nav>
        <a href="#" style={{ color: 'white', marginRight: '1rem' }}>Home</a>
        <a href="#" style={{ color: 'white', marginRight: '1rem' }}>About</a>
        <a href="#" style={{ color: 'white' }}>Contact</a>
      </nav>
    </header>
  );
}

export default Header;

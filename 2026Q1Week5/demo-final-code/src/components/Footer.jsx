function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '1rem', textAlign: 'center' }}>
      <p>&copy; {year} INFO 340. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

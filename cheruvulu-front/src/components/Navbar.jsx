function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Cheruvulu</h2>

      <div style={styles.links}>
        <a href="#">Farmers</a>
        {/* <a href="#">About</a>
        <a href="#">Contact</a> */}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;
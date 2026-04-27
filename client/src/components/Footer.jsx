const Footer = () => {
  return (
    <footer style={{
      textAlign: "center",
      padding: "2rem",
      marginTop: "4rem",
      borderTop: "1px solid #eee",
      color: "#888",
      fontSize: "0.9rem",
      fontFamily: "sans-serif"
    }}>
      <p>Built with ❤️ by <strong style={{ color: "#6c63ff" }}>Shruti</strong></p>
      <p style={{ marginTop: "0.4rem" }}>
        <a href="https://github.com/shrutisachan08" target="_blank" style={{ color: "#6c63ff", textDecoration: "none" }}>
          GitHub
        </a>
        {" · "}
        <a href="https://linkedin.com" target="_blank" style={{ color: "#6c63ff", textDecoration: "none" }}>
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
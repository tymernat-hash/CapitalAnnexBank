export default function Dashboard() {
  const name = localStorage.getItem("user_name") || "Customer";

  return (
    <section className="section">
      <div className="container">
        <h2>Welcome {name}</h2>

        <p style={{ color: "red", fontWeight: 700 }}>
          Your account has been deactivated due to inactivity.
        </p>

        <div className="card">
          <h3>Account Balance</h3>
          <p style={{ fontSize: 28, fontWeight: 700 }}>£3,800,000.00</p>
        </div>
      </div>
    </section>
  );
}

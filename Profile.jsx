export default function Profile() {
  const name  = localStorage.getItem("user_name")  || "Customer";
  const email = localStorage.getItem("user_email") || "Not set";

  return (
    <section className="section">
      <div className="container card">
        <h2>My Profile</h2>

        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </section>
  );
}

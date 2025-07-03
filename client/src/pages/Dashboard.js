import React, { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile using JWT
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Mindly, {user.name}!</h1>
      <p>This is your dashboard. More features coming soon.</p>
      {/* Add more Mindly content here */}
    </div>
  );
}

export default Dashboard;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State cho form
  const [form, setForm] = useState({
    title: "",
    type: "Full-Time",
    description: "",
    companyName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch job data khi mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();

        setForm({
          title: data.title || "",
          type: data.type || "Full-Time",
          description: data.description || "",
          companyName: data.company?.name || "",
          contactEmail: data.company?.contactEmail || "",
          contactPhone: data.company?.contactPhone || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          type: form.type,
          description: form.description,
          company: {
            name: form.companyName,
            contactEmail: form.contactEmail,
            contactPhone: form.contactPhone,
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to update job");
      navigate(`/jobs/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Job Type:</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          required
        />

        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
          required
        />

        <label>Contact Phone:</label>
        <input
          type="tel"
          name="contactPhone"
          value={form.contactPhone}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;

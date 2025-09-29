import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddJobPage = () => {
  const [forrmData, setFormData] = useState({
    title: "",
    type: "Full-Time",
    description: "",
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...forrmData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(forrmData);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: forrmData.title,
          type: forrmData.type,
          description: forrmData.description,
          company: {
            name: forrmData.name,
            contactEmail: forrmData.email,
            contactPhone: forrmData.phone,
          },
        }),
      });
      const data = await res.json();
      navigate("/");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          name="title"
          value={forrmData.title}
          onChange={handleChange}
        />
        <label>Job type:</label>
        <select name="type" value={forrmData.type} onChange={handleChange}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          name="description"
          value={forrmData.description}
          onChange={handleChange}
        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          name="name"
          value={forrmData.name}
          onChange={handleChange}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          name="email"
          value={forrmData.email}
          onChange={handleChange}
        />
        <label>Contact Phone:</label>
        <input
          type="tel"
          required
          name="phone"
          value={forrmData.phone}
          onChange={handleChange}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;

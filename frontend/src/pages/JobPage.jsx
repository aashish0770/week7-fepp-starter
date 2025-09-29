import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteJob = async (jobId) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      navigate("/");
    } catch (err) {
      console.error("Error deleting job:", err);
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const ok = window.confirm("Are you sure you want to delete this listing? " + jobId);
    if (!ok) return;
    deleteJob(jobId);
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: "crimson" }}>{error}</p>;
  if (!job)    return <p>Not found</p>;

  const jobId = job.id || job._id; 

  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p><b>Type:</b> {job.type}</p>
      <p><b>Description:</b> {job.description}</p>

      {job.company && (
        <>
          <p><b>Company:</b> {job.company.name}</p>
          <p><b>Email:</b> {job.company.contactEmail}</p>
          <p><b>Phone:</b> {job.company.contactPhone}</p>
        </>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => onDeleteClick(jobId)}>Delete</button>
        <button onClick={() => navigate(`/edit-job/${jobId}`)}>Edit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default JobPage;

import JobListing from "./JobListing";

const JobListings = ({ jobs }) => {
  console.log("jobs", jobs);
  return (
    <div className="job-listings">
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;

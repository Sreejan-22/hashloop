import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedSelector, fetchSavedProjects } from "../../slices/saved.slice";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Saved.css";
import { CircularProgress } from "@mui/material";

const Saved = () => {
  const dispatch = useDispatch();
  const { savedProjects, loading } = useSelector(savedSelector);

  useEffect(() => {
    dispatch(fetchSavedProjects());
  }, [dispatch]);

  return (
    <Layout>
      <PageHeader text="Saved" />
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="feed-content">
          <>
            {savedProjects.length ? (
              savedProjects.map((item) => (
                <Project key={item._id} project={item.projectId} />
              ))
            ) : (
              <h3 style={{ marginTop: "2rem", textAlign: "center" }}>
                You haven't bookmarked anything on Hashloop yet!
              </h3>
            )}
          </>
        </div>
      )}
      <ToastContainer />
    </Layout>
  );
};

export default Saved;

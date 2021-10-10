import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./Saved.css";

const Saved = () => {
  return (
    <Layout>
      <PageHeader text="Saved" />
      <div className="feed-content">
        <>
          {[1, 2].map((item) => (
            <Project />
          ))}
        </>
      </div>
    </Layout>
  );
};

export default Saved;

import ReactLoading from "react-loading";

function PageLoader() {
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ReactLoading type="spokes" color="#C0C0C0" height={100} width={100} />
    </div>
  );
}

export default PageLoader;

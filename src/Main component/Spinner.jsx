import SpinnerGif from "../assets/Spinner.gif";
const Spinner = () => {
  return (
    <>
      <img
        src={SpinnerGif}
        style={{
          borderRadius: "7px",
          marginLeft: "640px",
          marginTop: "180px ",
        }}
        alt="spinner"
      />
    </>
  );
};

export default Spinner;
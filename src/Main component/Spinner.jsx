import SpinnerGif from "../assets/Spinner.gif";
const Spinner = () => {
  return (
    <>
      <img
        src={SpinnerGif}
        style={{
          borderRadius: "7px",
          marginLeft: "430px",
          marginTop: "150px ",
        }}
        alt="spinner"
      />
    </>
  );
};

export default Spinner;
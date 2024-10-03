const BackgroundQuiz = ({children}) => {
  return (
    <>
      <div class="wrapper">
        <iframe
          src="https://skybox.blockadelabs.com/e/1be88f0476b368d70b885f68cb138a84"
          style={{ width: "100%", height: "100vh", position: "relative" }}
        ></iframe>
          {children}
        <div class="hide-cursor"></div>
      </div>
      <div></div>
    </>
  );
};

export default BackgroundQuiz;

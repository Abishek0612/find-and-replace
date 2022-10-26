const Modal = (props) => {
    const modal = React.useMemo(() => {
      return (
        <div
         className="ModalWrapper"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              position: "absolute",
              top: "0px",
              left: "0px",
              zIndex: "-1",
            }}
            onClick={props.onClose}
          ></div>
  
          {props.children}
        </div>
      );
    }, []);
  
    return ReactDOM.createPortal(modal, document.body);
  };
  
  const FindAndReplaceButton = () => {
    const [showModal, setShowModal] = React.useState(false);
  
    const openModal = React.useCallback(() => {
      setShowModal(true);
    }, []);
  
    const closeModal = React.useCallback(() => {
      setShowModal(false);
    }, []);
  
    return (
      <React.Fragment>
        <button onClick={openModal}>Find and Replace</button>
        {showModal && (
          <Modal onClose={closeModal}>
            <FindAndReplace></FindAndReplace>
          </Modal>
        )}
      </React.Fragment>
    );
  };
  
  const FindAndReplace = () => {
    const findTextRef = React.useRef();
    const replaceTextRef = React.useRef();
  
    const oldFindText = React.useRef();
    const oldReplaceText = React.useRef();
  
    const resetFind = React.useCallback(() => {
      if (oldFindText.current) {
        const mainContent = document.getElementById("mainContent");
        mainContent.innerHTML = mainContent.innerHTML.replace(
          new RegExp(`<mark>${oldFindText.current}</mark>`, "g"),
          oldFindText.current
        );
      }
    }, []);
  
    const replace = React.useCallback(() => {
      resetFind();
  
      const findText = findTextRef.current.value;
      const replaceText = replaceTextRef.current.value;
      const mainContent = document.getElementById("mainContent");
      mainContent.innerHTML = mainContent.innerHTML.replace(
        new RegExp(findText, "g"),
        replaceText
      );
  
      oldFindText.current = findText;
      oldReplaceText.current = replaceText;
    }, []);
  
    const find = React.useCallback(() => {
      resetFind();
  
      const findText = findTextRef.current.value;
      const mainContent = document.getElementById("mainContent");
      mainContent.innerHTML = mainContent.innerHTML.replace(
        new RegExp(findText, "g"),
        `<mark>${findText}</mark>`
      );
      oldFindText.current = findText;
    }, []);
  
    return (
      <div
        style={{
          display: "grid",
          gap: "5px",
          width: "50%",
          height: "50%",
          gridTemplateRows: "10% 90%",
        }}
      >
        <div
          style={{
            width: "100",
            height: "100%",
            background: "linear-gradient(to bottom, #F15F79, #B24592)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Find and Replace
        </div>
        <div
          style={{
            width: "100",
            height: "100%",
            display: "grid",
            gridTemplateRows: "2fr 2fr 1fr 1fr",
            gap: "10px",
            padding: "10px",
            boxSizing: "border-box",
            backgroundColor: "white",
          }}
        >
          <input ref={findTextRef} placeholder="Enter Find Text"></input>
          <input ref={replaceTextRef} placeholder="Enter Replace Text"></input>
          <div style={{ width: "100", height: "100%", display: "grid",gap:"10px", gridTemplateColumns: "1fr 1fr", }}>
            <button style={{ width: "100", height: "100%"}} onClick={find}>Find</button>
            <button style={{ width: "100", height: "100%"}}  onClick={replace}>Replace</button>
          </div>
  
          <button onClick={resetFind}>Clear</button>
        </div>
      </div>
    );
  };
  
  var domContainer = document.getElementById("FindAndReplace");
  var root = ReactDOM.createRoot(domContainer);
  root.render(<FindAndReplaceButton></FindAndReplaceButton>);
  
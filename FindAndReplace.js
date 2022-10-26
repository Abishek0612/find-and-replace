var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Modal = function Modal(props) {
  var modal = React.useMemo(function () {
    return React.createElement(
      "div",
      {
        className: "ModalWrapper"
      },
      React.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "absolute",
          top: "0px",
          left: "0px",
          zIndex: "-1"
        },
        onClick: props.onClose
      }),
      props.children
    );
  }, []);

  return ReactDOM.createPortal(modal, document.body);
};

var FindAndReplaceButton = function FindAndReplaceButton() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showModal = _React$useState2[0],
      setShowModal = _React$useState2[1];

  var openModal = React.useCallback(function () {
    setShowModal(true);
  }, []);

  var closeModal = React.useCallback(function () {
    setShowModal(false);
  }, []);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "button",
      { onClick: openModal },
      "Find and Replace"
    ),
    showModal && React.createElement(
      Modal,
      { onClose: closeModal },
      React.createElement(FindAndReplace, null)
    )
  );
};

var FindAndReplace = function FindAndReplace() {
  var findTextRef = React.useRef();
  var replaceTextRef = React.useRef();

  var oldFindText = React.useRef();
  var oldReplaceText = React.useRef();

  var resetFind = React.useCallback(function () {
    if (oldFindText.current) {
      var mainContent = document.getElementById("mainContent");
      mainContent.innerHTML = mainContent.innerHTML.replace(new RegExp("<mark>" + oldFindText.current + "</mark>", "g"), oldFindText.current);
    }
  }, []);

  var replace = React.useCallback(function () {
    resetFind();

    var findText = findTextRef.current.value;
    var replaceText = replaceTextRef.current.value;
    var mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = mainContent.innerHTML.replace(new RegExp(findText, "g"), replaceText);

    oldFindText.current = findText;
    oldReplaceText.current = replaceText;
  }, []);

  var find = React.useCallback(function () {
    resetFind();

    var findText = findTextRef.current.value;
    var mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = mainContent.innerHTML.replace(new RegExp(findText, "g"), "<mark>" + findText + "</mark>");
    oldFindText.current = findText;
  }, []);

  return React.createElement(
    "div",
    {
      style: {
        display: "grid",
        gap: "5px",
        width: "50%",
        height: "50%",
        gridTemplateRows: "10% 90%"
      }
    },
    React.createElement(
      "div",
      {
        style: {
          width: "100",
          height: "100%",
          background: "linear-gradient(to bottom, #F15F79, #B24592)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      },
      "Find and Replace"
    ),
    React.createElement(
      "div",
      {
        style: {
          width: "100",
          height: "100%",
          display: "grid",
          gridTemplateRows: "2fr 2fr 1fr 1fr",
          gap: "10px",
          padding: "10px",
          boxSizing: "border-box",
          backgroundColor: "white"
        }
      },
      React.createElement("input", { ref: findTextRef, placeholder: "Enter Find Text" }),
      React.createElement("input", { ref: replaceTextRef, placeholder: "Enter Replace Text" }),
      React.createElement(
        "div",
        { style: { width: "100", height: "100%", display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" } },
        React.createElement(
          "button",
          { style: { width: "100", height: "100%" }, onClick: find },
          "Find"
        ),
        React.createElement(
          "button",
          { style: { width: "100", height: "100%" }, onClick: replace },
          "Replace"
        )
      ),
      React.createElement(
        "button",
        { onClick: resetFind },
        "Clear"
      )
    )
  );
};

var domContainer = document.getElementById("FindAndReplace");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(FindAndReplaceButton, null));
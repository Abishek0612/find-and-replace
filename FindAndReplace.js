var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Modal = function Modal(props) {
    var modal = React.useMemo(function () {
        return React.createElement(
            'div',
            { style: { width: '100vw', height: '100vh', position: "relative" } },
            React.createElement('div', { style: { width: '100%', height: '100% ', backgroundColor: "rgba(0, 0,0,0.3)" } }),
            props.children
        );
    }, []);
    return;
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
            'button',
            { onClick: openModal },
            'Find and Replace'
        ),
        React.createElement(
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
    var replaceText = React.useRef();

    var replace = React.useCallback(function () {
        var findText = findTextRef.current.value;
        var replaceText = replaceTextRef.current.value;
        var mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = mainContent.innerHTML.replace(new RegExp(findText, 'g'), replaceText);
    }, []);

    var find = React.useCallback(function () {
        var findText = findTextRef.current.value;
        var mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = mainContent.innerHTML.replace(new RegExp(findText, "g"), '<mark>' + findText + ' </mark>');
    }, []);

    return React.createElement(
        'div',
        { style: { displace: 'flex', gap: '5px', width: '50%', heigth: '50%' } },
        React.createElement('input', { ref: findTextRef, placeholder: 'Find The Text' }),
        React.createElement('input', { ref: replaceTextRef, placeholder: 'Replace The Text' }),
        React.createElement(
            'button',
            { onClick: find },
            'Find'
        ),
        React.createElement(
            'button',
            { onClick: replace },
            'Replace'
        )
    );
};

var domContainer = document.getElementById('FindAndReplace');
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(FindAndReplaceButton, null));
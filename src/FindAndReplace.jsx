
const Modal = (props) => {
    const modal = React.useMemo(() => {
        return <div style={{width:'100vw', height:'100vh', position:"relative"}}>
            <div style={{width:'100%', height:'100% ', backgroundColor:"rgba(0, 0,0,0.3)"}}></div>
            {props.children}
        </div>
    },[])
    return
}


const FindAndReplaceButton = () => {
    const [showModal, setShowModal] = React.useState(false)
    const openModal = React.useCallback(() => {
        setShowModal(true);
    },[])

    const closeModal = React.useCallback(() =>{
        setShowModal(false);
    },[])

    return(
        <React.Fragment>
            <button onClick={openModal}>Find and Replace</button>
            <Modal onClose={closeModal}>
                <FindAndReplace></FindAndReplace>
            </Modal>
        </React.Fragment>
    )
}





const FindAndReplace = () => {

    const findTextRef = React.useRef();
    const replaceTextRef = React.useRef();

    const oldFindText = React.useRef();
    const replaceText = React.useRef();


    const replace = React.useCallback(() => {
        const findText = findTextRef.current.value;
        const replaceText = replaceTextRef.current.value;
        const mainContent = document.getElementById('mainContent')
        mainContent.innerHTML
            = mainContent.innerHTML
                .replace(new RegExp(findText, 'g'), replaceText)


    }, [])

    const find = React.useCallback(() => {
        const findText = findTextRef.current.value;
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = mainContent.innerHTML
            .replace(new RegExp(findText, "g"), `<mark>${findText} </mark>`);

    }, []);


    return (
        <div style={{ displace: 'flex', gap: '5px', width: '50%', heigth: '50%' }}>
            <input ref={findTextRef} placeholder="Find The Text"></input>
            <input ref={replaceTextRef} placeholder="Replace The Text"></input>
            <button onClick={find}>Find</button>
            <button onClick={replace}>Replace</button>
        </div>
    );
};


var domContainer = document.getElementById('FindAndReplace')
var root = ReactDOM.createRoot(domContainer);
root.render(<FindAndReplaceButton></FindAndReplaceButton>)
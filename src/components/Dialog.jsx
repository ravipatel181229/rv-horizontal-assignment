
function RVDialog({ element, onClose }) {
    return <><div className="fixed inset-0 z-10 overflow-y-auto">
        <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => onClose()}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white  shadow-lg">
                <span onClick={() => onClose()} role="button" className="float-end font-bold">&#x2715;</span>
                {element}
            </div>
        </div>
    </div>
    </>
}

export default RVDialog
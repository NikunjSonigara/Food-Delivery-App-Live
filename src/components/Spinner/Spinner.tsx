
const Spinner = () => {
    return (
        <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div className="p-2 bg-gradient-to-tr animate-spin from-yellow-200 to-yellow-500 via-yellow-800 rounded-full">
                <div className="bg-white rounded-full">
                    <div className="w-12 h-12 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner
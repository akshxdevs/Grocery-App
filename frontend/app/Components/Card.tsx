export const Card = () => {
    return <div className="flex flex-col px-40 py-28 ">
        <div className="p-10 shadow-lg rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl bg-slate-900">
            <h1 className="text-5xl text-slate-50 font-bold py-2">Paan Corner</h1>
            <h1 className="text-xl text-slate-50 font-semibold py-2">Smoking Accessories, Mints & More</h1>
            <div className="py-2">
                <button className="border border-green-400 py-3 px-5 rounded-2xl text-green-400">Order Now</button>
            </div>
            {/* <div className="absolute -z-10 inset-0 blur-[150px] bg-blue-400 opacity-30 animate-pulse"></div> */}
            {/* <div className="absolute -z-10 inset-0 blur-[180px] bg-red-800 opacity-20 animate-bounce"></div> */}
        </div>
    </div>
}
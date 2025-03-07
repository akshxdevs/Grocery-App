export const Card = () => {
    return <div className="flex flex-col px-40 py-10">
        <div className="p-10 border border-amber-50 shadow-lg rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl">
            <h1 className="text-5xl font-bold py-2">Paan Corner</h1>
            <h1 className="text-xl font-semibold py-2">Smoking Accessories, Mints & More</h1>
            <div className="py-2">
                <button className="border border-green-400 py-3 px-5 rounded-2xl text-green-400">Order Now</button>
            </div>
        </div>
    </div>
}
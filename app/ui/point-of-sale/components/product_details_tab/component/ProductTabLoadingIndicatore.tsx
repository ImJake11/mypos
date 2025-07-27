import { motion } from "framer-motion";



function ProductTabLoadingIndicator() {
    return <div className='bg-[var(--main-bg-primary)] overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] rounded-[11px] p-5 flex flex-col gap-3
            '>

        <div className="w-[10rem] h-[2rem] rounded-[4px] bg-gray-200" />
        <div className="w-[10rem] h-[2rem] rounded-[4px] bg-gray-200" />

        <div className="w-full h-[10rem] rounded-[4px] bg-gray-200" />

        <div className="w-full h-[2rem] rounded-[4px] bg-gray-200" />

        <div className="w-full h-[2rem] rounded-[4px] bg-gray-200" />

        <div className="w-full h-[10rem] rounded-[4px] bg-gray-200" />

        <div className="w-full h-[2rem] rounded-[4px] bg-gray-200" />

        <div className="flex w-full gap-3">
            <div className="flex-1 h-[2.5rem] rounded-[4px] bg-gray-200" />
            <div className="flex-1 h-[2.5rem] rounded-[4px] bg-gray-200" />
        </div>
    </div>
}
export default ProductTabLoadingIndicator; 
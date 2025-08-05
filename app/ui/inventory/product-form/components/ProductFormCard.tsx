

import React from 'react'

const ProductFormCard = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='w-full min-h-fit p-5 rounded-[12px] overflow-hidden bg-white'>
            {children}
        </div>
    )
}

export default ProductFormCard

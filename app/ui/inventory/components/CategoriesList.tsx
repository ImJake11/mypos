import { CategoryModel } from '@/app/lib/models/categoryModel'
import React from 'react'


const CategoriesList = async () => {

    const protocol = process.env.WEBSITE_PROTOCOL;
    const host = process.env.WEBSITE_HOST;
    const port = process.env.WEBSITE_PORT;

    const baseUrl = `${protocol}://${host}:${port}`

    const categoryResponse = await fetch(`${baseUrl}/api/category`, {
        method: "GET",
    });

    if (!categoryResponse.ok) {
        throw new Error(`Failed to fetch product: ${categoryResponse.statusText}`)
    }

    const { data } = await categoryResponse.json();

    const categoryData: CategoryModel[] = data;

    return (
        <div className='flex w-full h-[4rem] gap-1.5 items-center'>
            <ButtonTile />
            {categoryData.map((cat, i) => <ButtonTile key={cat.id} data={cat} />)}
        </div>
    )
}

interface ButtonProp {
    data?: CategoryModel,
}


function ButtonTile({ data }: ButtonProp) {
    return <div className='w-fit h-[3rem] p-[0_15px] bg-red-400 grid place-content-center rounded-[5px]'>
        {data?.content ? data?.content : "All"}
    </div>
}
export default CategoriesList

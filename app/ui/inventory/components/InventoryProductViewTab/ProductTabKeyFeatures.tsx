

{/** key features */ }
interface KeyFeaturesProp {
    data: string,
}

export function KeyFeatures({ data }: KeyFeaturesProp) {

    const parts: string[] = data.split(".");

    function Tile({ content }: { content: string }) {

        return <div className='flex items-center gap-2 ml-6'>
            <div className='button-primary-gradient h-[.7rem] w-[.7rem] rounded-full' />
            <span>{content}</span>
        </div>
    }


    return (
        <div className='flex-col w-full flex gap-1.5 p-5'>
            <span className='flex justify-start items-center gap-1.5 italic font-semibold mb-3.5'>
                <i className="ri-key-fill text-[1.5rem]"
                    style={{
                        color: "var(--color-brand-primary)"
                    }}
                ></i> Key Features
            </span>
            {parts.map((d, i) => d ? <Tile key={i} content={d} /> : null)}

        </div>
    )
}
import CircularLoadingIndicator from "@/app/lib/components/CircularLoadingIndicator"
import { CategoryModel } from "@/app/lib/models/categoryModel"
import { IconArchive, IconEditCircle } from "@tabler/icons-react"

export function LoadingState() {
    return <div className='flex-1 grid place-content-center bg-[var(--main-bg-primary-dark)] rounded-[12px]'>
        <CircularLoadingIndicator size={56} />
    </div>
}

export function CategoryTile({ data, onUpdate }: {
    data: CategoryModel,
    onUpdate: () => void,
}) {
    return <div className='flex w-full gap-3 items-center'>
        <div className='w-[3rem] h-[3rem] rounded-[4px] bg-[var(--main-bg-secondary-dark)] overflow-hidden'>
            {data.url && <img src={data.url} alt="image" />}
        </div>
        <span className='flex-1'>{data.content}</span>
        <button className='w-[2rem] h-[2rem] rounded-full border border-gray-300 bg-gray-100 dark:border-[var(--main-bg-secondary-dark)] dark:bg-[var(--main-bg-secondary-dark)] grid place-content-center'>
            <IconEditCircle size={20} className="stroke-[var(--color-brand-primary)]" />
        </button>
        <button className='w-[2rem] h-[2rem] rounded-full border border-gray-300 bg-gray-100 dark:border-[var(--main-bg-secondary-dark)] dark:bg-[var(--main-bg-secondary-dark)] grid place-content-center'>
            <IconArchive size={20} className="stroke-red-500" />
        </button>
    </div>
}
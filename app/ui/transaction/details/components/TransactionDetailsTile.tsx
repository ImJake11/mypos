export default function TransactionDetailsTile({ title, data }: { title: string, data: any }) {

    return <div className='flex w-full justify-between'>
        <span>{title}</span>
        <span>{data}</span>
    </div>
}

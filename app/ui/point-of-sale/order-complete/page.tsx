import OrderCompleteSummary from './components/OrderCompleteSummary'
import OrderCompleteItems from './components/OrderCompleteItems'
import OrderCompletePayment from './components/payment/OrderCompletePayment'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import Appbar from '@/app/lib/components/Appbar/Appbar'

const page = () => {

    const child = <div className='w-full h-full flex flex-col'>
        {/** app bar */}
        <Appbar title='Complete Order' />

        <div className='h-[calc(100vh-4rem)] flex'>
            {/** cart items list */}
            <OrderCompleteItems />
            {/**  */}
            <div className='bg-[var(--main-bg-secondary)] w-[35vw] min-w-[35vw] box-border p-4 overflow-auto rounded-tl-[7px]'>
                <OrderCompleteSummary />
                <OrderCompletePayment />
            </div>
        </div>
    </div>;


    return (
        <div className='w-screen h-screen flex  overflow-hidden relative'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page

import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import Appbar from '@/app/lib/components/Appbar/Appbar'
import OrderCompleteBody from './OrderCompleteBody'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton'
import OrderCompleteAppbar from './components/OrderCompleteAppbar'

const page = () => {


    const child = <div className='w-full h-full flex flex-col'>
        {/** app bar */}
        <OrderCompleteAppbar />

        <OrderCompleteBody />
    </div>;


    return (
        <div className='w-screen h-screen flex  overflow-hidden relative'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page

import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import Appbar from '@/app/lib/components/Appbar/Appbar'
import OrderCompleteBody from './OrderCompleteBody'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton'
import OrderCompleteAppbar from './components/OrderCompleteAppbar'

const page = () => {

    return (
        <div className='w-screen h-screen flex  overflow-hidden relative'>
            <GlobalWrapper>
                <div className='w-full h-full flex flex-col'>
                    {/** app bar */}
                    <OrderCompleteAppbar />

                    <OrderCompleteBody />
                </div>;
            </GlobalWrapper>
        </div>
    )
}

export default page

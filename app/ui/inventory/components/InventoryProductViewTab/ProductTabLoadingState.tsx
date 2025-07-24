

function ProductTabLoadingState() {
  return (
    <div className='flex flex-col w-full h-full p-3 gap-4 overflow-auto'
    >

      <div className='w-full min-h-[60vh] bg-gray-200 rounded-[12px]' />
      <div className='flex w-full gap-2'>
        <div className='w-[8rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />
        <div className='flex-1' />
        <div className='w-[8rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />
        <div className='w-[15rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />
      </div>

      <div className='w-[11rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />
      <div className='w-full bg-gray-200 h-[5rem] rounded-[8px]' />

      <div className='w-[12rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />
      <div className='w-[8rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />
      <div className='w-[8rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />

      <div className='w-[12rem] bg-gray-200 min-h-[2rem] rounded-[8px]' />

      <div className='w-full bg-gray-200 min-h-[2rem] rounded-[8px]' />

      {Array.from({ length: 5 }).map((_, i) => <div key={i} className='w-full bg-gray-200 min-h-[2rem] rounded-[8px]' />)}
    </div>
  )
}

export default ProductTabLoadingState;
function ProductTabLoadingIndicator() {

    return <div className={`bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[11px] p-5 flex flex-col gap-3 w-[90vw] h-[80vh] md:w-[50vw] md:h-[80vh]`}>

        <div className="w-[10rem] h-[2rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />
        <div className="w-[10rem] h-[2rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />

        <div className="w-full h-[10rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />

        <div className="w-full h-[2rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />

        <div className="w-full h-[2rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />

        <div className="w-full h-[10rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />

        <div className="w-full h-[2rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />

        <div className="flex w-full gap-3">
            <div className="flex-1 h-[2.5rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />
            <div className="flex-1 h-[2.5rem] rounded-[4px] bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]" />
        </div>
    </div>
}
export default ProductTabLoadingIndicator; 
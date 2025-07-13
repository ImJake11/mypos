

function TransactionTF({
    placeHolder, name, onChange, paddingLeft
}: {
    placeHolder: string,
    name: string,
    paddingLeft?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {
    return <div className="flex-1 flex flex-col gap-2">
        <span>{name}</span>
        <input type="text" placeholder={placeHolder} className={`w-full min-h-[3rem] p-2 tf-attr`}
            style={{
                paddingLeft: paddingLeft ?? "0rem"
            }}
            onChange={onChange}
        />
    </div>
}


export default TransactionTF;
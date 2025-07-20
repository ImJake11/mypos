

function TransactionTF({
    placeHolder, name, onChange, paddingLeft, value
}: {
    placeHolder: string,
    name: string,
    paddingLeft?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {
    return <div className="flex-1 flex flex-col gap-2">
        <span>{name}</span>
        <input type="text" placeholder={placeHolder} value={value ?? ""} className={`w-full min-h-[2rem] p-2 tf-attr`}
            style={{
                paddingLeft: paddingLeft ?? "0rem"
            }}
            onChange={onChange}
        />
    </div>
}


export default TransactionTF;
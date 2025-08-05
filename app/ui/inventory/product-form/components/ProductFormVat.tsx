import { ProductKeys } from "@/app/lib/constants/ProductKeys";
import { InformationIcon } from "@/app/lib/icons/informationIcon";
import { ProductProps } from "@/app/lib/models/productModel";
import { VatModel } from "@/app/lib/models/vatModel";
import { formUpdateState } from "@/app/lib/redux/slice/productSlice";
import { IconInfoCircle, IconInfoCircleFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ProductFormVAT({ vats, selectedVat }: { vats: VatModel[], selectedVat: string }) {
    const [isDesctiptionVisible, setDescriptionVisible] = useState(false);

    const dispatch = useDispatch();

    const handleDescriptionToggle = () => {
        setDescriptionVisible(!isDesctiptionVisible);
    }

    return <div className='flex flex-col w-full gap-1'>

        <div className='flex w-full gap-2 items-center text-gray-500'>
            <IconInfoCircleFilled size={18} />
            <span className='underline underline-offset-4' onClick={handleDescriptionToggle}>Learn about VAT</span>
        </div>

        {/** vat explanation */}
        <AnimatePresence>
            {isDesctiptionVisible && <motion.div className='w-[60%] flex flex-col p-3 gap-2 text-gray-600 ml-3'
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0,
                }}
            >

                <span className='font-semibold'>Value-Added Tax (VAT) in the Philippines:</span>
                <p>VAT is a 12% consumption tax levied on the sale of goods and services. While collected by businesses, it's ultimately paid by the consumer. Correctly classifying products as VAT Taxable, VAT Exempt, or Zero-Rated is crucial for accurate calculation and BIR compliance.
                    <span className='underline underline-offset-4 italic ml-0.5' onClick={handleDescriptionToggle}>Hide description.</span>
                </p>
            </motion.div>}
        </AnimatePresence>


        {vats.map((v, i) => {

            const isSelected = selectedVat === v.id;

            // setting key is named by underscore
            const settingKeyParts = v.settingKey.split("_");

            return <div key={i} className='ml-6 w-full h-[1.7rem] flex gap-2 items-center cursor-pointer'
                onClick={() => dispatch(formUpdateState({
                    data: v.id,
                    name: ProductKeys.vatId as keyof ProductProps,
                }))}
            >

                {/** radio */}
                <div className={`w-[1rem] h-[1rem] rounded-full border border-[var(--color-brand-primary)] p-0.5`}>
                    {isSelected && <motion.div className='w-full h-full rounded-full bg-[var(--color-brand-primary)]'
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        exit={{
                            scale: 0,
                        }}
                    />}
                </div>
                <div className='w-full flex gap-2'>{settingKeyParts.map((part, i) => <span key={i}>{part}</span>)}
                    <span className='text-[var(--foreground-lighter)]'>({v.rate}%)</span>
                </div>
            </div>
        })}
    </div>
}

export default ProductFormVAT;
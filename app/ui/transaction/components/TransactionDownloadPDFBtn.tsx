'use client';

import React, { useState } from 'react'
import ExportToPDFIcon from '@/app/lib/icons/ExportToPDFIcon';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';

const TransactionDownloadPDFBtn = ({ pdfRef, dataLength }:
    {
        pdfRef: React.RefObject<HTMLDivElement | null>,
        dataLength: number,
    }) => {

    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {

        if (isGenerating) return;

        setIsGenerating(true);

        try {
            const input = pdfRef.current;
            if (!input) return;

            input.style.overflow = "visible";
            input.style.height = "auto";
            input.style.gap = "0px";
            input.style.paddingTop = "0px";

            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true
            });

            const imgData = canvas.toDataURL("image/jpeg");
            const pdf = new jsPDF("p", "px", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();     // 794px
            const pdfHeight = pdf.internal.pageSize.getHeight();   // 1123px

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = pdfWidth / imgWidth;
            const scaledHeight = imgHeight * ratio;

            let position = 0;

            while (position < scaledHeight) {
                pdf.addImage(
                    imgData,
                    "JPEG",
                    0,
                    -position,                  // offset for this "page"
                    imgWidth * ratio,
                    imgHeight * ratio
                );

                if (position + pdfHeight < scaledHeight) {
                    pdf.addPage();
                }

                position += pdfHeight;
            }

            pdf.save("transaction-report.pdf");

            input.style.overflow = "auto";
            input.style.height = "100%";
            input.style.gap = ".5rem";
            input.style.paddingTop = "20px";
        } catch (e) {
            console.log(e);
            throw new Error("Failed to download PDF");
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <button className={`w-fit h-[2.5rem] rounded-[8px] ${dataLength <= 0 ? "button-primary-disabled-gradient" : "button-primary-gradient "} p-[0_15px] flex gap-2 items-center text-[.8rem] absolute right-[10%] bottom-4`}
            onClick={handleDownload}
        >
            {isGenerating ? <CircularLoadingIndicator size={20} /> : <ExportToPDFIcon size={20} />}
            {isGenerating ? "Genetating PDF" : "Export as PDF"}
        </button>
    )
}

export default TransactionDownloadPDFBtn

import { usePathname } from "next/navigation";

const dashboard = "/";
const inventory = "/ui/inventory";
const pos = "/ui/point-of-sale";
const notification = "/ui/notifications-page";
const transaction = "/ui/transaction";


function SidebarIcons({
    url,
}: { url: string }) {

    const path = usePathname();

    const pathParts = path.split("/");
    const urlParts = url.split("/");

    const size = 22;

    const isSelected = () => {

        if (pathParts.length > 1 && urlParts.length > 1) {

            return urlParts[2] === pathParts[2];

        } else {
            return false;
        }
    };

    const iconColor = `${isSelected() ? "fill-white" : "fill-[#403d3d]"}`;

    if (url === dashboard) {

        return <svg className={iconColor} height={size} width={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="dashboard" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="2" width="9" height="11" rx="2"></rect><rect x="13" y="2" width="9" height="7" rx="2"></rect><rect x="2" y="15" width="9" height="7" rx="2"></rect><rect x="13" y="11" width="9" height="11" rx="2"></rect></g></svg>
    }

    if (url === inventory) {

        return <svg height={size} width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M0 4.6A2.6 2.6 0 0 1 2.6 2h18.8A2.6 2.6 0 0 1 24 4.6v.8A2.6 2.6 0 0 1 21.4 8H21v10.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V8h-.4A2.6 2.6 0 0 1 0 5.4v-.8ZM2.6 4a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h18.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6H2.6ZM8 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" className={iconColor} ></path></g></svg>
    }

    if (url === pos) {

        return <svg height={size} width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path d="M22 21.25C22 21.66 21.66 22 21.25 22H2.75C2.34 22 2 21.66 
        2 21.25C2 20.84 2.34 20.5 2.75 20.5H21.25C21.66 20.5 22 20.84 22 21.25Z" className={iconColor} ></path>
                <path d="M15.3914 4.52172L4.65141 15.2617C4.24141 15.6717 3.58141 15.6717 3.18141 15.2617H3.17141C1.78141 
        13.8617 1.78141 11.6017 3.17141 10.2117L10.3214 3.06172C11.7214 1.66172 13.9814 1.66172 15.3814 3.06172C15.7914 
        3.45172 15.7914 4.12172 15.3914 4.52172Z" className={iconColor}></path>
                <path d="M20.8214 8.49031L17.7714 5.44031C17.3614 5.03031 16.7014 5.03031 16.3014 5.44031L5.56141 16.1803C5.15141 
            16.5803 5.15141 17.2403 5.56141 17.6503L8.61141 20.7103C10.0114 22.1003 12.2714 22.1003 13.6714 20.7103L20.8114 13.5603C22.2314 
            12.1603 22.2314 9.89031 20.8214 8.49031ZM12.7614 17.5203L11.5514 18.7403C11.3014 18.9903 10.8914 18.9903 10.6314 18.7403C10.3814 
            18.4903 10.3814 18.0803 10.6314 17.8203L11.8514 16.6003C12.0914 16.3603 12.5114 16.3603 12.7614 16.6003C13.0114 16.8503 13.0114 17.2803 
            12.7614 17.5203ZM16.7314 13.5503L14.2914 16.0003C14.0414 16.2403 13.6314 16.2403 13.3714 16.0003C13.1214 15.7503 13.1214 15.3403 13.3714 
            15.0803L15.8214 12.6303C16.0614 12.3903 16.4814 12.3903 16.7314 12.6303C16.9814 12.8903 16.9814 13.3003 16.7314 13.5503Z" className={iconColor}></path>
            </g>
        </svg>
    }

    if (url === transaction) {

        return <svg height={size} width={size} className={iconColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z"></path> </g></svg>
    }

    if (url === notification) {

        return <svg height={size} width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 18a1 1 0 0 1-.894-1.447L4 12.763V10a8 8 0 1 1 16 0v2.764l1.894 3.789A1 1 0 0 1 21 18H3ZM12 22a4.002 4.002 0 0 1-3.874-3h7.748A4.002 4.002 0 0 1 12 22Z" className={iconColor} ></path></g></svg>;
    }
}

export default SidebarIcons;
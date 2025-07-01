import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


{/** image container */ }
interface ImageProp {
    url: string | null,
}
export default function ImageContainer({ url }: ImageProp) {

    return (
        <div className='w-full min-h-[30rem] bg-gray-100 rounded-b-[40px] overflow-x-hidden flex relative'>
            {url ? <img src={url} alt="cover image" className='object-cover w-full h-full' /> :
                <FontAwesomeIcon icon={faImage} size='4x' className='place-self-center text-gray-400' />}

            {/** favorite icon */}
            <div className='w-[2.5rem] h-[2.5rem] rounded-full grid place-content-center absolute top-3 right-3'
                style={{
                    backgroundColor: "var(--main-bg-secondary-dark)"
                }}
            >
                <i className="ri-heart-2-fill  text-[1.5rem]"></i>
            </div>
        </div>
    )
}
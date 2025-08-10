import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


{/** image container */ }
interface ImageProp {
    url: string | null,
}
export default function ImageContainer({ url }: ImageProp) {

    return (
        <div className='w-full min-h-[25rem] bg-gray-100 rounded-[20px] overflow-x-hidden flex relative mb-2'>
            {url ? <img src={url} alt="cover image" className='object-fill w-full h-full' /> :
                <FontAwesomeIcon icon={faImage} size='4x' className='place-self-center text-gray-400' />}
        </div>
    )
}
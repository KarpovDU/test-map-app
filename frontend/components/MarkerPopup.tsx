import { MarkerData } from "@/lib/types";
import { FaRegEnvelope, FaRegCalendarDays, FaRegBuilding } from "react-icons/fa6";
import { HiOutlinePhone } from "react-icons/hi2";


export default function MarkerPopup(props: MarkerData) {
    return (
        <>
        123
            {/* <div className='text-medium text-primary'>{props.id}. {props.name}</div>
            {props.company !== '' ? <div className='flex'><br /><FaRegBuilding className='mr-1' /><div className='font-bold mr-1'>{props.company}</div></div> : null}
            {props.email !== '' ? <div className='flex'><br /><FaRegEnvelope className='mr-1' /><div className='font-bold mr-1'>Email:</div>{props.email}</div> : null}
            {props.phonenumber ? <div className='flex'><br /><HiOutlinePhone className='mr-1' /><div className='font-bold mr-1'>Телефон:</div>{props.phonenumber}</div> : null}
            {props.worktime !== '' ? <div className='flex'><br /><FaRegCalendarDays className='mr-1' /><div className='font-bold mr-1'>Часы работы:</div>{props.worktime}</div> : null} */}
        </>
    )
}


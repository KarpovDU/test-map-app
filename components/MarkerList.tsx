'use client'

import { Button, Card, CardBody, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Store";
import ListHeader from "./ListHeader";
import { selectMarker } from "@/lib/markerSlice";
import { PressEvent } from "@react-types/shared";

const MarkerList: React.FC = () => {
    const markers = useSelector((state: RootState) => state.markers);
    const searchValue = markers.searchValue
    console.log(searchValue)
    const dispatch = useDispatch<AppDispatch>();

    const pressEvent = (e: PressEvent) => {
        const att = e.target.getAttribute('id')
        if(att) {
            const id = parseFloat(att);
            dispatch(selectMarker(id));
        }
    };

    
    return (
        <div className="h-full w-[25%] p-5">
            <Card className='h-full w-full '>
                <CardBody className="w-full">
                    <div className="w-full h-full flex flex-col overflow-hidden gap-4">
                        <ListHeader />
                        <div className="rounded-xl overflow-auto">
                        <div className="flex h-content flex-col  p-0 m-0">
                            {markers.markers.filter((marker)=> marker.id === parseFloat(searchValue) || marker.name.includes(searchValue)).map((marker) => (
                                <Button 
                                id={marker.id != null ? marker.id.toString() : undefined}
                                key={marker.id} 
                                className="w-full" 
                                variant="flat" 
                                size="lg" 
                                radius="none" 
                                onPress={pressEvent}
                                endContent={
                                <FaArrowRight className="absolute right-5" />
                                }>
                                    <div className="w-full text-left">
                                        {marker.id}. {marker.name}
                                    </div>
                                </Button>
                            ))}
                        </div>
                        </div>
                        
                    </div>
                </CardBody>
            </Card>
        </div >
    )
}

export default MarkerList
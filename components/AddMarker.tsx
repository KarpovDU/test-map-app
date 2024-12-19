'use client'

import { addMarker, editMarker, saveEditedMarker } from "@/lib/markerSlice";
import { AppDispatch, RootState } from "@/lib/Store";
import { Button, Card, CardBody, Form } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {PressEvent} from "@react-types/shared";



const AddMarker: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const markers = useSelector((state: RootState) => state.markers);
    const marker = markers.selectedMarker;
    
    

    const inputChange = (e: any) => {
        const id = e.target.getAttribute('id')
        const value = e.target.value
        let data = { ...marker }
        data.coordinates = {...marker.coordinates}
        switch (id) {
            case 'name':
            data.name = value
                break;
            case 'lat':
                data.coordinates.lat = parseFloat(value)
                break;
            case 'lng':
                data.coordinates.lng = parseFloat(value)
                break;
            case 'email':
                data.email = value
                break;
            case 'phone':
                data.phoneNumber = parseFloat(value)
                break;
            case 'time':
                data.workTime = value
                break;
            case 'company':
                data.company = value
                break;
            default:
                break;
        }
        dispatch(editMarker(data))
    }

    const saveAdd = (e: PressEvent) => {
        if(marker.name && marker.coordinates.lat && marker.coordinates.lng)
        dispatch(addMarker(marker));
    };

    const saveEditing = (e: PressEvent) => {
        dispatch(saveEditedMarker())
    }

    return (
        <div className="h-full w-[25%] p-5">
            <Card className='h-full w-full'>
                <CardBody className="w-full">
                    <Form className="w-full flex flex-col">
                        <div className="w-full text-center my-4 text-primary text-2xl font-sans">
                            {marker.id == (markers.markers.length + 1) ? <>Создать источник</> : <>Изменить источник</>}
                        </div>
                        <Input id="name" isRequired label="Наименование" placeholder="Карьер #1" type="string" value={marker.name} onChange={inputChange}/>
                        <Input id="lat" isRequired label="Широта" placeholder="0.000..." type="number" value={!marker.coordinates.lat ? '' : marker.coordinates.lat.toString()} onChange={inputChange}/>
                        <Input id="lng" isRequired label="Долгота" placeholder="0.000..." type="number" value={!marker.coordinates.lng ? '' : marker.coordinates.lng.toString()} onChange={inputChange}/>
                        <Input id="email" label="Email" type="email" placeholder="mail@example.com" value={marker.email} onChange={inputChange}/>
                        <Input id="phone" label="Телефон" type="number" placeholder="+7 (123) 456-78-90" value={!marker.phoneNumber ? '' : marker.phoneNumber.toString()} onChange={inputChange}/>
                        <Input id="time" label="Часы работы" placeholder="Пн-пт, 9-17" type="string" value={marker.workTime} onChange={inputChange} />
                        <Input id="company" label="Название компании" placeholder='ООО "Название компании"' type="string" value={marker.company} onChange={inputChange}/>
                        {marker.id == (markers.markers.length + 1) ? 
                        <Button className="w-full text-center my-4" color="primary" type="button" onPress={saveAdd}>Добавить</Button>: 
                        <Button className="w-full text-center my-4" color="primary" type="button" onPress={saveEditing}>Сохранить</Button>}
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddMarker
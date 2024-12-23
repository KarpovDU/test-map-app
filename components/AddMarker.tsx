'use client'

import { addMarker, checkValidInputs, editMarker, saveEditedMarker } from "@/lib/markerSlice";
import { AppDispatch, RootState } from "@/lib/Store";
import { Button, Card, CardBody, Form } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import React from "react"
import PhoneInput from "./PhoneInput";

const AddMarker: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const markers = useSelector((state: RootState) => state.markers);
    const marker = markers.selectedMarker;



    const inputChange = (value: string, id: string) => {
        const data = { ...marker }
        data.coordinates = { ...marker.coordinates }
        switch (id) {
            case 'name':
                data.name = value
                break;
            case 'lat':
                data.coordinates.lat = value !== '' ? parseFloat(value) : 0
                break;
            case 'lng':
                data.coordinates.lng = value !== '' ? parseFloat(value) : 0
                break;
            case 'email':
                data.email = value
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

    const saveAdd = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(checkValidInputs())
        dispatch(addMarker(marker));
    };

    const saveEditing = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(checkValidInputs())
        dispatch(saveEditedMarker())
    }

    return (
        <div className="h-full w-[25%] p-5">
            <Card className='h-full w-full'>
                <CardBody className="w-full">
                    <Form className="w-full flex flex-col" onSubmit={marker.id == (markers.markers.length + 1) ? saveAdd : saveEditing}>
                        <div className="w-full text-center my-4 text-primary text-2xl font-sans">
                            {marker.id == (markers.markers.length + 1) ? <>Создать источник</> : <>Изменить источник</>}
                        </div>
                        <Input
                            isRequired
                            errorMessage="Укажите название источника"
                            label="Наименование"
                            placeholder="Карьер #1"
                            type="string"
                            value={marker.name}
                            isInvalid={markers.invalidInputs.name}
                            onValueChange={(val: string) => inputChange(val, 'name')}
                        />
                        <Input
                            isRequired
                            label="Широта"
                            type="number"
                            value={marker.coordinates.lat.toString()}
                            onValueChange={(val: string) => inputChange(val, 'lat')}
                        />
                        <Input
                            isRequired
                            label="Долгота"
                            type="number"
                            value={marker.coordinates.lng.toString()}
                            onValueChange={(val: string) => inputChange(val, 'lng')}
                        />
                        <Input
                        errorMessage="Введите корректный адрес электронной почты!"
                            label="Email"
                            type="email"
                            isInvalid={markers.invalidInputs.email}
                            placeholder="mail@example.com"
                            value={marker.email}
                            onValueChange={(val: string) => inputChange(val, "email")}
                        />
                        <PhoneInput />
                        <Input
                            label="Часы работы"
                            placeholder="Пн-пт, 9-17"
                            type="string" value={marker.workTime}
                            onValueChange={(val: string) => inputChange(val, "time")} />
                        <Input
                            label="Название компании"
                            placeholder='ООО "Название компании"'
                            type="string" value={marker.company}
                            onValueChange={(val: string) => inputChange(val, 'company')}
                        />

                        <Button className="w-full text-center my-4" color="primary" type="submit" >
                            {marker.id == (markers.markers.length + 1) ? "Добавить" : "Сохранить"}
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddMarker
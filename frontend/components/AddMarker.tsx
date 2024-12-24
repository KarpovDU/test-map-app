'use client'

import { addMarker, checkValid, checkValidInputs, editMarker, removeMarker, saveEditedMarker } from "@/lib/markerSlice";
import store, { AppDispatch, RootState } from "@/lib/Store";
import { Button, Card, CardBody, Form } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import React from "react"
import PhoneInput from "./PhoneInput";
import { createSource, deleteSource, updateSource } from "@/api/sources";
import { NewMarker } from "@/lib/types";

const AddMarker: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const markers = useSelector((state: RootState) => state.markers);
    const marker = markers.selectedMarker;



    const inputChange = (value: string, id: string) => {
        const data = { ...marker }
        switch (id) {
            case 'name':
                data.name = value
                break;
            case 'lat':
                data.lat = value !== '' ? parseFloat(value) : 0
                break;
            case 'lng':
                data.lng = value !== '' ? parseFloat(value) : 0
                break;
            case 'email':
                data.email = value
                break;
            case 'time':
                data.worktime = value
                break;
            case 'company':
                data.company = value
                break;
            default:
                break;
        }
        dispatch(editMarker(data))
    }

    const saveAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(checkValidInputs())
        if (checkValid(store.getState().markers.invalidInputs)) {
            const inputData : NewMarker = store.getState().markers.selectedMarker
            const data = await createSource(inputData)
            if (data) {
                dispatch(addMarker(data));
            }
        }
    };

    const saveEditing = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(checkValidInputs())
        if (checkValid(store.getState().markers.invalidInputs)) {
            const data = await updateSource(store.getState().markers.selectedMarker)
            if (data) {
                dispatch(saveEditedMarker())
            }
        }
    }

    const deleteMarker = async () => {
        const isDeleted = await deleteSource(marker.id)
        if(isDeleted) {
            dispatch(removeMarker(marker.id))
        }
    }

    return (
        <div className="h-full w-[25%] p-5">
            <Card className='h-full w-full'>
                <CardBody className="w-full">
                    <Form className="w-full flex flex-col" onSubmit={markers.markers.find(el => el.id === marker.id) ? saveEditing : saveAdd}>
                        <div className="w-full text-center my-4 text-primary text-2xl font-sans">
                            {markers.markers.find(el => el.id === marker.id) ? "Изменить источник" : "Создать источник"}
                        </div>
                        <Input
                            isRequired
                            errorMessage="Укажите название источника"
                            label="Наименование"
                            placeholder="Карьер #1"
                            type="string"
                            value={marker.name ?? ''}
                            isInvalid={markers.invalidInputs.name}
                            onValueChange={(val: string) => inputChange(val, 'name')}
                        />
                        <Input
                            isRequired
                            label="Широта"
                            type="number"
                            value={marker.lat.toString() ?? ''}
                            onValueChange={(val: string) => inputChange(val, 'lat')}
                        />
                        <Input
                            isRequired
                            label="Долгота"
                            type="number"
                            value={marker.lng.toString() ?? ''}
                            onValueChange={(val: string) => inputChange(val, 'lng')}
                        />
                        <Input
                            errorMessage="Введите корректный адрес электронной почты!"
                            label="Email"
                            type="email"
                            isInvalid={markers.invalidInputs.email}
                            placeholder="mail@example.com"
                            value={marker.email ?? ''}
                            onValueChange={(val: string) => inputChange(val, "email")}
                        />
                        <PhoneInput />
                        <Input
                            label="Часы работы"
                            placeholder="Пн-пт, 9-17"
                            type="string" value={marker.worktime ?? ''}
                            onValueChange={(val: string) => inputChange(val, "time")} />
                        <Input
                            label="Название компании"
                            placeholder='ООО "Название компании"'
                            type="string" value={marker.company ?? ''}
                            onValueChange={(val: string) => inputChange(val, 'company')}
                        />
                        {markers.markers.find(el => el.id === marker.id) ?
                            <div className="flex w-full my-4 gap-4">
                                <Button className="w-[50%] text-center" color="primary" type="submit" >
                                    Сохранить
                                </Button>
                                <Button className="w-[50%] text-center" color="primary" type="button" onPress={deleteMarker}>
                                    Удалить
                                </Button>
                            </div>
                            :
                            <Button className="w-full text-center my-4" color="primary"  type="submit" >
                                Добавить
                            </Button>}
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddMarker
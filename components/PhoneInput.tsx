import { editMarker } from '@/lib/markerSlice';
import { AppDispatch, RootState } from '@/lib/Store';
import { Input } from '@nextui-org/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const PhoneInput: React.FC = ({ }) => {
    const dispatch = useDispatch<AppDispatch>();
    const marker = useSelector((state: RootState) => state.markers.selectedMarker);
    const isInvalid = useSelector((state: RootState) => state.markers.invalidInputs.phoneNumber);
    const mask = '+7 (___) ___-__-__'
    const isNumber = (char: string) => /\d/.test(char);

    const onChange = (value: string) => {
        const data = { ...marker }
        const phoneNumber = data.phoneNumber
        const char = value.charAt(value.length - 1);
        let newValue
        if (isNumber(char) && value > phoneNumber) {
            if (phoneNumber === '') {
                newValue = mask.replace('_', char);
                data.phoneNumber = newValue
                dispatch(editMarker(data))
            } else {
                newValue = value.replace('_', char);
                newValue = newValue.substring(0, newValue.length - 1);
                data.phoneNumber = newValue
                dispatch(editMarker(data))
            }
        } else if (value < phoneNumber) {
            let arr = [...phoneNumber]
            let isDeleted = false
            newValue = arr.reverse().map((i: string) => {
                if (isNumber(i) && !isDeleted) {
                    isDeleted = !isDeleted
                    return '_'
                }
                else {
                    return i
                }
            }).reverse().join('')
            if (newValue === mask) {
                data.phoneNumber = ''   
                dispatch(editMarker(data))
            } else {
                data.phoneNumber = newValue
                dispatch(editMarker(data))
            }
        }

    }

    return (
        <Input
            label="Телефон"
            errorMessage="Введите корректный номер телефона!"
            placeholder='+7 (900) 123-45-67'
            type="tel"
            isInvalid={isInvalid}
            value={marker.phoneNumber}
            onValueChange={(value: string) => onChange(value)}
        />
    );
};

export default PhoneInput;
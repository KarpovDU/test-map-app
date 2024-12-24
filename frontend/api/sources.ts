import { MarkerData, NewMarker } from "@/lib/types";
import axios from "axios";

const baseUrl = 'http://localhost:8000'

export const getSources = async () => {
    try {
        const response = await axios.get(baseUrl + '/sources');
        const data = [...response.data]
        return data.map((item) => {
            const newItem: MarkerData = {...item}
            return newItem
        })
    } catch (error: any) {
        console.error('Error:', error.message);
        return
    }
}

export const createSource  = async (inputData: NewMarker) : Promise<MarkerData | void>  => {
    try {
        const response = await axios.post(baseUrl + '/sources', inputData);
        const data : MarkerData = {...response.data}
        return data
    } catch (error: any) {
        console.error('Error:', error.message);
        return
    } 
}

export const updateSource = async (inputData: MarkerData) : Promise<MarkerData | void> => {
    try {
        const {id: _, ...dataWithoutId} = inputData
        const response = await axios.put(`${baseUrl}/sources/${inputData.id}`, dataWithoutId)
        const data : MarkerData = {...response.data}
        return data
    } catch (error: any) {
        console.error('Error:', error.message);
        return
    }
}

export const deleteSource  = async (id: number) :  Promise<boolean | void> => {
    try {
        const response = await axios.delete(`${baseUrl}/sources/${id}`)
        return response.status === 204
    } catch (error: any) {
        console.error('Error:', error.message);
        return
    }
}

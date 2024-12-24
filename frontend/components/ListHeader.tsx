'use client'

import { editSearchValue, newMarker } from "@/lib/markerSlice";
import { AppDispatch, RootState } from "@/lib/Store";
import { Button, Input } from "@nextui-org/react"
import { GoPlus } from "react-icons/go"
import { IoSearchOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";

function ListHeader() {

    const dispatch = useDispatch<AppDispatch>();
    const searchValue = useSelector((state: RootState) => state.markers.searchValue)
    
    const onPress = () => {
        dispatch(newMarker())
    }

    const onSearch = (value: string) => {
        dispatch(editSearchValue(value))
    }

    const onClear = () => {
        dispatch(editSearchValue(''))
    }

    return (
        <div className="sticky top-0 flex flex-col gap-4">
            <div className="w-full text-center my-4 text-primary text-2xl font-sans grow-0">
                Источники
            </div>

            <Input
                onValueChange={(val: string) => onSearch(val)}
                onClear={onClear}
                value={searchValue}
                className="mt-2"
                isClearable
                label="Поиск"
                placeholder="Поиск по названию или ID..."
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                startContent={<IoSearchOutline />}
            />
            <div className="w-full">
                <Button
                    className="rounded-xl grow-0 w-full"
                    variant="flat"
                    size="lg"
                    radius="none"
                    endContent={<GoPlus className="absolute right-5" />}
                    onPress={onPress}
                >
                    <div className="w-full text-left">Новый источник</div>
                </Button>
            </div>
        </div>
    )
}

export default ListHeader
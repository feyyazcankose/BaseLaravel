import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import { EActivite, EActiviteL } from "../../core/models/activite.enum";

function TypeSelect() {
    const [types, setTypes] = React.useState<string[]>([]);
    const [searchParams, setSearchParams] = useSearchParams(); // Use searchParams

    React.useEffect(() => {
        const urlTypes = searchParams.get("types");
        if (urlTypes) {
            const typesArray = urlTypes.split(","); // Split types from URL
            if (typesArray[0].length > 0) {
                setTypes(typesArray);
            } else {
                setTypes([]);
            }
        }
    }, [searchParams]);

    const handleChipClose = (selectedType: string) => {
        const updatedTypes = types.filter((type) => type !== selectedType);
        setTypes(updatedTypes);
        updateQueryParams(updatedTypes); // Update URL query params
    };

    const updateQueryParams = (types: string[]) => {
        setSearchParams({
            types: types.join(","),
            users: searchParams?.get("users") ?? "",
        });
    };

    React.useEffect(() => {
        console.log(types);
    }, [types]);

    return (
        <Select
            variant="bordered"
            size="md"
            selectedKeys={types}
            onChange={(e) => {
                const values = e.target.value.split(",");
                if (values[0].length > 0) {
                    setTypes(values);
                } else {
                    setTypes([]);
                }
                updateQueryParams(values);
            }}
            isMultiline
            selectionMode="multiple"
            label="Tipler"
            labelPlacement="outside-left"
            placeholder=""
            className="w-full"
            color="primary"
            fullWidth
            classNames={{
                base: "flex-col gap-2",
                label: "text-gray-500",
                innerWrapper: "p-2",
            }}
            renderValue={() => {
                return (
                    <div className="flex flex-wrap gap-2">
                        {types.map((type) => (
                            <Chip
                                size="sm"
                                color="primary"
                                className="bg-green-100 text-black border border-primary-500"
                                key={type}
                                onClose={() => handleChipClose(type)}
                                endContent={
                                    <Icon
                                        className="cursor-pointer"
                                        icon="eva:close-fill"
                                    />
                                }
                                radius="sm"
                                classNames={{
                                    closeButton: " ",
                                }}
                            >
                                {EActiviteL?.[type as keyof typeof EActiviteL]}
                            </Chip>
                        ))}
                    </div>
                );
            }}
        >
            {Object.values(EActivite).map((key) => (
                <SelectItem key={key} value={key}>
                    {EActiviteL[key]}
                </SelectItem>
            ))}
        </Select>
    );
}

export default TypeSelect;

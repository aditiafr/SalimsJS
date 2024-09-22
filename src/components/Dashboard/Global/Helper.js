import { useEffect, useState } from "react";
import { getPrefix } from "../../../Api/General/GetData";

export const PrefixGlobal = () => {

    const [prefix, setPrefix] = useState("");
    useEffect(() => {
        const fetchPrefix = async () => {
            try {
                const res = await getPrefix();
                setPrefix(res.prefix);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPrefix();

    }, []);

    const validateBuildingCode = (_, value) => {
        if (value && value.toLowerCase().startsWith(prefix.toLowerCase())) {
            return Promise.reject(new Error(`Cannot start with the Code "${prefix}"`));
        }
        return Promise.resolve();
    };

    return validateBuildingCode;

}
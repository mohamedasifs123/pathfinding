
//select.tsx
import { ChangeEvent } from "react";

export function Select({
    value,
    onChange,
    options,
    label,
    isDisabled
}:{
    value: string | number;
    label: string;
    onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
    options: {value: string| number; name: string} [];
    isDisabled?: boolean
}){
    return (<div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">
        {label}
    </label>
    <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={isDisabled}
        id={label}
        value={value}
        onChange={onChange}
    >
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
        ))}
    </select>
</div>


    )

}
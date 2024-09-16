import { Input } from "antd";

const SearchInput = ({ value, onChange }) => {
    return (
        <Input
            placeholder="search..."
            allowClear
            value={value}
            onChange={onChange}
            style={{ width: 200 }}
        />
    );
};

export default SearchInput;

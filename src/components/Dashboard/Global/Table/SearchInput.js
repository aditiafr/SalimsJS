import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchInput = ({ value, onChange }) => {
    return (
        <Input
            allowClear
            placeholder="Search..."
            value={value}
            onChange={onChange}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
        />
    );
};

export default SearchInput;

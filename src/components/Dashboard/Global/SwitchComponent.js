import React from "react";
import { Switch } from "antd";

const SwitchComponent = ({ isSuspend, handleSwitchChange }) => {

    return (
        <div className="flex gap-2">
            <p className="text-sm">Suspend</p>
            <Switch
                checkedChildren="true"
                unCheckedChildren="false"
                checked={isSuspend}
                onChange={handleSwitchChange}
            />
        </div>
    );
};

export default SwitchComponent;

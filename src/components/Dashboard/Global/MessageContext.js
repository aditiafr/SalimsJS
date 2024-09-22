import React, { createContext, useContext, useState } from 'react';
import { message } from 'antd';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={{ messageApi, contextHolder }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => useContext(MessageContext);

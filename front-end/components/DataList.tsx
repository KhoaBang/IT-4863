'use client';
import React from 'react';
import { List, Space } from 'antd';
import { dieu } from '../lib/definitions'; // Ensure 'dieu' is correctly defined

interface IDataListProps {
    data: dieu[] | []; // Keeping the type as you defined
}

const DataList: React.FC<IDataListProps> = ({ data }) => {
    // Function to normalize whitespace
    const normalizeText = (text: string) => {
        // Replace multiple whitespace characters (spaces, tabs, newlines) with a single space
        return text.replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n').trim(); // trim() removes leading and trailing whitespace
    };

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(`Page: ${page}`);
                },
                pageSize: 5,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item key={item.tendieu}>
                    <List.Item.Meta
                        title={item.tenchude}
                        description={
                            <Space direction="vertical">
                                <div>{item.tendemuc}</div>
                                <div>{item.tenchuong}</div>
                                <div>{item.tendieu}</div>
                            </Space>
                        }
                    />
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {normalizeText(item.noidung)}
                    </div>
                </List.Item>
            )}
        />
    );
};

export default DataList;

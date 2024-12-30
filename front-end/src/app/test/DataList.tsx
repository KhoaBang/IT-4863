"use client";
import React, { useState } from "react";
import { List, Pagination,Button, Popover } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface record {
  title: string; // Title or subject
  content: string; // Sub-title or section
  link: string; // Chapter title
}

interface IDataListProps {
  data: {
    results: record[];
    meta_data: { total: number };
  };
}

const DataList: React.FC<IDataListProps> = ({ data }) => {
  const { results = [], meta_data = { total: 0 } } = data || {};
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Handle pagination changes
  const handlePagination = (pagenum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pagenum", pagenum.toString());
    replace(`${pathname}?${params.toString()}`);
    setCurrentPage(pagenum); // Update the current page
  };

  // Check for empty results
  if (results.length === 0) {
    return <div style={{ textAlign: "center" }}>No results found.</div>;
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={results}
        style={{ textAlign: "left" }}
        renderItem={(item) => {
          return (
            <List.Item key={item?.link||" "}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between", // This will place the elements at the ends
                  alignItems: "center", // Ensures the items are vertically aligned
                }}
              >
                <b>{item?.title||" "}</b>
                <Popover content={item?.link||" "} title={item?.title||" "} trigger="hover">
                <Button type="primary">Chi tiết</Button>
                </Popover>
              </div>
              {item?.content &&
              <div>
                {item?.content.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>}
              {
                !item?.content&&<div>
                  No content
                </div>
              }
            </List.Item>
          );
        }}
      />

      <Pagination
        align="center"
        current={currentPage}
        onChange={handlePagination}
        total={meta_data.total || 0}
      />
    </div>
  );
};

export default DataList;

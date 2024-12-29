"use client";
import React, { useState } from "react";
import { List, Button, Popover, Pagination } from "antd";
import { dieu } from "../lib/definitions"; // Ensure 'dieu' is correctly defined
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface IDataListProps {
  data: {
    results: dieu[];
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
          const content = (
            <div>
              <div>{item.tenchude}</div>
              <div>{item.tendemuc}</div>
              <div>{item.tenchuong}</div>
            </div>
          );

          return (
            <List.Item key={item.tendieu}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between", // This will place the elements at the ends
                  alignItems: "center", // Ensures the items are vertically aligned
                }}
              >
                <b>{item.tendieu}</b>
                <Popover content={content} title={item.tendieu} trigger="hover">
                <Button type="primary">Chi tiết</Button>
                </Popover>
              </div>

              <div style={{ whiteSpace: "pre-wrap" }}>
                {item.noidung.map((text, index) => {
                  // Regular expressions to match a number or a lowercase letter at the start
                  const numberRegex = /^\d+\./; // Match numbers followed by a period (e.g., 1.)
                  const lowercaseRegex =
                    /^[a-zảắầẫẩằẳếềểễệốồổỗơởỡùủũỳỹđ]+[\)\.]/; // Match Vietnamese lowercase letter followed by `)` or `.`
                  const commonIndentRegex = /^\-/; // Match common indentation
                  let indent = 0;
                  let firstPart = "";
                  let restPart = text;

                  // Check if the text starts with a number followed by a period
                  if (numberRegex.test(text.trim())) {
                    indent = 1; // Number starts, 1 tab
                    const match = text.match(numberRegex); // Match the number and period
                    firstPart = match ? match[0] : ""; // Get the matched number (e.g., "1.")
                    restPart = text.slice(firstPart.length).trim(); // Rest of the text after the number
                  } else if (lowercaseRegex.test(text.trim())) {
                    indent = 2; // Lowercase starts, 2 tabs
                    const match = text.match(lowercaseRegex); // Match the letter and parenthesis/period
                    firstPart = match ? match[0] : ""; // Get the matched letter (e.g., "a)")
                    restPart = text.slice(firstPart.length).trim(); // Rest of the text after the letter
                  } else if (commonIndentRegex.test(text.trim())) {
                    indent = 3;
                  } else {
                    indent = 1; // Default indentation
                  }

                  return (
                    <p key={index} style={{ marginLeft: `${indent}em` }}>
                      <i>{firstPart}</i>
                      {" " + restPart}
                    </p>
                  );
                })}
              </div>
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

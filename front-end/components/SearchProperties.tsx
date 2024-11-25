"use client"
import {Input} from "antd"
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';import React from 'react'

function SearchProperties() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
          replace(`${pathname}?${params.toString()}`);
      }, 300);
  return (
    <div>
        <Input.Search
              size="large"
            //   enterButton="Tìm kiếm"
              placeholder="Searching..."
            //   prefix={<SearchOutlined />}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get('query')?.toString()}
            />
    </div>
  )
}

export default SearchProperties
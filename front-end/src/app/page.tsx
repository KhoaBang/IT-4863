import DataList from "../../components/DataList";
import Link from "next/link";
import { Button } from "antd";

// Define the Page component
const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    pagenum?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.pagenum) || 1;
  const encodedTerm = encodeURIComponent(query);

  // Fetch the data from the backend API
  const res = await fetch(
    `${process.env.BACKEND}?term=${encodedTerm}&pagenum=${currentPage}`
  );
  const kq = await res.json();
  return (
    <div style={{textAlign: "center"}}>
     <Button type="primary" style={{ margin: "1rem", textAlign: "center" }}>
        <Link href="/test" style={{ color: "inherit", textDecoration: "none" }}>
          Đi tới dữ liệu các nhóm
        </Link>
      </Button>
      <DataList data={kq} />
      
    </div>
  );
};

export default Page;

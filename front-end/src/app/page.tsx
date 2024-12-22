import DataList from "../../components/DataList";

// Define the Page component
const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    pagenum?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.pagenum) || 1;
  const encodedTerm = encodeURIComponent(query);
  
  // Fetch the data from the backend API
  const res = await fetch(`${process.env.BACKEND}?term=${encodedTerm}&pagenum=${currentPage}`);
  const kq = await res.json();
  return (
    <div>
      <DataList data={kq} />
    </div>
  );
};

export default Page;

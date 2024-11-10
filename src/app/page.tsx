import DataList from "../../components/DataList";
const DataView = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
    const encodedTerm = encodeURIComponent(query);
    const res = await fetch(`http://localhost:3000/api?term=${encodedTerm}`);
    const kq = await res.json();
    const {documents}= kq;

    console.log("check data", documents);

    // Return the fetched data
    return (
    <div>

      <DataList data={documents}/>
    </div>)
  };

  export default DataView
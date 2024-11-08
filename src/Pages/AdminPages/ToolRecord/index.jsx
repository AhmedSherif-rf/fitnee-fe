import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import { Card, CardBody, Col, Row, CardHeader, CardFooter } from "reactstrap";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import { getToolRecords } from "../../../Redux/features/Admin/PromoCode/promoCodeApi";
import {
  ADMIN_TOOL_RECORD_URL,
  PER_PAGE_COUNT,
} from "../../../utils/constants";

const ToolRecord = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [toolData, setToolData] = useState(null);
  const { loading } = useSelector((state) => state.promoCode);

  useEffect(() => {
    fetchToolRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  const fetchToolRecords = () => {
    const data = {
      apiEndpoint: `${ADMIN_TOOL_RECORD_URL}?page=${page}`,
    };

    dispatch(getToolRecords(data)).then((res) => {
      if (res.type === "getToolRecords/fulfilled") {
        setSizePages(res?.payload?.data?.count);
        setToolData(res?.payload?.data?.results);
      }
    });
  };

  useEffect(() => {
    if (toolData && toolData.length > 0) {
      let promoCodeArray = [];
      toolData.forEach((record) => {
        promoCodeArray.push({
          type: record?.type,
          email: record?.email,
          name: record?.name,
          phoneNumber: record?.phone_number,
          weight: record?.weight,
          height: record?.height,
          age: record?.age,
          gender: record?.gender === "1" ? "Male" : "Female",
          result: record?.result,
        });
      });
      setTableData(promoCodeArray);
    } else {
      setTableData([]);
    }
  }, [toolData]);

  const columns = [
    { label: "Type", dataKey: "type", align: "center" },
    { label: "Email", dataKey: "email" },
    { label: "Name", dataKey: "name" },
    { label: "Phone Number", dataKey: "phoneNumber" },
    { label: "Weight", dataKey: "weight", align: "center" },
    { label: "Height", dataKey: "height", align: "center" },
    { label: "Age", dataKey: "age", align: "center" },
    { label: "Gender", dataKey: "gender", align: "center" },
    { label: "Result", dataKey: "result", align: "center" },
  ];

  return (
    <Row className="h-100">
      <Col md={12}>
        {loading === "pending" && <LoadingScreen />}
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0">
            <PageHeading headingText="BMI/BMR Records" categoryText="" />
          </CardHeader>
          <CardBody className="tableBodyWrapperPagination p-md-2 p-0">
            <ListingTable data={tableData} columns={columns} />
          </CardBody>
          <CardFooter className="bg-transparent text-end pb-0 pt-2">
            {totalSize > PER_PAGE_COUNT && (
              <Pagination
                size={totalSize}
                handlePageChange={handlePageChange}
                page={page}
              />
            )}
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};
export default ToolRecord;

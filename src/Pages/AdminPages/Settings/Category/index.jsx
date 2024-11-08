import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Form } from "reactstrap";
import InputField from "../../../../Shared/InputField";
import FillBtn from "../../../../Shared/Buttons/FillBtn";
import React, { useCallback, useEffect, useState } from "react";
import PageHeading from "../../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import GoBack from "../../../../Shared/AdminShared/Components/GoBack";
import { ADMIN_EXERCISE_CATEGORY_URL } from "../../../../utils/constants";
import CategoryCard from "../../../../Shared/AdminShared/Components/CategoryCard";
import { ADD_CATEGORY_SCHEMA } from "../../../../Shared/ValidationData/validation";
import { ADD_CATEGORY_INITIAL_VALUES } from "../../../../Shared/ValidationData/initialValue";
import {
  addCategory,
  updateCategory,
  getAllCategory,
} from "../../../../Redux/features/Exercise/exerciseApi";

const Category = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("");
  const { loading } = useSelector((state) => state.exercise);

  const [type, setType] = useState("Add");
  const [categroiesData, setCategroiesData] = useState([]);
  const [initialValues, setInitialValues] = useState(
    ADD_CATEGORY_INITIAL_VALUES
  );

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = () => {
    const data = {
      apiEndpoint: ADMIN_EXERCISE_CATEGORY_URL,
    };
    dispatch(getAllCategory(data)).then((res) => {
      if (res.type === "getAllCategory/fulfilled") {
        setCategroiesData(res.payload.data);
      }
    });
  };

  const handleEditClick = useCallback((values) => {
    setType("Edit");
    setInitialValues(values);
  }, []);

  const handleAddCategory = (values, resetForm) => {
    if (type === "Edit") {
      const data = {
        apiEndpoint: `${ADMIN_EXERCISE_CATEGORY_URL}${values.id}/`,
        requestData: JSON.stringify(values),
      };
      dispatch(updateCategory(data)).then((res) => {
        if (res.type === "updateCategory/fulfilled") {
          setInitialValues(ADD_CATEGORY_INITIAL_VALUES);
          setType("Add");
        }
      });
    } else {
      const data = {
        apiEndpoint: ADMIN_EXERCISE_CATEGORY_URL,
        requestData: JSON.stringify(values),
      };
      dispatch(addCategory(data)).then((res) => {
        if (res.type === "addCategory/fulfilled") {
          resetForm();
          setType("Add");
        }
      });
    }
    fetchCategories();
  };

  return (
    <Container>
      {loading === "pending" && <LoadingScreen />}
      <GoBack />
      <Formik
        initialValues={initialValues}
        validationSchema={ADD_CATEGORY_SCHEMA}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleAddCategory(values, resetForm);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className=" justify-content-center pb-2">
              <div className="w-100 text-start">
                <PageHeading headingText="Categories" categoryText="" />
              </div>
              <Col md={4} className="mb-2">
                <InputField
                  type="text"
                  name="title"
                  placeholder={"Type category"}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.title}
                  className={"form-control-lg BorderRadiusInput py-3 px-3"}
                />
                <p className="errorField text-start mb-0">
                  {t(errors.title) && touched.title && t(errors.title)}
                </p>
              </Col>
              <Col md={4} className="mb-2">
                <InputField
                  type="text"
                  name="title_ar"
                  placeholder={"Type category in arabic"}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.title_ar}
                  className={"form-control-lg BorderRadiusInput py-3 px-3 rtl"}
                />
                <p className="errorField text-start mb-0">
                  {t(errors.title_ar) && touched.title_ar && t(errors.title_ar)}
                </p>
              </Col>
              <Col md={3} className="mt-1">
                <FillBtn
                  className="w-100 py-2 mb-2"
                  text={type}
                  disabled={loading === "pending" ? true : false}
                  type={"submit"}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      {categroiesData && categroiesData.length > 0 && (
        <Row className="tableBodyWrapperPagination">
          {categroiesData.map((category, index) => (
            <Col lg={4} className="mb-2" key={index}>
              <CategoryCard category={category} onEditClick={handleEditClick} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
export default Category;

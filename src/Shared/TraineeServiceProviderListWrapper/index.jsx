import styles from "./style.module.scss";
import {
  Card,
  CardBody,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import functions from "../../utils/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Shared/Pagination";
import PageHeading from "../Headings/PageHeading";
import FillBtn from "../../Shared/Buttons/FillBtn";
import { useSelector, useDispatch } from "react-redux";
import InformationModal from "../Modal/InformationModal";
import OutlineBtn from "../../Shared/Buttons/OutlineBtn";
import Images from "../../HelperMethods/Constants/ImgConstants";
import React, { useState, useCallback, memo, useEffect } from "react";
import ShimmerScreen from "../Skeleton/serviceProviderListingSkeleton";
import ServiceProviderListCard from "../../Shared/ServiceProviderListCard";
import { getServiceProviderGuestMode } from "../../Redux/features/Guest/guestApi";
import {
  TRAINER_TYPE,
  PER_PAGE_COUNT,
  NUTRITIONIST_TYPE,
  TRAINEE_SERVICE_PROVIDER_LISTING_URL,
  NUTRITIONIST_ROLE,
  TRAINER_ROLE,
} from "../../utils/constants";

const TraineeServiceProviderListWrapper = (props) => {
  const { roleType } = props;
  const [
    showSubscriptionInformationModal,
    setShowSubscriptionInformationModal,
  ] = useState(false);
  const { loading } = useSelector((state) => state.guest);

  const [page, setPage] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listingRole, setListingRole] = useState(roleType);
  const [serviceProviderData, setServiceProviderData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    const listingContainer = document.getElementById("listingContainer");
    if (listingContainer) {
      listingContainer.scrollTop = 0;
    }
  }, [page]);

  useEffect(() => {
    const data = {
      apiEndpoint: `${TRAINEE_SERVICE_PROVIDER_LISTING_URL}?role=${functions.getListingRole(
        listingRole
      )}&page=${page}`,
    };

    dispatch(getServiceProviderGuestMode(data)).then((res) => {
      if (res.type === "getServiceProviderGuestMode/fulfilled") {
        setTotalSize(res.payload.data.count);
        setServiceProviderData(res.payload.data.results);
      }
    });
  }, [dispatch, listingRole, page]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleDropdownItemClick = (role) => {
    setPage(1);
    setListingRole(role);
  };

  const handleNotNowClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
    navigate("/registerAs");
  }, [navigate]);

  const handleSubscriptionInformationModalClose = useCallback(() => {
    setShowSubscriptionInformationModal(false);
  }, []);

  const conditionalHeader = () => {
    if (listingRole === TRAINER_TYPE) {
      return t("guest.trainersText");
    } else if (listingRole === NUTRITIONIST_TYPE) {
      return t("guest.nutritionistsText");
    } else {
      return t("guest.trainerNutritionistText");
    }
  };

  return (
    <Card
      className={`BorderRadius contentCard ${styles.serviceProviderListWrapper}`}
      id={"listingContainer"}
    >
      <CardBody>
        {loading === "pending" && <ShimmerScreen />}
        {loading !== "pending" && (
          <Row className={`align-items-center mb-2 ${i18n.dir()}`}>
            <Col xs={10} sm={6} className="text-left">
              <PageHeading
                headingText={`${t("guest.listOfText")} ${conditionalHeader()}`}
                categoryText=""
              />
            </Col>
            <Col
              xs={2}
              sm={6}
              className={`${
                i18n.dir() === "ltr" ? "text-end" : "text-start px-3"
              }`}
            >
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle data-toggle="dropdown" tag="span">
                  <img
                    className={`${styles.filterIcon}`}
                    src={Images.FILTER_ICON}
                    alt="filter-icon"
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => handleDropdownItemClick(TRAINER_TYPE)}
                  >
                    {t("guest.trainersText")}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownItemClick(NUTRITIONIST_TYPE)}
                  >
                    {t("guest.nutritionistsText")}
                  </DropdownItem>
                  {/* <DropdownItem
                    onClick={() =>
                      handleDropdownItemClick(TRAINER_NUTRITIONIST_TYPE)
                    }
                  >
                    {t("guest.bothText")}
                  </DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        )}

        <Row>
          {serviceProviderData.length > 0 &&
            loading !== "pending" &&
            serviceProviderData.map((serviceProvider, index) => {
              return (
                <Col lg={3} md={4} col={6} className="mb-3" key={index}>
                  <ServiceProviderListCard
                    className={`${styles.activeTrainerCard}`}
                    serviceProvider={serviceProvider}
                    handleOnClick={() => {
                      const role =
                        listingRole === NUTRITIONIST_TYPE
                          ? NUTRITIONIST_ROLE
                          : TRAINER_ROLE;
                      navigate(
                        `/trainee/serviceProviderProfile/${serviceProvider.uuid}/${serviceProvider?.id}/${role}/${listingRole}`
                      );
                    }}
                  />
                </Col>
              );
            })}
          {serviceProviderData.length <= 0 && (
            <Row className="justify-content-center align-items-center mt-5 pt-4">
              <Col className="text-center" md={4}>
                {loading !== "pending" && (
                  <img
                    className="img-fluid"
                    src={Images.NO_DATA_FOUND_IMG}
                    alt="no-data-found"
                  />
                )}
              </Col>
            </Row>
          )}

          <InformationModal
            size={"md"}
            TOneClassName={"mb-4 fs-5 text-center"}
            className={"p-4"}
            isOpen={showSubscriptionInformationModal}
            onClose={handleSubscriptionInformationModalClose}
            ModalTextOne={t("guest.subscribeToSeeText")}
            ButtonOne={
              <FillBtn
                text={t("guest.registerText")}
                className="py-2 px-5"
                handleOnClick={handleRegisterClick}
              />
            }
            ButtonTwo={
              <OutlineBtn
                text={t("guest.notNowText")}
                className="py-2 px-5"
                handleOnClick={handleNotNowClick}
              />
            }
          />
        </Row>
      </CardBody>
      {totalSize > PER_PAGE_COUNT && (
        <Pagination
          size={totalSize}
          handlePageChange={handlePageChange}
          page={page}
        />
      )}
    </Card>
  );
};

export default memo(TraineeServiceProviderListWrapper);

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
  NUTRITIONIST_TYPE,
  GUEST_SERVICE_PROVIDER_LISTING_URL,
} from "../../utils/constants";

const GuestServiceProviderListWrapper = (props) => {
  const { roleType } = props;
  const [
    showSubscriptionInformationModal,
    setShowSubscriptionInformationModal,
  ] = useState(false);
  const { loading } = useSelector((state) => state.guest);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listingRole, setListingRole] = useState(roleType);
  const [serviceProviderData, setServiceProviderData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");

  useEffect(() => {
    setListingRole(roleType);
  }, [roleType]);

  useEffect(() => {
    const data = {
      apiEndpoint: `${GUEST_SERVICE_PROVIDER_LISTING_URL}?role=${functions.getListingRole(
        listingRole
      )}`,
    };

    dispatch(getServiceProviderGuestMode(data)).then((res) => {
      if (res.type === "getServiceProviderGuestMode/fulfilled") {
        setServiceProviderData(res.payload.data);
      }
    });
  }, [dispatch, listingRole]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleDropdownItemClick = (role) => {
    setListingRole(role);
  };

  const handleSeeMoreClick = useCallback(() => {
    setShowSubscriptionInformationModal(true);
  }, []);

  const handleNotNowClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
  }, []);

  const handleSignInClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
    navigate("/signIn");
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
    >
      <CardBody>
        {loading === "pending" ? (
          <ShimmerScreen />
        ) : (
          <>
            <Row className={`align-items-center mb-2  ${i18n.dir()}`}>
              <Col xs={10} sm={6} className="text-left">
                <PageHeading
                  headingText={`${t(
                    "guest.listOfText"
                  )} ${conditionalHeader()}`}
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
            <Row>
              {serviceProviderData.length > 0 &&
                serviceProviderData.map((serviceProvider, index) => {
                  return (
                    <Col lg={3} md={4} col={6} className="mb-3" key={index}>
                      <ServiceProviderListCard
                        className={`${styles.activeTrainerCard}`}
                        serviceProvider={serviceProvider}
                        handleOnClick={() =>
                          navigate(
                            `/guest/serviceProviderProfile/${serviceProvider.uuid}/${serviceProvider.id}`
                          )
                        }
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
                        alt=""
                      />
                    )}
                  </Col>
                </Row>
              )}
              {serviceProviderData.length > 0 && (
                <Col lg={3} md={4} col={6} className="mb-3">
                  <Card
                    className={`bgProperties BorderRadius h-100`}
                    style={{
                      backgroundImage: `url(${Images.SEE_MORE_BG_IMG})`,
                      cursor: "pointer",
                    }}
                    onClick={handleSeeMoreClick}
                  >
                    <CardBody>
                      <div className="w-100 d-flex align-items-center justify-content-center h-100">
                        <div>
                          <p className="mb-0 fs-4 fw-bold">
                            {t("guest.seeMoreText")}
                          </p>
                          <div className="w-100 text-center">
                            <img
                              className="img-fluid w-50"
                              src={Images.ARROW_RIGHT_IMG}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
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
                    text={t("login.signInText")}
                    className="py-2 px-5"
                    handleOnClick={handleSignInClick}
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
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(GuestServiceProviderListWrapper);

import "./style.scss";
import React, { memo } from "react";
import FeedbackCard from "../FeedbackCard";
import { Container, Row, Col } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const CardSwiper = (props) => {
  const { data: cardsData, heading } = props;

  const slicedCardsData = cardsData.slice(0, 10);

  const swiperConfiguration = {
    grabCursor: true,
    spaceBetween: 20,
    centeredSlides: true,
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      530: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 20,
      },
      1360: {
        slidesPerView: 3,
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 20,
      },
    },
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [Autoplay, Pagination, Navigation],
    className: "mySwiper",
  };

  return (
    <Container className="">
      <Row className="mb-5 p-2">
        <Col>
          <h1 className="text-center fw-bold text-white mt-5">{heading}</h1>
          <Swiper {...swiperConfiguration} className={"feedbackSwiper"}>
            {slicedCardsData.map((feedback, index) => {
              return (
                <SwiperSlide
                  key={"_" + index}
                  className={"feedbackSwiperSlider"}
                >
                  <FeedbackCard
                    header={`${feedback?.reviewer_data?.first_name} ${feedback?.reviewer_data?.last_name}`}
                    image={feedback?.reviewer_data?.profile_pic}
                    des={
                      feedback?.platform_review.length > 6
                        ? feedback?.platform_review.slice(0, 300) + "..."
                        : feedback?.platform_review
                    }
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(CardSwiper);

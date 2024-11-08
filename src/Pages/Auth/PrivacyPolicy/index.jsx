import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import OutlineBtn from "../../../Shared/Buttons/OutlineBtn";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation("");

  const goBack = () => {
    navigate("/");
  };
  const introduction = [
    {
      description: t("privacyPolicy.introductionDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.introductionDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.introductionDescriptionThreeText"),
    },
  ];

  const sectionOne = [
    {
      description: t("privacyPolicy.sectionOneDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionOneDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionOneDescriptionThreeText"),
    },
    {
      description: t("privacyPolicy.sectionOneDescriptionFourText"),
    },
  ];

  const sectionTwo = [
    {
      description: t("privacyPolicy.sectionTwoDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionTwoDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionTwoDescriptionThreeText"),
    },
  ];

  const sectionFourOne = [
    {
      description: t("privacyPolicy.sectionFourOneDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionFourOneDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionFourOneDescriptionThreeText"),
    },
    {
      description: t("privacyPolicy.sectionFourOneDescriptionFourText"),
    },
    {
      description: t("privacyPolicy.sectionFourOneDescriptionFiveText"),
    },
  ];

  const sectionFourTwo = [
    {
      description: t("privacyPolicy.sectionFourTwoDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionFourTwoDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionFourTwoDescriptionThreeText"),
    },
  ];

  const sectionFourThree = [
    {
      description: t("privacyPolicy.sectionFourThreeDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionFourThreeDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionFourThreeDescriptionThreeText"),
    },
  ];

  const sectionFourFour = [
    {
      description: t("privacyPolicy.sectionFourFourDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionFourFourDescriptionTwoText"),
    },
  ];

  const sectionFourFive = [
    {
      description: t("privacyPolicy.sectionFourFiveDescriptionOneText"),
    },
  ];

  const sectionFourSix = [
    {
      description: t("privacyPolicy.sectionFourSixDescriptionOneText"),
    },
  ];

  const sectionFourSeven = [
    {
      description: t("privacyPolicy.sectionFourSevenDescriptionOneText"),
    },
  ];

  const sectionSix = [
    {
      description: t("privacyPolicy.sectionSixDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionThreeText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionFourText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionFiveText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionSixText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionSevenText"),
    },
    {
      description: t("privacyPolicy.sectionSixDescriptionEightText"),
    },
  ];

  const sectionEight = [
    {
      description: t("privacyPolicy.sectionEightDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionEightDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionEightDescriptionThreeText"),
    },
    {
      description: t("privacyPolicy.sectionEightDescriptionFourText"),
    },
  ];

  const sectionNine = [
    {
      description: t("privacyPolicy.sectionNineDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionNineDescriptionTwoText"),
    },
  ];

  const sectionEleven = [
    {
      description: t("privacyPolicy.sectionElevenDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionElevenDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionElevenDescriptionThreeText"),
    },
    {
      description: t("privacyPolicy.sectionElevenDescriptionFourText"),
    },
  ];

  const sectionTwelve = [
    {
      description: t("privacyPolicy.sectionTwelveDescriptionOneText"),
    },
    {
      description: t("privacyPolicy.sectionTwelveDescriptionTwoText"),
    },
    {
      description: t("privacyPolicy.sectionTwelveDescriptionThreeText"),
    },
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12}>
          <h1 className="text-center my-4 f-w-bold">
            {t("privacyPolicy.privacyPolicyHeadingText")}
          </h1>

          <div className={`${i18n.dir()}`}>
            <div>
              <p>{t("privacyPolicy.lastUpdatedText")}</p>
            </div>

            <div>
              <h6 className="fw-bold">
                {t("privacyPolicy.introductionHeadingText")}
              </h6>
              <ol align="justify">
                {introduction.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionOneBoldHeadingText")}
              </h6>
              <h6 className="fw-bold">
                {t("privacyPolicy.sectionOneHeadingText")}
              </h6>
              <div align="justify">
                {sectionOne.map((item, index) => {
                  return (
                    <p key={index}>
                      <span >{item.description}</span>
                    </p>
                  );
                })}
              </div>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionTwoHeadingText")}
              </h6>
              <ol align="justify">
                {sectionTwo.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionThreeHeadingText")}
              </h6>
              <p align="justify">
                {t("privacyPolicy.sectionThreeDescriptionOneText")}
              </p>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourHeadingText")}
              </h6>
              <p align="justify">
                {t("privacyPolicy.sectionFourDescriptionOneText")}
              </p>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourOneDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourOne.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourTwoDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourTwo.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourThreeDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourThree.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourFourDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourFour.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourFiveDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourFive.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourSixDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourSix.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFourSevenDescriptionBoldText")}
              </h6>
              <ol>
                {sectionFourSeven.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionFiveHeadingText")}
              </h6>
              <p>{t("privacyPolicy.sectionFiveDescriptionOneText")}</p>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionSixHeadingText")}
              </h6>
              <p>{t("privacyPolicy.sectionSixMainDescriptionText")}</p>
              <ol>
                {sectionSix.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionSevenHeadingText")}
              </h6>
              <p>{t("privacyPolicy.sectionSevenDescriptionOneText")}</p>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionEightHeadingText")}
              </h6>
              <p>{t("privacyPolicy.sectionEightDescriptionMainText")}</p>
              <ol>
                {sectionEight.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionNineHeadingText")}
              </h6>
              <ol>
                {sectionNine.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionTenHeadingText")}
              </h6>
              <p>{t("privacyPolicy.sectionTenDescriptionOneText")}</p>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionElevenHeadingText")}
              </h6>
              <p>{t("privacyPolicy.sectionElevenMainDescriptionText")}</p>
              <ol>
                {sectionEleven.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionTwelveHeadingText")}
              </h6>
              <ol>
                {sectionTwelve.map((item, index) => {
                  return <li key={index}>{item.description}</li>;
                })}
              </ol>

              <h6 className="fw-bold">
                {t("privacyPolicy.sectionThirteenHeadingText")}
              </h6>
              <p className="mb-0">
                {t("privacyPolicy.sectionThirteenDescriptionOneText")}
              </p>
              <p className="fw-bold mb-0">
                {t("privacyPolicy.emailText")}{" "}
                <span>
                  <a href="mailto:info@fitnee.fit">info@fitnee.fit</a>
                </span>
              </p>

              <p className="fw-bold">
                {t("privacyPolicy.whatsAppText")}{" "}
                <span>
                  <a href="tel:+966549836605">+966549836605</a>
                </span>
              </p>
            </div>
          </div>

          <Row className="justify-content-center mb-3">
            <Col md={4}>
              <OutlineBtn
                handleOnClick={goBack}
                className="w-100 py-3"
                text={t("termAndCondition.doneButtonText")}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;

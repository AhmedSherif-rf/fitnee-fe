import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import OutlineBtn from "../../../Shared/Buttons/OutlineBtn";

const TermAndCondition = () => {
  const navigate = useNavigate();
  const { type, backLink } = useParams();

  const { t, i18n } = useTranslation("");

  const goBack = () => {
    if (backLink === "home") {
      navigate("/");
    } else if (backLink === "signUp") {
      window.close();
    } else {
      navigate(`/${backLink}`);
    }
  };
  const sectionOne = [
    {
      heading: t("termAndCondition.general.sectionOneDescriptionTwoBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionTwoText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionThreeBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionThreeText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionFourBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionFourText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionFiveBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionFiveText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionSixBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionSixText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionSevenBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionSevenText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionEightBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionEightText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionNineBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionNineText"),
    },
    {
      heading: t("termAndCondition.general.sectionOneDescriptionTenBoldText"),
      description: t("termAndCondition.general.sectionOneDescriptionTenText"),
    },
    {
      heading: t(
        "termAndCondition.general.sectionOneDescriptionElevenBoldText"
      ),
      description: t(
        "termAndCondition.general.sectionOneDescriptionElevenText"
      ),
    },
    {
      heading: t(
        "termAndCondition.general.sectionOneDescriptionTwelveBoldText"
      ),
      description: t(
        "termAndCondition.general.sectionOneDescriptionTwelveText"
      ),
    },
  ];
  const sectionTwo = [
    {
      description: t("termAndCondition.general.sectionTwoDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionTwoDescriptionTwoText"),
    },
    {
      description: t("termAndCondition.general.sectionTwoDescriptionThreeText"),
    },
    {
      description: t("termAndCondition.general.sectionTwoDescriptionFourText"),
    },
  ];
  const sectionThree = [
    {
      description: t("termAndCondition.general.sectionThreeDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionThreeDescriptionTwoText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionThreeDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThreeDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThreeDescriptionFiveText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionThreeDescriptionSixText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionThreeDescriptionSevenText"
      ),
    },
  ];
  const sectionFour = [
    {
      description: t("termAndCondition.general.sectionFourDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionFourDescriptionTwoText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionFourDescriptionThreeText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionFourDescriptionFourText"),
    },
    {
      description: t("termAndCondition.general.sectionFourDescriptionFiveText"),
    },
    {
      description: t("termAndCondition.general.sectionFourDescriptionSixText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionFourDescriptionSevenText"
      ),
    },
  ];
  const sectionFive = [
    {
      description: t("termAndCondition.general.sectionFiveDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionFiveDescriptionTwoText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionFiveDescriptionThreeText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionFiveDescriptionFourText"),
    },
  ];
  const sectionSix = [
    {
      description: t("termAndCondition.general.sectionSixDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionSixDescriptionTwoText"),
    },
    {
      description: t("termAndCondition.general.sectionSixDescriptionThreeText"),
    },
    {
      description: t("termAndCondition.general.sectionSixDescriptionFourText"),
    },
  ];
  const sectionSeven = [
    {
      description: t("termAndCondition.general.sectionSevenDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionSevenDescriptionTwoText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionSevenDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSevenDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSevenDescriptionFiveText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionSevenDescriptionSixText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionSevenDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSevenDescriptionEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSevenDescriptionNineText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionSevenDescriptionTenText"),
    },
  ];
  const sectionEight = [
    {
      description: t("termAndCondition.general.sectionEightDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionEightDescriptionTwoText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionEightDescriptionThreeText"
      ),
    },
  ];
  const sectionNine = [
    {
      description: t("termAndCondition.general.sectionNineDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionNineDescriptionTwoText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionThreeText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionNineDescriptionFourText"),
    },
    {
      description: t("termAndCondition.general.sectionNineDescriptionFiveText"),
    },
    {
      description: t("termAndCondition.general.sectionNineDescriptionSixText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionEightText"
      ),
    },
    {
      description: t("termAndCondition.general.sectionNineDescriptionNineText"),
    },
    {
      description: t("termAndCondition.general.sectionNineDescriptionTenText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionElevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionTwelveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionThirteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionFourteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineDescriptionFifteenText"
      ),
    },
  ];
  const sectionTen = [
    {
      description: t("termAndCondition.general.sectionTenDescriptionOneText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionTwoText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionThreeText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionFourText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionFiveText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionSixText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionSevenText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionEightText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionNineText"),
    },
    {
      description: t("termAndCondition.general.sectionTenDescriptionTenText"),
    },
    {
      description: t(
        "termAndCondition.general.sectionTenDescriptionElevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTenDescriptionTwelveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTenDescriptionThirteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTenDescriptionFourteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTenDescriptionFifteenText"
      ),
    },
  ];
  const sectionEleven = [
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionElevenDescriptionNineText"
      ),
    },
  ];
  const sectionTwelve = [
    {
      description: t(
        "termAndCondition.general.sectionTwelveDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwelveDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwelveDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwelveDescriptionFourText"
      ),
    },
  ];
  const sectionFourteen = [
    {
      description: t(
        "termAndCondition.general.sectionFourteenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionFourteenDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionFourteenDescriptionThreeText"
      ),
    },
  ];
  const sectionFifteen = [
    {
      description: t(
        "termAndCondition.general.sectionFifteenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionFifteenDescriptionTwoText"
      ),
    },
  ];
  const sectionSixteen = [
    {
      description: t(
        "termAndCondition.general.sectionSixteenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSixteenDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSixteenDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSixteenDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSixteenDescriptionFiveText"
      ),
    },
  ];
  const sectionSeventeen = [
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionSeventeenDescriptionSevenText"
      ),
    },
  ];
  const sectionEighteen = [
    {
      description: t(
        "termAndCondition.general.sectionEighteenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionEighteenDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionEighteenDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionEighteenDescriptionFourText"
      ),
    },
  ];
  const sectionNineteen = [
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionNineText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionTenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionElevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionNineteenDescriptionTwelveText"
      ),
    },
  ];
  const sectionTwenty = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyDescriptionTwoText"
      ),
    },
  ];
  const sectionTwentyOne = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyOneDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyOneDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyOneDescriptionThreeText"
      ),
    },
  ];
  const sectionTwentyTwo = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyTwoDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyTwoDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyTwoDescriptionThreeText"
      ),
    },
  ];
  const sectionTwentyThree = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyThreeDescriptionSevenText"
      ),
    },
  ];
  const sectionTwentyFour = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFourDescriptionSevenText"
      ),
    },
  ];
  const sectionTwentyFive = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyFiveDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyFiveDescriptionTwoText"
      ),
    },
  ];
  const sectionTwentySix = [
    {
      description: t(
        "termAndCondition.general.sectionTwentySixDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentySixDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentySixDescriptionThreeText"
      ),
    },
  ];
  const sectionTwentySeven = [
    {
      description: t(
        "termAndCondition.general.sectionTwentySevenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentySevenDescriptionTwoText"
      ),
    },
  ];
  const sectionTwentyEight = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyEightDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyEightDescriptionTwoText"
      ),
    },
  ];
  const sectionTwentyNine = [
    {
      description: t(
        "termAndCondition.general.sectionTwentyNineDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyNineDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionTwentyNineDescriptionThreeText"
      ),
    },
  ];
  const sectionThirty = [
    {
      description: t(
        "termAndCondition.general.sectionThirtyDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyDescriptionTwoText"
      ),
    },
  ];
  const sectionThirtyOne = [
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyOneDescriptionNineText"
      ),
    },
  ];
  const sectionThirtyTwo = [
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionNineText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionTenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionElevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyTwoDescriptionTwelveText"
      ),
    },
  ];
  const sectionThirtyThree = [
    {
      description: t(
        "termAndCondition.general.sectionThirtyThreeDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyThreeDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyThreeDescriptionThreeText"
      ),
    },
  ];
  const sectionThirtyFour = [
    {
      description: t(
        "termAndCondition.general.sectionThirtyFourDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyFourDescriptionTwoText"
      ),
    },
  ];
  const sectionThirtyFive = [
    {
      description: t(
        "termAndCondition.general.sectionThirtyFiveDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyFiveDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtyFiveDescriptionThreeText"
      ),
    },
  ];
  const sectionThirtySeven = [
    {
      description: t(
        "termAndCondition.general.sectionThirtySevenDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.general.sectionThirtySevenDescriptionTwoText"
      ),
    },
  ];
  const ServiceProviderSectionOne = [
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionSixText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionSevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionNineText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionElevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwelveText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionThirteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionFourteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionFifteenText"
      ),
    },

    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionSixteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionSeventeenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionEighteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionNineteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyThreeText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyFourText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyFiveText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentySixText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentySevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyEightText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionTwentyNineText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionThirtyText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionThirtyOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionThirtyTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionOneDescriptionThirtyThreeText"
      ),
    },
  ];
  const ServiceProviderSectionTwo = [
    {
      description: t(
        "termAndCondition.serviceProviders.sectionTwoDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionTwoDescriptionTwoText"
      ),
    },
  ];
  const ServiceProviderSectionThree = [
    {
      description: t(
        "termAndCondition.serviceProviders.sectionThreeDescriptionOneText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionThreeDescriptionTwoText"
      ),
    },
    {
      description: t(
        "termAndCondition.serviceProviders.sectionThreeDescriptionThreeText"
      ),
    },
  ];
  const traineeSectionOne = [
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionOneText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionTwoText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionThreeText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionFourText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionFiveText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionSixText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionSevenText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionEightText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionNineText"),
    },
    {
      description: t("termAndCondition.trainee.sectionOneDescriptionTenText"),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionElevenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionTwelveText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionThirteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionFourteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionFifteenText"
      ),
    },

    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionSixteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionSeventeenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionEighteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionNineteenText"
      ),
    },
    {
      description: t(
        "termAndCondition.trainee.sectionOneDescriptionTwentyText"
      ),
    },
  ];
  const traineeSectionTwo = [
    {
      description: t("termAndCondition.trainee.sectionTwoDescriptionOneText"),
    },
    {
      description: t("termAndCondition.trainee.sectionTwoDescriptionTwoText"),
    },
    {
      description: t("termAndCondition.trainee.sectionTwoDescriptionThreeText"),
    },
    {
      description: t("termAndCondition.trainee.sectionTwoDescriptionFourText"),
    },
    {
      description: t("termAndCondition.trainee.sectionTwoDescriptionFiveText"),
    },
  ];
  const traineeSectionThree = [
    {
      description: t("termAndCondition.trainee.sectionThreeDescriptionOneText"),
    },
  ];
  const traineeSectionFour = [
    {
      description: t("termAndCondition.trainee.sectionFourDescriptionOneText"),
    },
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12}>
          <h1 className="text-center my-4 f-w-bold ">
            {type === "serviceProvider"
              ? t(
                  "termAndCondition.termAndConditionServiceProvidersHeadingText"
                )
              : type === "trainee"
              ? t("termAndCondition.termAndConditionTrainerHeadingText")
              : t("termAndCondition.termAndConditionHeadingText")}
          </h1>

          {type === "general" && (
            <div className={`${i18n.dir()}`}>
              <h6 className="fw-bold">
                {t("termAndCondition.general.welcomeText")}
              </h6>
              <p align="justify">
                {t("termAndCondition.general.welcomeDescriptionText")}
                <br />
              </p>

              <div>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionOneHeadingText")}
                </h6>
                <p align="justify">
                  {t("termAndCondition.general.sectionOneDescriptionOneText")}{" "}
                  <br />
                  {sectionOne.map((item, index) => {
                    return (
                      <span key={index}>
                        <span className="fw-bold">{item.heading}</span>
                        {item.description}
                        <br />
                      </span>
                    );
                  })}
                </p>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwoHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwo.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThreeHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThree.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionFourHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionFour.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionFiveHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionFive.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionSixHeadingText")}
                </h6>
                <p align="justify">
                  {t("termAndCondition.general.sectionSixMainDescriptionText")}{" "}
                </p>
                <ol>
                  {sectionSix.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionSevenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionSeven.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionEightHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionEight.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionNineHeadingText")}
                </h6>
                <p align="justify">
                  {t("termAndCondition.general.sectionNineMainDescriptionText")}{" "}
                </p>
                <ol>
                  {sectionNine.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>

                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionElevenHeadingText")}
                </h6>
                <p align="justify">
                  {t(
                    "termAndCondition.general.sectionElevenMainDescriptionText"
                  )}{" "}
                </p>
                <ol>
                  {sectionEleven.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwelveHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwelve.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirteenHeadingText")}
                </h6>
                <p align="justify">
                  {t(
                    "termAndCondition.general.sectionThirteenDescriptionOneText"
                  )}{" "}
                </p>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionFourteenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionFourteen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionFifteenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionFifteen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionSixteenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionSixteen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionSeventeenHeadingText")}
                </h6>
                <p align="justify">
                  {t(
                    "termAndCondition.general.sectionSeventeenMainDescriptionText"
                  )}
                </p>
                <ol>
                  {sectionSeventeen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionEighteenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionEighteen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionNineteenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionNineteen.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwenty.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyOneHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyOne.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyTwoHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyTwo.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyThreeHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyThree.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyFourHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyFour.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyFiveHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyFive.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentySixHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentySix.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentySevenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentySeven.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyEightHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyEight.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionTwentyNineHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionTwentyNine.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtyHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirty.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtyOneHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirtyOne.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtyTwoHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirtyTwo.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtyThreeHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirtyThree.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtyFourHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirtyFour.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtyFiveHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirtyFive.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtySixHeadingText")}
                </h6>
                <p align="justify">
                  {t(
                    "termAndCondition.general.sectionThirtySixMainDescriptionText"
                  )}{" "}
                </p>
                <h6 className="fw-bold">
                  {t("termAndCondition.general.sectionThirtySevenHeadingText")}
                </h6>
                <ol align="justify">
                  {sectionThirtySeven.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>
              </div>
            </div>
          )}
          {type === "serviceProvider" && (
            <div style={{ direction: i18n.dir() }}>
              <div>
                <h6 className="fw-bold">
                  {t("termAndCondition.serviceProviders.sectionOneHeadingText")}
                </h6>
                <ol align="justify">
                  {ServiceProviderSectionOne.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>

                <h6 className="fw-bold">
                  {t("termAndCondition.serviceProviders.sectionTwoHeadingText")}
                </h6>
                <ol align="justify">
                  {ServiceProviderSectionTwo.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>

                <h6 className="fw-bold">
                  {t(
                    "termAndCondition.serviceProviders.sectionThreeHeadingText"
                  )}
                </h6>
                <div>
                  <ol align="justify">
                    {ServiceProviderSectionThree.map((item, index) => {
                      return <li key={index}>{item.description}</li>;
                    })}
                  </ol>

                  <p className="p-0 m-0" align="justify">
                    {t(
                      "termAndCondition.serviceProviders.sectionThreeDescriptionThreeListOneText"
                    )}
                  </p>
                  <p className="p-0 m-0" align="justify">
                    {t(
                      "termAndCondition.serviceProviders.sectionThreeDescriptionThreeListTwoText"
                    )}
                  </p>
                  <p className="p-0 m-0" align="justify">
                    {t(
                      "termAndCondition.serviceProviders.sectionThreeDescriptionThreeListThreeText"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          {type === "trainee" && (
            <div className={`${i18n.dir()}`}>
              <div>
                <h6 className="fw-bold">
                  {t("termAndCondition.trainee.sectionOneHeadingText")}
                </h6>
                <ol align="justify">
                  {traineeSectionOne.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>

                <h6 className="fw-bold">
                  {t("termAndCondition.trainee.sectionTwoHeadingText")}
                </h6>
                <ol align="justify">
                  {traineeSectionTwo.map((item, index) => {
                    return <li key={index}>{item.description}</li>;
                  })}
                </ol>

                <h6 className="fw-bold">
                  {t("termAndCondition.trainee.sectionThreeHeadingText")}
                </h6>
                <p align="justify">
                  {traineeSectionThree.map((item, index) => {
                    return <span key={index}>{item.description}</span>;
                  })}
                </p>
                <h6 className="fw-bold">
                  {t("termAndCondition.trainee.sectionFourHeadingText")}
                </h6>
                <p align="justify">
                  {traineeSectionFour.map((item, index) => {
                    return <span key={index}>{item.description}</span>;
                  })}
                </p>
              </div>
            </div>
          )}

          <Row className="justify-content-center mb-3">
            <Col md={4}>
              <OutlineBtn
                handleOnClick={goBack}
                className="w-100 py-3 my-3"
                text={t("termAndCondition.doneButtonText")}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TermAndCondition;

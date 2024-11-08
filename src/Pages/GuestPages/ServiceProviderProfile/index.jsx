import React from "react";
import ServiceProviderProfileWrapper from "../../../Shared/ServiceProviderProfileWrapper";

const ServiceProviderProfile = () => {
  return (
    <React.Fragment>
      <ServiceProviderProfileWrapper
        subscriptionLink={"/guest/serviceProvider/subscription"}
      />
    </React.Fragment>
  );
};

export default ServiceProviderProfile;

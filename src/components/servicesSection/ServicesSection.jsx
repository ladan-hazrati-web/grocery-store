import React from "react";

import ServiceCard from "./ServiceCard";
import { services } from "./servicesData";
import ResponsiveContainer from "../responsive/ResponsiveContainer";

function ServicesSection() {
  return (
    <ResponsiveContainer type="services">
      <div className="w-fit flex justify-between flex-wrap bg-white">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            isMiddleCard={index === 1}
          />
        ))}
      </div>
    </ResponsiveContainer>
  );
}

export default ServicesSection;

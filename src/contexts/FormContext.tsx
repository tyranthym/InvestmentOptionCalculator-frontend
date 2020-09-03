import React, { createContext, useState } from "react";
import { CalculateROIRequest } from "../models/requests";

interface IFormDataState {
  calculateROIRequest: CalculateROIRequest;
}

type FormContextType = {
  formDataState: IFormDataState;
  updateFormData: (calculateROIRequest: CalculateROIRequest) => void;
};

export const FormContext = createContext<FormContextType>({
  formDataState: {
    calculateROIRequest: {
      totalAmount: 100000,
      options: [],
    },
  },
  updateFormData: () => {},
});

const FormContextProvider = (props: { children: React.ReactNode }) => {
  //state hooks
  const [formData, setFormData] = useState<IFormDataState>({
    calculateROIRequest: {
      totalAmount: 100000,
      options: [],
    },
  });

  const updateFormData = (calculateROIRequest: CalculateROIRequest) => {
    console.log(calculateROIRequest);
    const newFormData = { ...formData };
    newFormData.calculateROIRequest = calculateROIRequest;
    console.log(newFormData);
    setFormData(newFormData);
  };

  return (
    <FormContext.Provider value={{ formDataState: formData, updateFormData }}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;

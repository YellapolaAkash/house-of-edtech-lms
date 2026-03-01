import React, { createContext, useContext, useState } from "react";

type EnrollContextType = {
  enrolled: number[];
  enrollCourse: (id: number) => void;
  isEnrolled: (id: number) => boolean;
};

const EnrollContext = createContext<EnrollContextType | undefined>(
  undefined
);

export const EnrollProvider = ({ children }: any) => {
  const [enrolled, setEnrolled] = useState<number[]>([]);

  const enrollCourse = (id: number) => {
    if (!enrolled.includes(id)) {
      setEnrolled([...enrolled, id]);
    }
  };

  const isEnrolled = (id: number) => {
    return enrolled.includes(id);
  };

  return (
    <EnrollContext.Provider
      value={{ enrolled, enrollCourse, isEnrolled }}
    >
      {children}
    </EnrollContext.Provider>
  );
};

export const useEnroll = () => {
  const context = useContext(EnrollContext);
  if (!context) {
    throw new Error("useEnroll must be used within EnrollProvider");
  }
  return context;
};
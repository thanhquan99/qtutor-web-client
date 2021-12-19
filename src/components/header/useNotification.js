import React, { useState, useEffect } from "react";
import { getNotifiNumber } from "../../api/notification";
const useApp = () => {
  const fetchNumber = async () => {
    await getNotifiNumber()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("loi roi ");
        }
      });
  };
  useEffect(() => {
    fetchNumber();
  }, []);
  return {};
};
export default useApp;

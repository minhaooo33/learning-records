import { useState } from "react";

export function useInput(defaultValue, validateFn) {
  const [enterValue, setEnterValue] = useState(defaultValue);
  const [inputIsInvalid, setInputIsInvalid] = useState({}); // 儲存驗證結果

  function handleEnterValue(event) {
    const { name, value } = event.target; // 取得 input 的 name 屬性 (email 或 password)

    setEnterValue((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        value: value, // 更新對應的輸入值
        didBlur: false,
      },
    }));
    // 每次輸入時即時驗證
    if (validateFn && validateFn[name]) {
      setInputIsInvalid((prevErrors) => ({
        ...prevErrors,
        [name]: !validateFn[name](value),
      }));
    }
  }

  function handleInputBlur(event) {
    const { name } = event.target;

    setEnterValue((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        didBlur: true,
      },
    }));

    //  失焦時驗證
    if (validateFn && validateFn[name]) {
      setInputIsInvalid((prevErrors) => ({
        ...prevErrors,
        [name]: !validateFn[name](enterValue[name].value),
      }));
    }
  }

  function handleReset(event) {
    event.preventDefault();
    // 讓所有欄位回到 `defaultValue`
    setEnterValue((prevValues) => {
      const resetValues = {};
      for (const key in prevValues) {
        resetValues[key] = { value: "", didBlur: false };
      }
      return resetValues;
    });
  }

  return {
    enterValue,
    handleEnterValue,
    handleInputBlur,
    handleReset,
    inputIsInvalid,
  };
}

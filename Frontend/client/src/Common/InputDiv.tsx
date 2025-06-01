import React, { useState } from "react";
import { FunctionBody } from "typescript";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

type InputDivType = {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChangeHandler: (e: any) => void;
  error?: any;
};
const InputDiv = ({ type, placeholder, name, value, onChangeHandler, error }: InputDivType) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: any) => !e.target.value && setIsFocused(false);

  return (
    <>
      <div
        className="w-100 position-relative rounded-2 inputDiv"
        style={{
          border: "2px solid",
          backgroundColor: "transparent",
          borderColor: `${isFocused ? "#433878" : "#bcbaba"}`,
        }}
      >
        <input
          type={passwordShow ? "text" : type}
          className=" py-2 pl-4 px-5 rounded border-0 fw-semibold"
          name={name}
          value={value}
          onChange={(e) => onChangeHandler(e)}
          autoComplete="new-password" // Or a unique string
          style={{ outline: 0, width: "400px" }}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e)}
        />
        <span
          className="position-absolute px-3"
          style={{
            top: isFocused ? "-10px" : "8px",
            fontSize: isFocused ? "12px" : "16px",
            left: "25px",
            fontWeight: "600",
            color: `${isFocused ? "#433878" : "#bcbaba"}`,
            background: "white",
            transition: "top 0.2s ease",
            cursor: "pointer",
            pointerEvents: "none",
          }}
        >
          {placeholder}
        </span>

        {type == "password" && (
          <span>
            <FontAwesomeIcon
              icon={passwordShow ? faEye : faEyeSlash}
              onClick={() => setPasswordShow(!passwordShow)}
              className="position-absolute"
              style={{
                top: "30%",
                right: "5%",
                transition: "top 0.2s ease",
                cursor: "pointer", // Change cursor to pointer for better UX
              }}
            />
          </span>
        )}
      </div>
      {error && (
        <div className="text-danger fw-bold mt-2" style={{ fontSize: "12px" }}>
          {error}
        </div>
      )}
    </>
  );
};

export default InputDiv;

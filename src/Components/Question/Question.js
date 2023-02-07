import React, { useState,useEffect } from "react";
import style from "./Question.module.css";
import { Formik, Form, Field } from "formik";
import QuestionSchema from "../../Schema/QuestionSchema";
const Question = ({
  question,
  index,
  setindex,
  length,
  answers,
  setanswers,
}) => {
  // console.log(index);
// useEffect(() => {
//  console.log(ans)
// }, )

  const [single, setsingle] = useState(null);
  const [multiple, setmultiple] = useState([]);
  console.log("single", single);
  console.log("multiple", multiple);
  const singleChange = (e) => {
    const temp=e.target.value
    setsingle(temp);
  };
  const multipleChange = (e) => {
    if (e.target.checked) {
      const temp=[...multiple,e.target.value]
      setmultiple(temp);
    } else {
      const temp=multiple.filter((item) => item !== e.target.value)
      setmultiple(temp);
    }
  };
  const nextClick = (e) => {
    e.preventDefault();
    const found = answers.some((el) => el.id === question.id);
    if (found) {
      const upd_obj = answers.map((obj) => {
        if (obj.id == question.id) {
          obj.ans = question.type === "single" ? single : multiple;
        }
        return obj;
      });
      setanswers(upd_obj);
    } else {
      setanswers([
        ...answers,
        {
          id: question.id,
          ans: question.type === "single" ? single : multiple,
        },
      ]);
    }
    setsingle(null);
    setmultiple([]);
    e.target.reset();
    setindex((prev) => prev + 1);
    // if(index==length){
    //   updateResult()
    // }
  };
  console.log("ans", answers);
  const backClick = (e) => {
    e.preventDefault();
    setindex((prev) => prev - 1);
    console.log(question.id, "q iddd");
    const object = answers.find((obj) => obj.id === question.id - 1);
    console.log("object", object);
    question.type === "single"
      ? setsingle(object.ans)
      : setmultiple(object.ans);
  };
  return (
    // <div className={`${style.box}`}>
    <div className={style.quesBox}>
      <h4>
        Question {index + 1} of {length}
      </h4>
      {/* if(index + 1 === length){ nextClick(e);console.log("anssssss",answers);} else {nextClick(e)} */}
      <form onSubmit={(e)=>{e.preventDefault();(single || multiple.length>0) && nextClick(e)}}>
        <div className={style.question}>Q: {question.question}</div>
        {question.type === "single" ? (
          <div
            className={`row ${style.option}`}
            role="group"
            aria-labelledby="my-radio-group"
          >
            {question.answers.map((element, index) => (
              <label className={`col-lg-6`} key={index}>
                <input
                  className={style.checkboxinput}
                  type="radio"
                  name="answer"
                  id={index}
                  onChange={singleChange}
                  value={element}
                  checked={answers.find(
                    (el) => el.id === question.id && el.ans === element
                  )}
                />
                <span className="mx-2">{element} </span>
              </label>
            ))}
          </div>
        ) : (
          <div
            className={`row ${style.option}`}
            role="group"
            aria-labelledby="my-radio-group"
          >
            {question.answers.map((element, index) => (
              <label className={`col-lg-6`} key={index}>
                <input
                  className={style.checkboxinput}
                  type="checkbox"
                  name="answer"
                  id={index}
                  value={element}
                  onChange={multipleChange}
                  checked={answers.find(
                    (el) => el.id === question.id && el.ans.includes(element)
                  )}
                />
                <span className="mx-2">{element} </span>
              </label>
            ))}
          </div>
        )}
        <div className={`${style.submitBtn}`}>
          <button disabled={index === 0} onClick={backClick}>
            Back
          </button>
          <button type="submit" >
            {index + 1 === length ? "Sumbit" : "Next"}
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default Question;

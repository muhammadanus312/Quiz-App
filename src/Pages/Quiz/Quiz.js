import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Question from "../../Components/Question/Question";
import style from "./Quiz.module.css";
import ReactStopwatch from "react-stopwatch";
import Result from "../../Components/Result/Result";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "10*10 ?",
      answers: ["10", "20", "30", "100"],
      correct: "100",
      type: "single",
      points: 10,
    },
    {
      id: 2,
      question: "20*10 ?",
      answers: ["10", "200", "300", "100"],
      correct: "200",
      type: "single",
      points: 10,
    },
    {
      id: 3,
      question: "10*5 ?",
      answers: ["90", "50", "30", "100"],
      correct: "50",
      type: "single",
      points: 10,
    },
    {
      id: 4,
      question: "2*10 ?",
      answers: ["80", "20", "30", "100"],
      correct: "20",
      type: "single",
      points: 10,
    },

    {
      id: 5,
      question: "8*8 ?",
      answers: ["80", "60+4", "64", "60"],
      correct: ["60+4", "64"],
      type: "multiple",
      points: 10,
    },
    {
      id: 6,
      question: "2*10 ?",
      answers: ["80", "20", "twenty", "200"],
      correct: ["20", "twenty"],
      type: "multiple",
      points: 10,
    },
    {
      id: 7,
      question: "3*3 ?",
      answers: ["80", "nine", "9", "200"],
      correct: ["9", "nine"],
      type: "multiple",
      points: 10,
    },
  ];

  const [finalResult, setfinalResult] = useState({});
  const [userAns, setuserAns] = useState([]);
  const [index, setindex] = useState(0);
  console.log("userAns", userAns, index);
  const calculateResult = () => {
    let FinalAns = userAns;
    // e.preventDefault()
    let result = {
      corrected: 0,
      score: 0,
      totalPoints: 0,
    };
    questions.map((element, pos) => {
      result = {
        ...result,
        totalPoints: result.totalPoints + element.points,
      };
      if (element.type === "single") {
        if (element.correct === userAns[pos].ans) {
          FinalAns = FinalAns.map((item) =>
            item.id === element.id ? { ...item, status: "corrected" } : item
          );
          // setuserAns(finalResult);
          result = {
            ...result,
            corrected: result.corrected + 1,
            score: result.score + element.points,
          };
        } else {
          FinalAns = FinalAns.map((item) =>
            item.id === element.id ? { ...item, status: "wrong" } : item
          );
          // setuserAns(finalResult);
        }
      } else {
        let flag = 0;
        console.log("length", userAns, "pos", pos);
        for (let i = 0; i < userAns[pos].ans.length; i++) {
          if (element.correct.includes(userAns[pos].ans[i])) {
            flag = 1;
          } else {
            // console("flag",flag)
            flag = 0;
            break;
          }
        }
        if (flag === 1 && element.correct.length === userAns[pos].ans.length) {
          FinalAns = FinalAns.map((item) =>
            item.id === element.id ? { ...item, status: "corrected" } : item
          );
          // setuserAns(finalResult);
          result = {
            ...result,
            corrected: result.corrected + 1,
            score: result.score + element.points,
          };
        } else {
          FinalAns = FinalAns.map((item) =>
            item.id === element.id ? { ...item, status: "wrong" } : item
          );
          // setuserAns(finalResult);
        }
      }
    });
    console.log("Result", result);
    setfinalResult(result);
    console.log(FinalAns);
    setuserAns(FinalAns);
  };
  useEffect(() => {
    if (index === questions.length) {
      console.log(index, "===", questions.length);
      calculateResult();
    }
  }, [index]);

  return (
    <Container className={`${style.container}`}>
      <h1>Math Quiz</h1>
      {/* <ReactStopwatch
        seconds={0}
        minutes={0}
        hours={0}
        limit="00:02:00"
        onChange={({ hours, minutes, seconds }) => {
          // do something
        }}
        onCallback={() => console.log("Finish")}
        render={({ formatted, hours, minutes, seconds }) => {
          return (
            <div>
              <p className="fw-bold">Time: {formatted}</p>
            </div>
          );
        }}
      /> */}
      {index < questions.length ? (
        <Question
          question={questions[index]}
          index={index}
          setindex={setindex}
          length={questions.length}
          answers={userAns}
          setanswers={setuserAns}
          calculateResult={calculateResult}
        />
      ) : (
        <div className={style.res}>
          <h1 className="fw-bold">Result</h1>
          <Result questions={questions} finalResult={finalResult} />

          <div>
            {questions.map((question, num) => (
              <div className={style.quesBox}>
                <div className={style.head}>
                  <h4>Question {num + 1}</h4>
                  {userAns.find(
                    (el) => el.id === question.id && el.status === "wrong"
                  ) && (
                    <div>
                      <ImCross className={style.cross} />{" "}
                      <span className={style.cross}>Wrong!!!</span>
                    </div>
                  )}
                </div>

                <form>
                  <div className={style.question}>Q: {question.question}</div>
                  {question.type === "single" ? (
                    <div
                      className={`row ${style.option}`}
                      role="group"
                      aria-labelledby="my-radio-group"
                    >
                      {question.answers.map((element, index) => (
                        <label className={`col-lg-6`} key={index}>
                          {/* <input
                            // disabled
                            className={style.checkboxinput}
                            type="radio"
                            name="answer"
                            id={index}
                            value={element}
                            // onChange={(e)=>{e.preventDefault()}}
                            checked={userAns.find(
                              (el) => el.id === question.id && el.ans === element
                            )}
                          /> */}
                          <span
                            className={`${style.optionItem} ${
                              userAns.find(
                                (el) =>
                                  el.id === question.id && el.ans === element
                              )
                                ? style.yellow
                                : userAns.find(
                                    (el) =>
                                      el.id === question.id &&
                                      question.correct === element
                                  )
                                ? style.green
                                : ""
                            }`}
                          >
                            {element}
                          </span>

                          {/* wrong icon */}
                          {userAns.find(
                            (el) =>
                              el.id === question.id && el.status === "wrong"
                          ) &&
                            userAns.find(
                              (el) =>
                                el.id === question.id && el.ans === element
                            ) && (
                              <span>
                                <ImCross className={style.cross} />
                              </span>
                            )}

                          {/* right icon */}
                          {userAns.find(
                            (el) =>
                              el.id === question.id && el.status === "corrected"
                          ) &&
                            userAns.find(
                              (el) =>
                                el.id === question.id && el.ans === element
                            ) && (
                              <span>
                                <TiTick className={style.right} />
                              </span>
                            )}
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
                          {/* <input
                            // disabled
                            // onChange={(e)=>{e.preventDefault()}}ho
                            className={style.checkboxinput}
                            type="checkbox"
                            name="answer"
                            id={index}
                            value={element}
                            checked={userAns.find(
                              (el) => el.id === question.id && el.ans.includes(element)
                            )}
                          /> */}
                          <span
                            className={`${style.optionItem} ${
                              userAns.find(
                                (el) =>
                                  el.id === question.id &&
                                  el.ans.includes(element)
                              )
                                ? style.yellow
                                : userAns.find(
                                    (el) =>
                                      el.id === question.id &&
                                      question.correct.includes(element)
                                  )
                                ? style.green
                                : ""
                            }`}
                          >
                            {element}{" "}
                          </span>

                          {/* Wrong icon */}
                          {userAns.find(
                            (el) =>
                              el.id === question.id && el.status === "wrong"
                          ) &&
                            userAns.find(
                              (el) =>
                                el.id === question.id &&
                                el.ans.includes(element)
                            ) &&
                            !question.correct.includes(element) && (
                              <span>
                                <ImCross className={style.cross} />
                              </span>
                            )}

                          {/* right icon */}
                          {userAns.find(
                            (el) =>
                              el.id === question.id && el.ans.includes(element)
                          ) &&
                            question.correct.includes(element) && (
                              <span>
                                <TiTick className={style.right} />
                              </span>
                            )}
                        </label>
                      ))}
                    </div>
                  )}
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Quiz;

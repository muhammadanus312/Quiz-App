import * as Yup from 'yup'
const TodoSchema = Yup.object().shape({
    answer: Yup.string()
      .required("Kindly select answer"),
    answers: Yup.array()
      .required("Kindly select answer"),
  
  });
  export default TodoSchema
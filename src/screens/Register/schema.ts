import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  title: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Informe um valor positivo")
    .required("O Valor é obrigatório"),
});

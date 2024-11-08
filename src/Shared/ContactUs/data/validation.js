import * as Yup from "yup";
import TranslationHelper from "../../TranslationHelper";
export const CONTACT_US_SCHEMA = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z ]+$/,  TranslationHelper("validation.invalidFirstNameText"))
    .min(2, TranslationHelper("validation.tooShortText"))
    .max(50, TranslationHelper("validation.tooLongText"))
    .required( TranslationHelper("validation.requiredFirstNameText")),
  last_name: Yup.string()
    .matches(/^[A-Za-z ]+$/, TranslationHelper("validation.invalidLastNameText"))
    .min(2,TranslationHelper("validation.tooShortText"))
    .max(50, TranslationHelper("validation.tooLongText"))
    .required( TranslationHelper("validation.requiredLastNameText")),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      TranslationHelper("validation.invalidEmailText")
    )
    .required( TranslationHelper("validation.requiredEmailText")),
  phone: Yup.string().required(TranslationHelper("validation.requiredContactText")),
  message: Yup.string()
    .min(5, TranslationHelper("validation.tooShortText"))
    .max(500, TranslationHelper("validation.tooLongText"))
    .required(TranslationHelper("validation.requiredMessageText")),
});

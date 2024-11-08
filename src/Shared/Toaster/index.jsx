import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck, FaXmark } from "react-icons/fa6";

class Toaster {
  static async success(message, translate = true) {
    try {
      if (
        localStorage.getItem("Website_Language__fitnee") === "ar" &&
        translate === true
      ) {
        const response = await axios.post(
          `${process.env.REACT_APP_GOOGLE_TRANSLATE_API_URL}?key=${process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY}`,
          {
            q: message,
            target: localStorage.getItem("Website_Language__fitnee"),
          }
        );

        message = response.data.data.translations[0].translatedText;
      }

      const direction =
        localStorage.getItem("Website_Language__fitnee") === "en"
          ? "ltr"
          : "rtl";

      toast.success(message, {
        position: "top-right",
        icon: <FaCheck color="green" />,
        style: {
          borderRadius: "10px",
          background:
            "linear-gradient(90deg, #F6E709 -2.97%, #EDE809 21.19%, #D4EB09 61.98%, #ADF109 113.34%, #8EF609 148.08%)",
          color: "#333",
          direction: direction,
        },
      });
    } catch (error) {
      console.error("Error translating text:", error);
    }
  }

  static async error(message, translate = true) {
    try {
      if (message !== "" && message !== undefined) {
        if (
          localStorage.getItem("Website_Language__fitnee") === "ar" &&
          translate === true
        ) {
          const response = await axios.post(
            `${process.env.REACT_APP_GOOGLE_TRANSLATE_API_URL}?key=${process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY}`,
            {
              q: message,
              target: localStorage.getItem("Website_Language__fitnee"),
            }
          );

          message = response.data.data.translations[0].translatedText;
        }

        const direction =
          localStorage.getItem("Website_Language__fitnee") === "en"
            ? "ltr"
            : "rtl";

        toast.error(message, {
          position: "top-right",
          icon: <FaXmark color="red" />,
          style: {
            borderRadius: "10px",
            background:
              "linear-gradient(90deg, #F6E709 -2.97%, #EDE809 21.19%, #D4EB09 61.98%, #ADF109 113.34%, #8EF609 148.08%)",
            color: "#333",
            direction: direction,
          },
        });
      }
    } catch (error) {
      console.error("Error translating text:", error);
    }
  }

  static info(message) {
    toast.info(message, { position: toast.POSITION.TOP_RIGHT });
  }

  static warning(message) {
    toast.warning(message, { position: toast.POSITION.TOP_RIGHT });
  }
}

export default Toaster;

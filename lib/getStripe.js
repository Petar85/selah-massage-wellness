import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe("pk_test_51MSVqAIfSsxl3S8n6QdXvSodawuL6o9DsF4384Ag7dbKJPCJSIzqU8jG4zYmtdFhmCfLjdUYLGLJ4hR2XilRAjcT00JnR2MJ0s");
  }

  return stripePromise;
}

export default getStripe;
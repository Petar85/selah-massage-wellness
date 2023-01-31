import Stripe from "stripe";

const stripe = new Stripe("sk_test_51MSVqAIfSsxl3S8nlZLQdfBqkri6Ln6CqsMQCNYB0j370cp4IsljlV22LhMZeZw4qSxIODBpzguih2sKQAPLn6LR005RbaAbQV");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: 'shr_1MVRSpIfSsxl3S8npLUKXXZ7' },
              ],
              line_items: req.body.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/9n1o0041/production/').replace('-jpg', '.jpg');

                return {
                  price_data: { 
                    currency: 'usd',
                    product_data: { 
                      name: item.name,
                      images: [newImage],
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                  },
                  quantity: item.quantity
                }
              }),
              success_url: `${req.headers.origin}/success`,
              cancel_url: `${req.headers.origin}/canceled`,
              }
              
          
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
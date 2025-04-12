const { toast } = require("react-hot-toast");
const { capturepaymentUrl } = require("./api");

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  })
}

export const buyCourse = async (token,courses,userDetails,navigate,dispatch) => {
  const toastId=toast.loading("Loading...");
  try {
    //load script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
    //initiate the order
    const orderResponse = await apiConnector("POST",capturepaymentUrl,{courses},{Authorization:`Bearer ${token}`});

    if(!orderResponse.data.success){
      toast.error("Order failed");
      throw new Error(orderResponse.data.message);
    }
    
    //create option
    //add courses
    const rxlogo=require("../assets/Logo/rzp_logo.png");
    const options = {
      key:process.env.REACT_APP_RAZORPAY_KEY,
      amount:orderResponse.data.amount,
      currency:orderResponse.data.currency,
      order_id:orderResponse.data.id,
      name:"CodeBoost",
      description:"Thank You For Purchasing Course",
      image:rxlogo,
      prefill: {
        name:userDetails.firstName,
        email:userDetails.email,
      },
      handler:(response)=>{
        //send successful mail
        sendPaymentSuccessMail(response,orderResponse.data.amount,token);

        //verify payment
        verifyPayment({...response,courses},token,navigate,dispatch);

      }
    }

    
  } catch (error) {
    console.log(error);
    toast.error("Payment Failed");
  }
  toast.dismiss(toastId); 
}


async function sendPaymentSuccessMail(response,amount,token,) {
  try {
     
  } catch (error) {
    
  }  
}
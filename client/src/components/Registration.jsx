import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward, IoMdPerson } from "react-icons/io";
import Profile from "../assets/profile.png";
import logo from "../assets/CyberHunterLogo.png";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert } from "flowbite-react";
import { FaCheckCircle, FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

export default function Registration() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUpload, setImageFileUpload] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const size = 2 * 1024 * 1024;
    if (file && file.size < size) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    } else {
      setImageFileUploadError(
        "Couldn't upload an image (File must be less then 2MB or not in Image Formet)"
      );
      setImageFileUploadingProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUpload(false);
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    // setImageFileUpload(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Couldn't upload an image (File must be less then 2MB or not in Image Formet)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUpload(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFile(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImageFileUpload(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (imageFileUrl) {
      setFormData({ ...formData, profilePicture: imageFileUrl });
    }
  }, [imageFileUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSubmit50 = async () => {
    // Check if terms are accepted
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return; // Exit function
    }

    // Check if all required form fields are filled
    if (
      !formData.name ||
      !formData.qId ||
      !formData.course ||
      !formData.sessionYear ||
      !formData.section ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.gender ||
      !formData.branch ||
      !formData.profilePicture
    ) {
      toast.error("Please fill all the required fields.");
      return; // Exit function
    }

    try {
      // Send a POST request to create an order
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: 52,
          currency: "INR",
          receipt: "receipt#1",
        }),
      });

      // Handle the response from the server
      const { data } = await response.json();

      // Check if order creation was successful
      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      // Destructure the response data to get the order details
      const { id: order_id, currency } = data;

      // Set up Razorpay payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this matches your .env file
        amount: 52 * 100, // Amount in paise (INR)
        currency: currency,
        order_id: order_id,
        name: "Cyber Hunter",
        description: "Test Transaction",
        image: logo,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          try {
            // Verify payment on the backend
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentId, orderId, signature }),
              }
            );

            const verifyData = await verifyResponse.json();

            // Handle payment verification response
            if (verifyData.status === "success") {
              alert("Payment Successful");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            toast.error("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Initialize Razorpay payment
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      // Handle errors in creating an order or during payment processing
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };
  const handleSubmit100 = async () => {
    // Check if terms are accepted
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return; // Exit function
    }

    // Check if all required form fields are filled
    if (
      !formData.name ||
      !formData.qId ||
      !formData.course ||
      !formData.sessionYear ||
      !formData.section ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.gender ||
      !formData.branch ||
      !formData.profilePicture
    ) {
      toast.error("Please fill all the required fields.");
      return; // Exit function
    }

    try {
      // Send a POST request to create an order
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: 103,
          currency: "INR",
          receipt: "receipt#1",
        }),
      });

      // Handle the response from the server
      const { data } = await response.json();

      // Check if order creation was successful
      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      // Destructure the response data to get the order details
      const { id: order_id, currency } = data;

      // Set up Razorpay payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this matches your .env file
        amount: 103 * 100, // Amount in paise (INR)
        currency: currency,
        order_id: order_id,
        name: "Cyber Hunter",
        description: "Test Transaction",
        image: logo,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          try {
            // Verify payment on the backend
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentId, orderId, signature }),
              }
            );

            const verifyData = await verifyResponse.json();

            // Handle payment verification response
            if (verifyData.status === "success") {
              alert("Payment Successful");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            toast.error("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Initialize Razorpay payment
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      // Handle errors in creating an order or during payment processing
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="relative z-10 w-full h-auto flex flex-col justify-center items-center px-4 md:my-0 my-10 md:px-0">
      <h3 className="my-8 text-white font-medium text-center">
        Register Yourself with{" "}
        <span className="text-[#5CE1E6]">CYBER HUNTER CLUB</span>
      </h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || Profile}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        {/* 1st row */}
        <div className="w-full flex flex-col md:flex-row mt-8 justify-evenly items-center">
          <div className="relative w-10/12 md:w-3/12">
            <IoMdPerson className="absolute left-4 top-6 text-[#5CE1E6] h-6 w-6" />
            <input
              type="text"
              id="name"
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full m-4 pl-10 md:pl-8 placeholder:font-semibold  text-white bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            />
          </div>
          {/*  */}
          <div className="relative w-10/12 md:w-3/12">
            <FaIdCard className="absolute left-4 top-6 text-[#5CE1E6] h-6 w-6" />
            <input
              type="text"
              id="qId"
              onChange={handleChange}
              placeholder="Q-Id"
              required
              className="w-full m-4 pl-10 md:pl-8 placeholder:font-semibold text-white bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
          <div className="relative w-10/12 md:w-3/12">
            <MdEmail className="absolute left-4 top-6 text-[#5CE1E6] h-6 w-6" />
            <input
              type="email"
              id="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full m-4 pl-10 md:pl-8 placeholder:font-semibold  text-white bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            />
          </div>
          <div className="relative w-10/12 md:w-3/12">
            <IoIosArrowForward className="absolute left-2 top-6 text-[#5CE1E6] h-6 w-6" />
            <select
              required
              id="gender"
              onChange={handleChange}
              className="w-full m-4 pl-10 md:pl-4 font-bold text-gray-500 bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* 2nd row */}
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
          <div className="relative w-10/12 md:w-3/12">
            <IoIosArrowForward className="absolute left-2 top-6 text-[#5CE1E6] h-6 w-6" />
            <select
              required
              id="course"
              onChange={handleChange}
              className="w-full m-4 pl-10 md:pl-4 font-bold text-gray-500 bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            >
              <option value="">Program</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="relative w-10/12 md:w-3/12">
            <IoIosArrowForward className="absolute left-2 top-6 text-[#5CE1E6] h-6 w-6" />
            <input
              type="text"
              id="branch"
              onChange={handleChange}
              placeholder="Branch"
              required
              className="w-full m-4 pl-10 md:pl-4 placeholder:font-semibold  text-white bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            />
          </div>
        </div>

        {/* 3rd row */}
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
          <div className="relative w-10/12 md:w-3/12">
            <IoIosArrowForward className="absolute left-2 top-6 text-[#5CE1E6] h-6 w-6" />
            <select
              required
              onChange={handleChange}
              id="sessionYear"
              className="w-full m-4 pl-10 md:pl-4 font-bold text-gray-500 bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            >
              <option value="">Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>
          <div className="relative w-10/12 md:w-3/12">
            <IoIosArrowForward className="absolute left-2 top-6 text-[#5CE1E6] h-6 w-6" />
            <input
              type="text"
              id="section"
              onChange={handleChange}
              placeholder="Section"
              required
              className="w-full m-4 pl-10 md:pl-4 placeholder:font-semibold  text-white bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            />
          </div>
        </div>
        {/* 4th row */}
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
          <div className="relative w-10/12 md:w-3/12">
            <FaPhoneAlt className="absolute left-4 top-6 text-[#5CE1E6] h-6 w-6" />
            <input
              type="tel"
              id="phoneNumber"
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full m-4 pl-10 md:pl-8 placeholder:font-semibold  text-white bg-transparent border-[white] border-b border-0 outline-none focus:ring-2 focus:ring-transparent"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center mt-4">
          <div className="w-10/12 md:w-3/12 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-white">
              I accept the{" "}
              <span className="text-[#5CE1E6] cursor-pointer">
                terms and conditions
              </span>
            </label>
          </div>
        </div>

        <div className="text-white my-8 flex items-center justify-center flex-col">
          <h2 className="text-2xl font-semibold mb-4">Payment Section</h2>
          <div className="flex flex-col item-center justify-center px-10 md:w-[calc(100vw-240px)] rounded-lg bg-[#2525258e] p-4 gap-4">
            <h3 className="text-xl text-center font-semibold text-[#00D8FF]">
              Select a plan
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-72 flex gap-2 flex-col rounded-lg border border-[#00D8FF] p-4">
                <h4 className="font-semibold">Club Registration</h4>
                <h2 className="mb-8">
                  ₹<span className="text-4xl font-bold text-[#00D8FF]">50</span>{" "}
                </h2>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>Club Registration</p>
                </div>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>Club Classes and Guidence</p>
                </div>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>Eligible For upcomming web services</p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit50}
                  className="px-4 py-2 rounded-lg my-4 bg-[#00D8FF] font-semibold"
                >
                  Pay & Submit
                </button>
              </div>
              <div className="w-72 flex gap-2 flex-col rounded-lg border border-[#00D8FF] p-4">
                <h4 className="font-semibold">
                  Club Registration <span className="text-sm">+</span>{" "}
                  <span className="text-[#00D8FF]">Official Id Card</span>
                </h4>
                <h2 className="mb-8">
                  ₹
                  <span className="text-4xl font-bold text-[#00D8FF]">100</span>{" "}
                </h2>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>Club Registration</p>
                </div>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>Club Classes and Guidence</p>
                </div>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>Eligible For upcomming web services</p>
                </div>
                <div className=" flex items-center text-sm gap-2">
                  <FaCheckCircle />
                  <p>
                    Physical Id Card of{" "}
                    <span className="font-extrabold">
                      {" "}
                      <span className="text-[#00D8FF]">Cyber</span> Hunter{" "}
                    </span>{" "}
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit100}
                  className="px-4 py-2 rounded-lg my-4 bg-[#00D8FF] font-semibold"
                >
                  Pay & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

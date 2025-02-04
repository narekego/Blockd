import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  registerUser,
  resendVerification,
  sendVerification,
} from "../../stores/authUser/AuthUserActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty, parseQueryString } from "../../utils";
import { config as configUrl } from "../../constants";
import Terms from "../../components/Auth/Terms";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { nft_contract } from "../../config/contract";
import useIsMounted from "../../hooks/useIsMounted";
import toast, { Toaster } from "react-hot-toast";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
} from "wagmi";
import { read, write } from "fs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Policy from "../../components/Auth/Policy";
import { flatMap, indexOf } from "lodash";
import CustomLoadingOverlay from "../../components/CustomLoadingOverlay";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { checkAddress, checkEmail } from "../../stores/user/UserActions";
import { nft_abi } from "../../abi/nft.abi";

const messageUrl = `${configUrl.url.API_URL}/user/generate/message`;

export default function SignUp() {
  const dispatch = useAppDispatch();
  const mounted = useIsMounted();
  const router = useRouter();
  const { authError, isRegisteringUser } = useAppSelector(
    (state) => state.authUserReducer
  );
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nftData, setNftData] = useState<boolean>(false);
  const [nftDataOnSuccess, setNftDataOnSuccess] = useState<any>();
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState<boolean>();
  const emailRef = useRef<any>(null);
  const userNameRef = useRef<any>(null);
  const [validateAddress, setValidateAddress] = useState<boolean>();

  console.log(nftData);

  useEffect(() => {
    if (authError?.message && authError?.message !== "Unauthenticated") {
      toast.error(authError?.message);
    }
  }, [authError]);

  //Data Fetching
  // const {
  //   isLoading: fetchingLoading,
  //   error: fetchingError,
  //   data: fetchingData,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["userMessageToSign"],
  //   queryFn: () => axios.get(messageUrl).then((res) => res.data),
  //   onSuccess(data) {
  //     setUserMessage(data?.message);
  //   },
  // });

  const [args, setArgs] = useState<any>(["Nft mint"]);
  const [functionName, setFunctionName] = useState<any>("mint(string,address)");
  const [userMessage, setUserMessage] = useState<string>("");
  const [userMessageForBackend, setUserMessageForBackend] =
    useState<string>("");
  //const [userMessage, setUserMessage] = useState<string>('Sign this message to confirm you own this wallet a…ll not cost any gas fees. Nonce: XPM35n0APkJkeIqZ');

  // const [userAddress, setUserAddress] = useState<string>("");
  const [userSignature, setUserSignature] = useState<string>("");
  const [referralAddress, setReferralAddress] = useState<string | string[]>("");
  const [vid, setVid] = useState<string | undefined | string[]>();

  useEffect(() => {
    if (router.query?.vid) {
      setVid(router.query.vid);
      localStorage.setItem("vid", vid as string);
    }
    if (router.query?.referralAddress) {
      setReferralAddress(router.query?.referralAddress);
    } else if (
      parseQueryString(window.location.search.substring(1)).referralAddress
    ) {
      setReferralAddress(
        parseQueryString(window.location.search.substring(1)).referralAddress
      );
    }

    console.log("vid:", router.query.vid);
    console.log({ referralAddress });
  }, [router.query]);

  const [terms, setTerms] = useState<boolean>(false);
  const [policy, setPolicy] = useState<boolean>(false);
  const [displayNameError, setDisplayNameError] = useState<boolean>(false);
  const [displayTermsError, setDisplayTermsError] = useState<boolean>(false);
  const [displayNamelengthError, setDisplayNamelengthError] =
    useState<boolean>(false);
  const [
    isDisplayTermsAndConditionsModal,
    setIsDisplayTermsAndConditionsModal,
  ] = useState<boolean>(false);
  const [isDisplayPolicyModal, setIsDisplayPolicyModal] =
    useState<boolean>(false);

  const { address } = useAccount();

  useEffect(() => {
    console.log({ userMessageForBackend });
    axios.get(messageUrl).then((res) => setUserMessage(res?.data?.message));
  }, [userMessageForBackend]);

  const getSignMessage = async (e: any) => {
    e.preventDefault();
    console.log(step);
    if (validateRegister()) {
      if (step === 1) {
        handleRegisterUser();
      } else {
        signMessage();
      }
    }
  };

  console.log({ vid });

  const validateRegister = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
    }
    if (displayName.length == 0) {
      setDisplayNameError(true);
      return false;
    } else {
      console.log(displayName.length);
      setDisplayNameError(false);
    }
    if (displayName.length < 4) {
      setDisplayNamelengthError(true);
      return false;
    } else {
      setDisplayNamelengthError(false);
    }
    if (!terms) {
      setDisplayTermsError(true);
      return false;
    } else {
      setDisplayTermsError(false);
    }
    return true;
  };

  useEffect(() => {
    console.log({ step });
    console.log("userMessage2: ", userMessage);
    console.log("address2: ", address);
    console.log("userSignature2: ", userSignature);
    console.log("displayName2: ", displayName);
    console.log("email2: ", email);

    if (!isEmpty(userSignature)) {
      handleRegisterUser();
    }
  }, [userSignature]);

  const handleRegisterUser = async (e: any = null) => {
    console.log({ step });
    console.log("userMessage: ", userMessage);
    console.log("address: ", address);
    console.log("userSignature: ", userSignature);
    console.log("displayName: ", displayName);
    console.log("email: ", email);

    if (1 === step) {
      emailRef.current = email;
      userNameRef.current = displayName;
      await dispatch(
        sendVerification({
          email: email,
        })
      ).then(() => {
        setStep(2);
      });
    } else {
      if (
        !terms ||
        isEmpty(userMessage) ||
        isEmpty(address) ||
        isEmpty(userSignature) ||
        isEmpty(displayName) ||
        isEmpty(email)
      ) {
        console.log("userMessage: ", userMessage);
        console.log("address: ", address);
        console.log("userSignature: ", userSignature);
        console.log("displayName: ", displayName);
        console.log("email: ", email);

        return;
      }

      await dispatch(
        registerUser({
          name: displayName,
          email: email,
          password: "passwordpassword",
          password_confirmation: "passwordpassword",
          address: address,
          signature: userSignature,
          code: code,
          // @ts-ignore
          message: userMessageForBackend,
        })
      ).then(async (res: any) => {
        if (res?.errors) {
          await new Promise((f) => setTimeout(f, 1000));
          toast.error(res?.errors);
          return;
        } else {
          localStorage.setItem("authUser", JSON.stringify(res));
        }
        magicEventAct3();
        router.push(
          {
            pathname: "/",
            query: {
              isRegistered: true,
            },
          },
          "/"
        );
      });
    }
  };

  function validateEmail(input: any) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  const {
    data: signData,
    isError: signError,
    isLoading: signLoading,
    isSuccess: signSuccess,
    signMessage,
  } = useSignMessage({
    message: userMessage,
    onSuccess(data, variables, context) {
      setUserSignature(data);
      setUserMessageForBackend(userMessage);
    },
    onError(error) {
      console.log("Error", error);
    },
    onMutate(args) {
      console.log("Mutate", args);
    },
  });

  const { data } = useContractRead({
    ...nft_contract,
    functionName: "mintPrice",
  });

  useEffect(() => {
    if (isEmpty(referralAddress)) {
      setArgs(["Nft mint"]);
      setFunctionName("mint");
    } else {
      setArgs(["Nft mint", referralAddress]);
      setFunctionName("mint(string,address)");
    }
  }, [referralAddress]);

  const {
    config,
    isError: isMintError,
    isFetching: isMintFetching,
    error,
  } = usePrepareContractWrite({
    ...nft_contract,
    functionName: functionName,
    args: args,
    overrides: {
      value: data,
    },
    enabled: !!data && !!address,
    onSuccess(data: any) {
      console.log("call useEffect", data);
    },
  });

  useEffect(() => {
    console.log("setNftData useEffect refetch");
    refetch();
  });

  const { writeAsync, isLoading: isMintLoading } = useContractWrite({
    ...config,
    async onSuccess(data) {
      const tx = await data.wait(1);
      if (tx.status === 1) {
        magicEventAct7();
        setNftData(true);
      }
    },
  });

  const magicEventAct3 = useCallback(async () => {
    let v_id: string | string[] | undefined;
    if (!isEmpty(vid)) {
      v_id = vid;
    } else {
      v_id =
        typeof window !== "undefined"
          ? (localStorage.getItem("vid") as string)
          : "";
    }
    if (isEmpty(v_id)) {
      return;
    }

    const baseUrl = "https://magic.lol/4bbad3f1";
    //const vid = getCookie('vid')
    fetch(`${baseUrl}/brokers/pixel?action=3&vid=${v_id}`)
      .then((result) => {
        //successful request
        // alert('Request was sent, Thank you. ' + v_id)
        console.log("magicEventAct3 :successfully");
      })
      .catch((err) => {
        //failed request
        console.error("magicEventAct3 :Failed to register");
      });
  }, [window]);

  const magicEventAct7 = useCallback(async () => {
    let v_id: string | string[] | undefined;
    if (!isEmpty(vid)) {
      v_id = vid;
    } else {
      v_id =
        typeof window !== "undefined"
          ? (localStorage.getItem("vid") as string)
          : "";
    }
    if (isEmpty(v_id)) {
      return;
    }
    const baseUrl = "https://magic.lol/4bbad3f1";

    fetch(`${baseUrl}/brokers/pixel?action=7&vid=${vid}`)
      .then((result) => {
        //Call was created successfully
        console.log("magicEventAct7 :successfully");
      })
      .catch((err) => {
        console.error("magicEventAct7 :Failed to register");
      });
  }, [window]);

  console.log({ error });
  const setName = (e: any) => {
    const result = e.replace(/[^a-z]/gi, "");
    setDisplayName(result);
  };

  useEffect(() => {
    console.log("setNftData useEffect refetch");
    const get_nft_data = async () => {
      await refetch();
      handleCheckAddress();
      if (nft_data && Number(nft_data) > 0) {
        setNftData(true);
      } else {
        setNftData(false);
      }
    };

    get_nft_data();
  }, [address, nftDataOnSuccess]);

  const { refetch, data: nft_data } = useContractRead({
    ...nft_contract,
    functionName: "balanceOf",
    //args:['0x73B394F31C8C9de068eB9fc4e7D37663df878F3c'],
    args: [address ?? ("" as `0x${string}`)],
    enabled: !!address,
    onSuccess() {
      setNftDataOnSuccess(nft_data);
      console.log("nft_data", nft_data);
      if (nft_data && Number(nft_data) > 0) {
        console.log("setNftData");
        setNftData(true);
      }
    },
  });

  const handleCheckEmail = async () => {
    await dispatch(
      checkEmail({
        email: email,
      })
    ).then((result: any) => {
      console.log("RESULT: ", result);
      if ("true" === result?.success) {
        setValidated(true);
      } else {
        setValidated(false);
      }
    });
  };

  const handleResendCode = async () => {
    await dispatch(
      resendVerification({
        email: email,
      })
    );
  };

  const handleCheckAddress = async () => {
    await dispatch(
      checkAddress({
        address: address,
      })
    ).then((result: any) => {
      console.log("RESULT: ", result);
      if ("true" === result?.success) {
        setValidateAddress(true);
      } else {
        setValidateAddress(false);
      }
    });
  };

  if (!mounted) {
    return null;
  }
  return (
    <section className="min-h-screen flex items-stretch md-overflow-hidden overflow-scroll text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
      <Toaster />
      <CustomLoadingOverlay active={isRegisteringUser} />
      <div className="md:flex w-1/2 hidden h-screen relative items-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-start justify-center">
            <img
              src="/images/logo/long-logo.png"
              alt="Blockd Logo"
              className="w-80 lg:w-96"
            />
            <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-3xl">
              JOIN THE{" "}
              <span className="md:text-3xl lg:text-4xl text-orange-500">
                #1
              </span>
            </h2>
            <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-3xl">
              <span className="md:text-3xl lg:text-4xl text-orange-500">
                BLOCKCHAIN
              </span>{" "}
              SOCIAL
            </h2>
            <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-3xl">
              MEDIA PLATFORM
            </h2>
            <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">
              Already Registered ?{" "}
              <Link href="/auth/signin" className="underline">
                LOGIN
              </Link>
            </h4>
            <br />
            <hr className="w-1/3"></hr>
            <h4 className="text-white mt-6 ml-2 pb-3 text-m md:text-m lg:text-l">
              Verified By Blockchain Technology
            </h4>
            <div className="flex mt-4">
              <a
                href="/auth/infographic"
                target="_blank"
                className="flex items-start justify-center w-32 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-md"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full  flex items-center justify-center text-center p-10 z-0">
        <div className="flex items-center w-[500px] bg-color relative rounded-md">
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <div className="flex justify-center items-center p-4 space-x-4 border-b border-gray-500 w-full">
              <Image
                src="/images/logo/logo.png"
                alt="Blockd Logo"
                className="md:hidden md:w-30 md:h-14"
                width={70}
                height={50}
              />
              <h2 className="text-center font-bold text-white text-4xl lg:text-5xl pb-3">
                Sign Up
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full px-10 py-5">
              {1 === step && (
                <>
                  <div className="flex flex-col items-start justify-center space-y-1 w-full mb-2">
                    <p className="text-white font-semibold text-l">
                      Display Name
                    </p>
                    <input
                      className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                      type="text"
                      name="name"
                      placeholder="@"
                      value={displayName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center space-y-1 w-full">
                    <p className="text-white font-semibold text-l">Email</p>
                    <input
                      className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      onBlur={() => {
                        handleCheckEmail(), setEmailError(false);
                      }}
                    />
                    {validated && (
                      <p className="text-red-600  text-xs font-bold">
                        This email is already taken.
                      </p>
                    )}
                    {emailError && (
                      <p className="text-red-600  text-xs font-bold">
                        Please enter a valid email address
                      </p>
                    )}
                    {displayNameError && (
                      <p className="text-red-600  text-xs font-bold">
                        Please enter a display name
                      </p>
                    )}
                    {displayTermsError && (
                      <p className="text-red-600  text-xs font-bold">
                        Please accept Terms and Conditions and Privacy Policy to
                        continue
                      </p>
                    )}

                    {displayNamelengthError && (
                      <p className="text-red-600  text-xs font-bold">
                        Name must be at least 4 characters
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-start mt-4 w-full space-x-2">
                    <input
                      onChange={() => setTerms(!terms)}
                      type="checkbox"
                      className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                    />
                    <p
                      onClick={() =>
                        setIsDisplayTermsAndConditionsModal(
                          !isDisplayTermsAndConditionsModal
                        )
                      }
                      className="text-white font-semibold text-l cursor-pointer"
                    >
                      Terms and Conditions
                    </p>
                  </div>
                  <div className="flex items-center justify-start mt-4 w-full space-x-2">
                    <input
                      onChange={() => setPolicy(!policy)}
                      type="checkbox"
                      className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                    />
                    <p
                      onClick={() =>
                        setIsDisplayPolicyModal(!isDisplayPolicyModal)
                      }
                      className="text-white font-semibold text-l cursor-pointer"
                    >
                      Privacy Policy
                    </p>
                  </div>
                </>
              )}
              {2 === step && (
                <div className="flex flex-col items-start justify-center space-y-1 w-full">
                  <ArrowLeftCircleIcon
                    className="w-6 h-6 stroke-2 cursor-pointer"
                    onClick={() => setStep(1)}
                  />
                  <p className="text-white font-semibold text-l">
                    Verification Code
                  </p>
                  <input
                    className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                    type="text"
                    name="code"
                    placeholder="Enter the verification code sent to your email"
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <p
                    onClick={() => handleResendCode()}
                    className="underline font-semibold cursor-pointer"
                  >
                    Resend Code
                  </p>
                </div>
              )}

              <div className="w-full mt-4 flex items-center justify-center">
                <ConnectButton
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                ></ConnectButton>
              </div>
              {validateAddress && (
                <p className="text-red-600  text-xs font-bold mt-3">
                  This address is already used.
                </p>
              )}
              {nftData ? (
                <div className="w-full flex items-center justify-center">
                  <button
                    className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-md"
                    onClick={(e) => getSignMessage(e)}
                    disabled={validated || validateAddress}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-full flex items-center justify-center">
                    <button
                      className={`w-full mt-4 text-white  font-semibold py-3 px-4 rounded-md ${
                        isMintLoading && "loading"
                      } ${
                        error
                          ? "bg-orange-300"
                          : "cursor-pointer bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 hover:from-blockd hover:to-blockd"
                      }`}
                      disabled={isMintError || isMintFetching}
                      onClick={() => writeAsync && writeAsync()}
                    >
                      Mint
                    </button>
                  </div>

                  {error && (
                    <div className="mt-4 w-full max-h-20 bg-red-500 rounded-md p-2 break-normal overflow-scroll scrollbar-hide">
                      An error occurred preparing the transaction:<br></br>
                      {/* @ts-ignore */}
                      {error?.reason ? error?.reason : error?.message}
                    </div>
                  )}
                </>
              )}
              <p className="text-orange-500  text font-bold mt-3">
                Account Creation Requirement: 4 Matic + Gas Fees
              </p>
            </div>

            <div className="w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500">
              <h2 className="text-white text-l lg:text-xl">
                Already Registered ?{" "}
                <Link href="/auth/signin" className="underline font-semibold">
                  Login
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/*  ****************Modal****************   */}
      <div
        className={`fixed top-0 left-0 p-4 flex items-stretch justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
          isDisplayTermsAndConditionsModal ? "" : "hidden"
        }`}
      >
        <div className="relative flex flex-col w-full max-w-md bg-white rounded-lg overflow-scroll scrollbar-hide">
          <div className="relative flex flex-col rounded-lg">
            <div className="sticky top-0 z-10 flex items-center justify-between w-full p-2 border-b backdrop-blur-md bg-white/30">
              <div className="text-black flex text-center justify-center font-semibold">
                Terms and Conditions
              </div>
              <button
                type="button"
                onClick={() =>
                  setIsDisplayTermsAndConditionsModal(
                    !isDisplayTermsAndConditionsModal
                  )
                }
                className="text-black bg-transparent hover:bg-gray-200 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Terms />
          </div>
        </div>
      </div>
      {/*  ****************Modal****************   */}
      <div
        className={`fixed top-0 left-0 p-4 flex items-stretch justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
          isDisplayPolicyModal ? "" : "hidden"
        }`}
      >
        <div className="relative flex flex-col w-full max-w-md bg-white rounded-lg overflow-scroll scrollbar-hide">
          <div className="relative flex flex-col rounded-lg">
            <div className="sticky top-0 z-10 flex items-center justify-between w-full p-2 border-b backdrop-blur-md bg-white/30">
              <div className="text-black flex text-center justify-center font-semibold">
                Privacy Policy
              </div>
              <button
                type="button"
                onClick={() => setIsDisplayPolicyModal(!isDisplayPolicyModal)}
                className="text-black bg-transparent hover:bg-gray-200 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Policy />
          </div>
        </div>
      </div>
    </section>
  );
}

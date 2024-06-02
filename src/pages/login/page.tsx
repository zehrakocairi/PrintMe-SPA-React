"use client"

import React, { FC } from "react";
import twitterSvg from "../../data/images/Twitter.svg";
import googleSvg from "../../data/images/Google.svg";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Image from "../../shared/Image";
import Link from "../../shared/Link";
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, tokenRequest } from '../../authConfig';


const PageLogin = () => {

  const { instance, accounts } = useMsal(); 
   const isAuthenticated = useIsAuthenticated();


  const handleMicrosoftLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
    return true;
  };

  const test = () => {
    callApiWithToken();
  };


  const callApiWithToken = async () => {
    debugger;
    if (isAuthenticated) {
      const request = {
        ...tokenRequest,
        account: accounts[0],
      };
      try {
        const response = await instance.acquireTokenSilent(request);
        debugger;
        const token = response.accessToken;
        const apiResponse = await fetch('https://localhost:7183/test', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        debugger;
        console.log(apiResponse);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const loginSocials = [
    {
      name: "Continue with Microsoft",
      href: "#",
      icon: twitterSvg,
      handleClick:handleMicrosoftLogin
    },
    {
      name: "Continue with Google",
      href: "#",
      icon: googleSvg,
      handleClick:()=>{test()}
    },
  ];

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials?.map((item, index) => (
              <a
              onClick={item.handleClick}
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgot-pass" className="text-sm text-green-600">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" href="/login">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

import Label from "../../../components/Label/Label";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";
import Input from "../../../shared/Input/Input";
import Select from "../../../shared/Select/Select";
import Textarea from "../../../shared/Textarea/Textarea";
import Image from "../../../shared/Image";
import { useApplication } from "../../../contexts/ApplicationContext";
import { fetchWithAuth, getPostOptions, getPutOptions } from "../../../fetch/fetchWrapper";
import { useTranslation } from "react-i18next";




// TODOS:
// 3. Handle user data (Client side validation)
const AccountPage = () => {
  const {currentUser, getToken} = useApplication();
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    email: "",
    dateOfBirth: undefined,
    address: "",
    phoneNumber: "",
    profilePictureUrl: "https://genstorageaccount3116.blob.core.windows.net/printme-images/profile.svg",
  });
  const { t } = useTranslation();

  const fetchUserData = async () => {
    var data = await fetchWithAuth(`/customer`, await getToken());
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetchWithAuth(`/customer/${currentUser.id}`, await getToken(),  getPutOptions(userData));
    await fetchUserData();
  };


  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {t("Account infomation")}
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            {/* AVATAR */}
            <div className="relative rounded-full overflow-hidden flex">
              <Image
                src={userData.profilePictureUrl}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-1 text-xs">{t("Change Image")}</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <form onSubmit={handleSubmit}>
            <div>
              <Label>Full name</Label>
              <Input className="mt-1.5" 
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  required
                  />
            </div>

            {/* ---- */}

            {/* ---- */}
            <div>
              <Label>Email</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
                <Input
                 className="!rounded-l-none"
                 name="email"
                 value={userData.email}
                 onChange={handleChange}
                 placeholder="example@gmail.com"
                 disabled
                />
              </div>
            </div>

            {/* ---- */}
            <div className="max-w-lg">
              <Label>Date of birth</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-calendar"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>{t("Address")}</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
            </div>

            {/* ---- */}
            <div>
              <Label>{t("Phone number")}</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input className="!rounded-l-none"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"/>
              </div>
            </div>
            <div className="pt-2">
              <ButtonPrimary>{t("Update account")}</ButtonPrimary>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

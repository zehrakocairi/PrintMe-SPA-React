import { useTranslation } from "react-i18next";

export default function SalesPromo() {
    const { t } = useTranslation();

    return (
        <div className="p-0 pt-24 overflow-hidden">
            <div className="relative flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto p-6 bg-indigo-950 text-white rounded-lg">
                <div className="flex flex-col justify-center lg:w-1/2 p-6 pt-36">
                    <h2 className="text-3xl md:text-6xl font-semibold mb-0">
                        {t("Final Stock.")}
                    </h2>
                    <h2 className="text-3xl md:text-6xl font-semibold mb-4">
                       {t("Up to 50% off.")}
                    </h2>
                    <p className="text-md mb-6 mt-4">{t("Go to sales")} &rarr;</p>
                </div>
                <div className="absolute grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:w-1/2 p-6 right-0">
                    <div className="rounded-lg overflow-hidden bg-white -translate-y-4">
                        <img
                            src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-3.jpg"
                            alt="Sale item 1"
                            className="w-full h-full object-cover max-h-72"
                        />
                    </div>
                    <div className="rounded-lg overflow-hidden bg-white -translate-y-32 ">
                        <img
                            src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-2.jpg"
                            alt="Sale item 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="rounded-lg overflow-hidden bg-white -translate-y-4">
                        <img
                            src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-1.jpg"
                            alt="Sale item 3"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="rounded-lg overflow-hidden bg-white -translate-y-32">
                        <img
                            src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-4.jpg"
                            alt="Sale item 4"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
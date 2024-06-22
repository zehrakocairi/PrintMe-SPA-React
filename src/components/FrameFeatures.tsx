import { useTranslation } from "react-i18next";

const features = [
    { name: 'Material', description: 'Premium wood base with a smooth matte finish.' },
    { name: 'Dimensions', description: 'Available in multiple sizes to fit your artwork perfectly.' },
    { name: 'Finish', description: 'Hand-finished with a durable, scratch-resistant coating.' },
    { name: 'Includes', description: 'Frame, hanging hardware, and protective glass cover.' },
    { name: 'Considerations', description: 'Made from natural materials. Grain and color may vary with each frame.' },
  ]
  
  export default function FrameFeatures() {
    const { t } = useTranslation()
    return (
      <div className="z-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("Technical Specifications")}</h2>
            <p className="mt-4 text-gray-500">
             {t("The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated steel divider separates active cards from new ones, or can be used to archive important task lists.")}
            </p>
  
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{t(feature.name)}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{t(feature.description)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-1.jpg"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-2.jpg"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-3.jpg"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://genstorageaccount3116.blob.core.windows.net/printme-images/material-4.jpg"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    )
  }
  
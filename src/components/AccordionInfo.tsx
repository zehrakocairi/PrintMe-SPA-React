"use client";

import { Disclosure } from "../headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

const DEFAULT_DATA = [
  {
    name: "Print Quality & Care",
    content: `<ul class="list-disc list-inside leading-7">
    <li>Giclée printed on 180 g/m² fine art paper (matte).</li>
    <li>
    Archival quality for long-lasting color and durability
    </li>
    <li>
    3.0 cm blank borders for easy framing
    </li>
    <li>
    Wipe clean with a soft, dry cloth to maintain its pristine condition
    </li>
  </ul>`,
  },
  {
    name: "Sympathize with Our Service",
    content:
      "We are a family-run business in Den Bosch, dedicated to bringing you the best in art prints. Each piece is printed and framed with love and care, ensuring that you receive a product that is not only beautiful but also crafted with attention to detail. Visit us, enjoy a coffee, and see where the magic happens.",
  },
  {
    name: "Vibrant Colors & Versatile Sizes",
    content:
      "Our printing process utilizes cutting-edge technology and the Giclée printmaking method for exceptional quality. Colors are independently verified to last over decades. Available in multiple sizes, our prints fit perfectly in any space. Personalize your artwork with various paper types to suit your style and decor needs. Each piece is crafted to meet your specifications, ensuring a unique addition to your home or office.",
  },
  {
    name: "FAQ",
    content: `
    <ul class="list-disc list-inside leading-7">
    <li><b>Can I return or exchange my order?</b> 
      </br>Yes, returns and exchanges are accepted within 30 days of purchase if the item is in its original condition.
    </li>
    <li>
    <b>How long does shipping take?</b>
    </br>Unframed prints ship within 2-4 days. Framed prints require an additional 7-8 days for processing.
    </li>
    <li>
    <b>Do you offer custom prints?</b>
    </br>Yes, we offer custom printing services. Contact us for more details.
    </li>
    <li>
    <b>What kind of frames do you offer?</b>
    </br>We provide a wide selection of wood and polystyrene frames in various styles and finishes.
    </li>
  </ul>
    `,
  },
];

interface Props {
  panelClassName?: string;
  data?: typeof DEFAULT_DATA;
}

const AccordionInfo: FC<Props> = ({
  panelClassName = "p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6",
  data = [],
}) => {
  return (
    <div className="w-full rounded-2xl space-y-2.5">
      {/* ============ */}
      {data.concat(DEFAULT_DATA).map((item, index) => {
        return (
          <Disclosure key={index} defaultOpen={index < 2}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                  <span>{item.name}</span>
                  {!open ? (
                    <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel
                  className={panelClassName}
                  as="div"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}

      {/* ============ */}
    </div>
  );
};

export default AccordionInfo;

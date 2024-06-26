"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getNewParam } from "../ListingImageGallery";
import type { ListingGalleryImage } from "../utils/types";
import SharedModal from "./SharedModal";

export default function Modal({
  images,
  onClose,
}: {
  images: ListingGalleryImage[];
  onClose?: () => void;
}) {
  let overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const thisPathname = useLocation();
  const searchParams = new URLSearchParams(thisPathname.search);
  const photoId = searchParams?.get("photoId");
  let index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    onClose && onClose();
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    navigate(`${thisPathname.pathname}/?${getNewParam({ value: newVal })}`);
  }

  window.addEventListener("ArrowRight", () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  window.addEventListener("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  return (
    <>
      <Dialog
        static
        open={true}
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          ref={overlayRef}
          key="backdrop"
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
        />
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
        />
      </Dialog>
    </>
  );
}

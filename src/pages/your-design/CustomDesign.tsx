import React, { FC, useState, useEffect } from "react";
import PreviewDesign from "../../components/PreviewDesign";
import { useApplication } from "../../contexts/ApplicationContext";

export interface CustomDesignProps {
  className?: string;
}

const CustomDesign: FC<CustomDesignProps> = ({
  className = "",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isMatIncluded, setIsMatIncluded] = useState(true);

  const { frames, sizes, isAdmin } = useApplication();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));  // Generate and set the image URL
    }
  };

  useEffect(() => {
    // Cleanup the object URL to avoid memory leaks when the component unmounts or the file changes
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-col space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left mb-8">
        <div className="w-screen max-w-full xl:max-w-2xl space-y-5">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
            Your Image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              {selectedFile && (
                <p className="text-sm leading-5 text-gray-900 mt-2">
                  Selected file size: {(selectedFile.size / (1024*1024)).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-col space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-2xl space-y-5">
          {image && (
            <PreviewDesign
              frame={frames[1]}
              sizeName={sizes[0]?.name}
              isMatIncluded={isMatIncluded}
              image={image}
              showDescription={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;

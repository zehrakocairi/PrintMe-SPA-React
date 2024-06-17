import { useTranslation } from 'react-i18next';

const useCaseInsensitiveTranslation = () => {
  const { t: translate } = useTranslation();

  const t = (key:string) => {
    return translate(key.toLowerCase());
  };

  return { t };
};

export default useCaseInsensitiveTranslation;

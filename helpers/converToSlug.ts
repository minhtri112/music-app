import unidecode from 'unidecode';

export const convertToSlug = (text: string) : string => {
  const unidecodeText = unidecode(text);
  
  const slug = unidecodeText.replace(/\s+/g,"-");
  return slug;
};
import fileDownload from "js-file-download";

export const downloadFile = async (url: string, fileName: string) => {
  const response = await fetch(url);
  fileDownload(await response.blob(), fileName);
};

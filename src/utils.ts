import Papa from 'papaparse';

export const loadCsvData = async (filePath: string) => {
  console.log("Loading file: "+filePath)
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results: any) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

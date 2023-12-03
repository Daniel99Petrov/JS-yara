import {
    BlobWriter,
    HttpReader,
    TextReader,
    ZipWriter,
  } from "https://unpkg.com/@zip.js/zip.js/index.js";
   
  onmessage = async (e) => {
    const { points, questionsCount } = e.data;
    const resultPercentage = Math.round((points / questionsCount) * 100);
    const text = `You answered ${points} questions correctly and your result is ${resultPercentage}%`;
    const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
    await zipWriter.add("QuizPoints.txt", new TextReader(text))
    const blob = await zipWriter.close()
    postMessage(blob)
  };
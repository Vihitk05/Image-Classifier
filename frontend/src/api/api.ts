import axios from 'axios';

export interface DetectionResult {
  box: {
    xmax: number;
    xmin: number;
    ymax: number;
    ymin: number;
  };
  label: string;
  score: number;
}

export const classifyImage = async (image: File): Promise<DetectionResult> => {
  const formData = new FormData();
  formData.append('image', image);
  const response = await axios.post('http://127.0.0.1:5000/api/classify-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

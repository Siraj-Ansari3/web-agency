import axios from 'axios';

export const uploadImage = async (img) => {
    let imgUrl = null;
  try {
    // Get signed URL from server
    const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url");
    const uploadURL = response.data.uploadURL;

    // Upload the image to S3 using the signed URL
    await axios.put(uploadURL, img, {
      headers: {"Content-Type": "multipart/form-data"}
    });

    // Return the public URL (without query params)
    imgUrl = uploadURL.split("?")[0];
    return imgUrl;

  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // rethrow so caller can handle
  }
};


// export const uploadImage = async (img) => {
//     try {
//         let imageUrl = null;

//         const uploadUrl = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
//         const uploadedImgUrl = await axios({
//             method: "PUT",
//             url: uploadUrl,
//             headers: {"Content-Type": "multipart/form-data"},
//             data: img
//         })

//         imageUrl = uploadedImgUrl
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
export const fileUpload = async (file) => {
  // if (!file) throw new Error("No tenemos ningun archivo para subir");
  if (!file) return null;

  const cloudURL = "https://api.cloudinary.com/v1_1/dcsvj6xfj/upload";

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error(" No se pudo subir la imagen");

    const cloudResp = await resp.json();

    // return cloudResp.secure_url;
    return cloudResp;
    
  } catch (error) {
    // console.log(error);
    // throw new Error(error.message);
    return null
  }
};

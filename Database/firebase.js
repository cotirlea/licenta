import { initializeApp } from "firebase/app";
import { getStorage,ref, uploadString, getDownloadURL,deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClmNvXBz-FOe_q1OELqA4mCawReP9NNn0",
  authDomain: "licenta-b319c.firebaseapp.com",
  projectId: "licenta-b319c",
  storageBucket: "licenta-b319c.appspot.com",
  messagingSenderId: "653315902231",
  appId: "1:653315902231:web:38ce8474e4857b2f050552",
  measurementId: "G-LFHR80MQJD"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const addImage = async (file, id) =>{
  const metadata = {contentType: 'image/jpeg'};
  const imageRef = ref(storage, id);
  try {
      await uploadString(imageRef, file,'data_url', metadata);
      console.log('Image uploaded successfully');
  } catch (error) {
      console.error('Error uploading image:', error);
  }
}

const getImage = async (id) =>{
  const imageRef = ref(storage, id);
  const imageURL = await getDownloadURL(imageRef)
  return imageURL
}

const deleteImage = async(id) =>{
  try {
      await deleteObject(ref(storage, id))
      console.log('Image deleted successfully');
  } catch (error) {
      console.error('Error deleting image:', error);
  }
}

export {addImage,getImage,deleteImage}
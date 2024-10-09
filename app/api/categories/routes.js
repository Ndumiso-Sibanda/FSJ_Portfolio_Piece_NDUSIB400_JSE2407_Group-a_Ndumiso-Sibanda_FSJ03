import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const fetchCategories = async () => {
 try {
  const categoriesRef = collection(db, "categories");
  const querySnapshot = await getDocs(categoriesRef);

  const categories = querySnapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
  }));

  return categories;
 } catch (error) {
  console.error("Error fetching categories:", error);
  throw new Error(error.message);
 }
};

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; 

export const fetchProductDetails = async (id) => {
  try {
    const productRef = doc(db, "products", id); 
    const productSnap = await getDoc(productRef); 

    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }

    return { id: productSnap.id, ...productSnap.data() }; 
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error(error.message);
  }
};
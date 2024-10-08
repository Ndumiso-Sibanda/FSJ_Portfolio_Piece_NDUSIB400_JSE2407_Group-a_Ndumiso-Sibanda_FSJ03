import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebase';

async function fetchAllProducts() {
  try {
    const productRef = collection(db, 'products');
    const productDocs = await getDocs(productRef);
    const products = productDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return products;
  } catch (error) {
    console.error('Firebase Fetch Error:', error.message);
    throw new Error('Failed to fetch products');
  }
}

export default fetchAllProducts;
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { User } from "firebase/auth";

// Function to create a user document in Firestore
export const createUserDocument = async (authUser: User): Promise<void> => {
  const userRef = doc(db, "users", authUser.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    try {
      const fullName = authUser.displayName || "";
      const [firstName, lastName] = fullName.split(" ");

      // Creat user document in Firestore if it doesn't exist
      await setDoc(userRef, {
        firstName: firstName || "",
        lastName: lastName || "",
        email: authUser.email || "",
        avatar: authUser.photoURL || "",
        createdAt: new Date().toISOString(),
        role: "user", // Default role
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }
};

// Function to update user profile in Firestore
export const updateUserProfile = async (
  authUser: User,
  profileData: { firstName: string; lastName: string; avatar: string }
) => {
  const userRef = doc(db, "users", authUser.uid);
  try {
    await updateDoc(userRef, {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      avatar: profileData.avatar,
    });
    console.log("User profile updated!");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Function to fetch user document from Firestore
export const getUserProfile = async (authUser: User): Promise<any> => {
  const userRef = doc(db, "users", authUser.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No user document found.");
    return null;
  }
};

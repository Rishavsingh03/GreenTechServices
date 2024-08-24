import { setUser, setLoading, setError } from "./authSlice";
import { auth } from "../firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

const db = getFirestore();

export const signupUser = (name, email, password, role) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Update the user's profile with the name
    await updateProfile(userCredential.user, { displayName: name });

    // Store the role in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      role,
      uid: userCredential.user.uid,
    });

    // Extract the serializable parts of the user object
    const serializableUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name,
      role,
    };

    dispatch(setUser(serializableUser));

    // Show success toast
    toast.success("Signup successful!");
  } catch (error) {
    dispatch(setError(error.message));
    // Show error toast
    toast.error(`Signup failed: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData.role;

      // Extract the serializable parts of the user object, including the role
      const serializableUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role, // Add role to the serializable user object
      };

      dispatch(setUser(serializableUser));

      // Show success toast
      toast.success("Login successful!");
    } else {
      console.log("No such user document!");
      toast.error("No such user document!");
    }
  } catch (error) {
    dispatch(setError(error.message));
    // Show error toast
    toast.error(`Login failed: ${error.message}`);
  } finally {
    dispatch(setLoading(false));
  }
};

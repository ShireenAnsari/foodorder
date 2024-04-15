import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";

export const _usefetchuser = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const Session = useSession();
  const Data = Session?.data;
  const [state, setState] = useState({
    image: "",
    name: "",
    streetAddress: "",
    postalCode: "",
    country: "",
    city: "",
    phone: "",
  });
  const Email = Data?.user?.email;
  const status = Session?.status;

  const fetchdata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/profile", {
        cache: "force-cache",
      });
      console.log('data is', response);
      setIsAdmin(response?.data.admin);
      setState({
        image: response?.data?.image,
        city: response?.data?.city,
        country: response?.data?.country,
        streetAddress: response?.data?.streetAddress,
        postalCode: response?.data?.postalCode,
        phone: response?.data?.phone,
        name: response?.data?.name,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchdata();
    }
  }, [Session, status, fetchdata]);

  return { Email, state, setState, status, isAdmin, loading };
};

export const _usefetchuserId = (_id) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const Session = useSession();
  const Data = Session?.data;
  const [state, setState] = useState({
    image: "",
    name: "",
    streetAddress:"",
    postalCode:"",
    country: "",
    city: "",
    phone: "",
    
  });
  const Email = Data?.user?.email;
  const status = Session?.status;

  const fetchdata = useCallback(async (_id) => { // Accept _id as a parameter
    try {
      setLoading(true);
      console.log('Id is in fetch data', _id)
      const response = await axios.get(`/api/profile?_id=${_id}`);
      console.log('data is', response);
      setIsAdmin(response?.data.admin);
      setState({
        image: response?.data?.image,
        city: response?.data?.city,
        country: response?.data?.country,
        streetAddress: response?.data?.streetAddress,
        postalCode: response?.data?.postalCode,
        phone: response?.data?.phone,
        name: response?.data?.name,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchdata(_id); // Pass _id when calling fetchdata
    }
  }, [Session, status, fetchdata, _id]); // Ensure _id is in the dependency array

  return { Email, state, setState, status, isAdmin, loading };
};


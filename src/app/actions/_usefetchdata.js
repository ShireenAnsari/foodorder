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

// "use client";
// import { getSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function Sign({}) {
//   const [session, setSession] = useState<any>(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const sessionData = await getSession();
//       setSession(sessionData);
//     };

//     fetchSession();
//   }, []);

//   return (
//     <>
//       <h1> Sign</h1>
//     </>
//   );
// }

import React, { Suspense, useEffect, useState } from "react";
import HomeMain from "../Components/Home/HomeMain";
import PreLoader from "./PreLoader";

function HomePage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <HomeMain />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default HomePage;

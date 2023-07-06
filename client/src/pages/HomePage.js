import React, { Suspense, useEffect } from "react";
import HomeMain from "../Components/Home/HomeMain";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeMain />
      </Suspense>
    </div>
  );
}

export default HomePage;

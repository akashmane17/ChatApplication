const PageNotFound = () => {
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="text-white text-5xl">404</h1>
      <h3 className="text-white text-3xl">Page not found</h3>
    </div>
  );
};

export default PageNotFound;

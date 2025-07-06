import Navigation_user from "./navigation_user/Navigation_user";

function Header({ toggleDrawer }) {
  return (
    <header className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white shadow-lg">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center w-6 h-6 gap-1.5 group-hover:gap-2 transition-all duration-300">
              <span className="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></span>
              <span className="w-6 h-0.5 bg-white rounded-full transition-all duration-300"></span>
              <span className="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></span>
            </div>
          </button>
          {/*Title*/}
          <h1 className="text-2xl font-bold tracking-tight hover:tracking-normal transition-all duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
               مُعلمي
            </span>
          </h1>
        </div>
        <Navigation_user></Navigation_user>
      </div>
    </header>
  );
}

export default Header;

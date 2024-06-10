function Header({ darkMode, setDarkMode }) {
  return (
    <header
      className={`flex items-center justify-between border-b-2 p-8 ${darkMode ? "bg-slate-900" : ""}`}
    >
      <div className="flex items-center gap-6">
        <i className="fa-solid fa-list text-3xl text-indigo-600"></i>
        <h1 className={`text-2xl font-light ${darkMode ? "text-white" : ""}`}>
          Todo List
        </h1>
      </div>
      <div>
        <button
          className="text-3xl text-indigo-600"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          <i className={`fa-solid fa-moon ${darkMode ? "" : "hidden"}`}></i>
          <i className={`fa-solid fa-sun ${darkMode ? "hidden" : ""}`}></i>
        </button>
      </div>
    </header>
  );
}

export default Header;

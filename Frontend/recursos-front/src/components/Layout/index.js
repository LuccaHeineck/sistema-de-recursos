import Menu from "../Menu";
import Header from "../Header";

const Layout = ({ username, children }) => {
  return (
    <div className="bg-customGrey font-poppins flex h-screen">
      <Menu />
      <div className="flex-1 flex flex-col ml-72">
        {" "}
        {/* Adjust ml-60 based on Menu width */}
        <Header username={username} />
        <main className="flex-1 p-6 bg-customGrey text-white">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

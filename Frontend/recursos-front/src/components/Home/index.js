import Table from "../Table";

const Home = () => {
  // Exemplo de uso:
  const data = [
    {
      productName: 'Apple MacBook Pro 17"',
      color: "Silver",
      category: "Laptop",
      price: "$2999",
    },
    {
      productName: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      productName: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      productName: "Google Pixel Phone",
      color: "Gray",
      category: "Phone",
      price: "$799",
    },
    {
      productName: "Apple Watch 5",
      color: "Red",
      category: "Wearables",
      price: "$999",
    },
  ];

  return (
    <div>
      <h1>a</h1>
      <Table data={data} />
    </div>
  );
};

export default Home;

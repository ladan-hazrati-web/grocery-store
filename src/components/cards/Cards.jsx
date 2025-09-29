import ResponsiveContainer from "../responsive/ResponsiveContainer";
import CardItem from "./CardItem";
import img1 from "../../assets/images/card/wood-food-market-ban-1-opt.jpg";
import img2 from "../../assets/images/card/wood-food-market-ban-2-opt.jpg";
function Cards() {
  return (
    <ResponsiveContainer type="section">
      <div className="w-full flex gap-5 md:flex-nowrap justify-center md:justify-between flex-wrap  md:mx-0 my-10">
        <CardItem
          title="Roar Ice Cream"
          textBtn="TO SHOP"
          text="NEW PRODUCTS"
          desc="Using dummy content or fake information in the design."
          image={img1}
        />
        <CardItem
          title="Organic Rice"
          desc="Products with elegant design can quickly begin to bloat."
          image={img2}
          textBtn="BUY NOW"
          text="VEGAN FOOD"
        />
      </div>
    </ResponsiveContainer>
  );
}

export default Cards;

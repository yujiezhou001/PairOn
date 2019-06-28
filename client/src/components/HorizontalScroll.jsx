import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import Food from "./svg/Food";
import Sports from "./svg/Sports";
import Shopping from "./svg/Shopping";
import Events from "./svg/Events";
import Drink from "./svg/Drink";
import Culture from "./svg/Culture";
import Sights from "./svg/Sights";

// list of items
const list = [
  { name: "Drinks", css: "drinks", image: <Drink/> },
  { name: "Food", css: "food", image: <Food/> },
  { name: "Culture", css: "culture", image: <Culture/> },
  { name: "Events", css: "events", image: <Events/> },
  { name: "Sports", css: "sports", image: <Sports /> },
  { name: "Sights & Landmarks", css: "sights", image: <Sights/> },
  { name: "Shopping", css: "shopping", image: <Shopping/> },
  { name: "All", css: "all", image: "All" }
];

class HorizontalScroll extends React.Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    this.setState({ selected: key });
  };

  render() {

    //For render the BTN
    const { selected } = this.state;
    // Create menu from items
    const Menu = list =>
      list.map(el => {
        const { name, image, css } = el;

        return <MenuItem text={name} key={name} image={image} css={css}/>;
      });

    const Arrow = ({ text, className }) => {
      return <div className={className}>{text}</div>;
    };

    const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
    const ArrowRight = Arrow({ text: ">", className: "arrow-next" });
    const MenuItem = ({ text, selected, image, css }) => {
      return (
        <button
          onClick={this.props.handelExperience}
          className={`rounded-circle btn-experience menu-item ${css} ${
            selected ? "active" : ""
          }`}
          value={css}
          title={text}
        >
          {image}
{/* 
          {({text} === "Food") && <Food />}
          {console.log({text} == "Food")} */}
        </button>
      );
    };
    const menu = Menu(list, selected);

    return (
      <div className="scroll-view-horizon">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default HorizontalScroll;

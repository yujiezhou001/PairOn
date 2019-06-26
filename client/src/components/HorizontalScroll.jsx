import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

// list of items
const list = [
  { name: "Drinks" },
  { name: "Food" },
  { name: "Culture" },
  { name: "Events" },
  { name: "Sports" },
  { name: "Unique" },
  { name: "All" }
];

class HorizontalScroll extends React.Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    this.setState({ selected: key });
  };

  render() {
    const { selected } = this.state;
    // Create menu from items
    const Menu = list =>
      list.map(el => {
        const { name } = el;

        return <MenuItem text={name} key={name} />;
      });

    const Arrow = ({ text, className }) => {
      return <div className={className}>{text}</div>;
    };

    const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
    const ArrowRight = Arrow({ text: ">", className: "arrow-next" });
    const MenuItem = ({ text, selected }) => {
      return (
        <button
          onClick={this.props.handelExperience}
          className={`btn btn-primary btn-lg menu-item ${text} ${selected ? 'active' : ''}`}
          value={text}
        >
          {text}
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

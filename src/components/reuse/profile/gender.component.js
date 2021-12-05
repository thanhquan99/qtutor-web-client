import { Component } from "react";
import { FaMars, FaVenus } from "react-icons/fa";

class GenderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isMale } = this.props;
    return (
      <span>
        {isMale ? (
          <FaMars style={{ color: "#419fcf" }} />
        ) : (
          <FaVenus style={{ color: "#f378ac" }} />
        )}
      </span>
    );
  }
}

export default GenderComponent;

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../components/common/button";

describe("Button Component", () => {
  it("renders with given props", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} type="button" className="test-class">
        Click Me
      </Button>
    );

    const button = getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("cursor-pointer rounded border-2 border-solid border-black p-3 hover:bg-black hover:text-white test-class");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} type="button">
        Click Me
      </Button>
    );

    const button = getByText("Click Me");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("changes appearance when hovered over", () => {
    const { getByText } = render(
      <Button type="button">
        Hover Me
      </Button>
    );

    const button = getByText("Hover Me");
    fireEvent.mouseEnter(button);
    expect(button).toHaveClass("hover:bg-black hover:text-white");
    fireEvent.mouseLeave(button);
    expect(button).not.toHaveClass("hover:bg-black hover:text-white");
  });
});
import { render, fireEvent } from "@testing-library/react";
import { Input } from "../components/common/input";

describe("Input Component", () => {
  it("renders with given props", () => {
    const { getByPlaceholderText } = render(
      <Input
        type="text"
        name="testInput"
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        className="test-class"
      />
    );

    const input = getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "testInput");
    expect(input).toHaveClass("w-full bg-transparent px-[3.5px] py-3 text-md test-class");
  });

  it("triggers onChange handler when typed into", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        type="text"
        name="testInput"
        value=""
        onChange={onChangeMock}
        placeholder="Enter text"
      />
    );

    const input = getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("Hello");
  });

  it("displays error message when touched and error props are provided", () => {
    const { getByText } = render(
      <Input
        type="text"
        name="testInput"
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        touched={true}
        error="This field is required"
      />
    );

    const errorMessage = getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-600");
  });

  it("does not display error message when touched is false", () => {
    const { queryByText } = render(
      <Input
        type="text"
        name="testInput"
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        touched={false}
        error="This field is required"
      />
    );

    const errorMessage = queryByText("This field is required");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("does not display error message when error prop is not provided", () => {
    const { queryByText } = render(
      <Input
        type="text"
        name="testInput"
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        touched={true}
      />
    );

    const errorMessage = queryByText("This field is required");
    expect(errorMessage).not.toBeInTheDocument();
  });
});

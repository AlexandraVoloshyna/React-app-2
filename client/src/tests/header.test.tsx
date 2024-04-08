import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "../components/header";
import { Provider } from "react-redux"; 
import { store } from "../redux/store"; 
import { openSidebar } from "../redux/sidebar.slice";
import { useCreateBoardMutation } from "../redux/board-api.slice";
import { useCreateListMutation } from "../redux/lists-api.slice";

describe("Header Component", () => {
  it("renders with correct buttons based on location", () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Route path="/">
            <Header />
          </Route>
        </Provider>
      </Router>
    );

    expect(getByText("Task Board")).toBeInTheDocument();
    expect(getByText("+")).toBeInTheDocument(); 
  });

  it('renders "History" button when not on root path', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Route path="/test">
            <Header />
          </Route>
        </Provider>
      </Router>
    );

    expect(getByText("History")).toBeInTheDocument();
  });

  it('triggers handleSidebarOpen when "History" button is clicked', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Route path="/test">
            <Header />
          </Route>
        </Provider>
      </Router>
    );

    fireEvent.click(getByText("History"));
    expect(store.dispatch).toHaveBeenCalledWith(openSidebar());
  });

  it('triggers handleCreateBoard when "+" button is clicked on root path', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Route path="/">
            <Header />
          </Route>
        </Provider>
      </Router>
    );

    fireEvent.click(getByText("+"));
    expect(useCreateBoardMutation()).toHaveBeenCalled();
  });

  it('triggers handleCreateList when "+" button is clicked on non-root path', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Route path="/test">
            <Header />
          </Route>
        </Provider>
      </Router>
    );

    fireEvent.click(getByText("+"));
    expect(useCreateListMutation()).toHaveBeenCalled();
  });
});